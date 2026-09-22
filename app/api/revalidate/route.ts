import { timingSafeEqual } from 'node:crypto';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type RevalidationPayload = {
  reason?: string;
  post_id?: number;
  post_type?: string;
  option?: string;
  timestamp?: string;
};

function secretsMatch(expected: string, provided: string): boolean {
  const expectedBuffer = Buffer.from(expected);
  const providedBuffer = Buffer.from(provided);

  if (expectedBuffer.length !== providedBuffer.length) return false;
  return timingSafeEqual(expectedBuffer, providedBuffer);
}

function revalidateFor(payload: RevalidationPayload): string[] {
  const touched = new Set<string>();

  const invalidate = (path: string, type?: 'page' | 'layout') => {
    revalidatePath(path, type);
    touched.add(type ? `${path} [${type}]` : path);
  };

  // Homepage can surface shared CMS content, work and testimonials.
  invalidate('/');
  invalidate('/fr');

  switch (payload.post_type) {
    case 'ae_work':
      invalidate('/work');
      invalidate('/fr/projets');
      invalidate('/work/[slug]', 'page');
      invalidate('/fr/projets/[slug]', 'page');
      break;

    case 'ae_testimonial':
      invalidate('/testimonials');
      invalidate('/fr/temoignages');
      break;

    case 'ae_home':
    case 'ae_service':
    case 'ae_field':
      // Home/service/field data is consumed through the shared site endpoint.
      invalidate('/', 'layout');
      break;

    default:
      // Site settings (including listing copy/SEO/contact data) can affect
      // several routes, so invalidate the application from the root layout.
      if (payload.reason === 'settings_updated' || payload.option) {
        invalidate('/', 'layout');
      }
      break;
  }

  return Array.from(touched);
}

export async function POST(request: NextRequest) {
  const expectedSecret = process.env.APOSTROPHE_REVALIDATE_SECRET?.trim();

  if (!expectedSecret) {
    return NextResponse.json(
      { ok: false, error: 'Revalidation is not configured on the frontend.' },
      { status: 503 },
    );
  }

  const providedSecret = request.headers.get('x-apostrophe-revalidate-secret')?.trim() ?? '';

  if (!providedSecret || !secretsMatch(expectedSecret, providedSecret)) {
    return NextResponse.json(
      { ok: false, error: 'Unauthorized.' },
      { status: 401 },
    );
  }

  let payload: RevalidationPayload;

  try {
    payload = (await request.json()) as RevalidationPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON payload.' },
      { status: 400 },
    );
  }

  const revalidated = revalidateFor(payload);

  return NextResponse.json({
    ok: true,
    revalidated,
    reason: payload.reason ?? null,
    post_type: payload.post_type ?? null,
    post_id: payload.post_id ?? null,
    option: payload.option ?? null,
    received_at: new Date().toISOString(),
  });
}
