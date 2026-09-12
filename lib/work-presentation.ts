import type { ApiWorkItem, MediaAsset } from '@/lib/apostrophe-api';

export type WorkPresentation = {
  isMediaFeature: boolean;
  publisherLabel: string;
  cover: MediaAsset | null;
};

export function getWorkPresentation(
  work: Pick<ApiWorkItem, 'presentation_type' | 'media_publisher' | 'media_cover' | 'hero_media' | 'thumbnail'>,
): WorkPresentation {
  const isMediaFeature = work.presentation_type === 'media_feature';

  return {
    isMediaFeature,
    publisherLabel: isMediaFeature ? (work.media_publisher?.trim() || 'MEDIA FEATURE') : '',
    cover: isMediaFeature
      ? (work.media_cover || work.hero_media || work.thumbnail)
      : (work.hero_media || work.thumbnail),
  };
}
