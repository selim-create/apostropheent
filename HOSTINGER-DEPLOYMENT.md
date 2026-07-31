# Temporary Hostinger Deployment

This branch keeps the existing Apostrophe Entertainment design online while the new WordPress site is being developed.

## Why this compatibility layer exists

The original website uses ASP.NET Web Pages / Razor on .NET Framework 4.5. Standard Hostinger web hosting runs Linux/Apache/PHP and cannot execute the original `Default.cshtml`, `Web.config`, or `bin/CMS.dll` application directly.

The temporary `index.php` renderer:

- reads the original `Default.cshtml` markup;
- reads English strings from `App_GlobalResources/Resource.resx`;
- reads French strings from `App_GlobalResources/Resource.fr.resx`;
- preserves `/` for English and `/fr` for French;
- keeps the existing CSS, JavaScript, SVG, GIF, and image files;
- does not require a database.

## Upload with Hostinger File Manager

1. Download this branch as a ZIP from GitHub.
2. In Hostinger hPanel, open **Websites > Manage > File Manager**.
3. Open the domain's `public_html` directory.
4. Back up and then remove any default `index.php`, `index.html`, or placeholder files.
5. Upload the ZIP into `public_html`.
6. Extract it.
7. If extraction creates a wrapper folder such as `apostropheent-hostinger-temporary`, move that folder's contents directly into `public_html`.
8. Confirm that these paths exist directly under `public_html`:
   - `.htaccess`
   - `index.php`
   - `Default.cshtml`
   - `assets/`
   - `App_GlobalResources/`
9. Use PHP 8.1 or newer in Hostinger's PHP configuration.
10. Test both the homepage and `/fr` before changing DNS.

## Recommended DNS migration order

1. Keep the old website online while testing the Hostinger copy through a temporary domain or local hosts-file override.
2. Recreate all domain mailboxes before changing nameservers or MX records.
3. Lower DNS TTL before migration when possible.
4. Point only the website records first if email must stay with the current provider.
5. Enable SSL in Hostinger after DNS resolves.
6. Re-test the homepage, `/fr`, images, animations, email links, phone links, and analytics.

## Security notes

The `.htaccess` file blocks public access to old ASP.NET source/configuration paths, DLLs, resource files, and directory listings. Do not remove those protections while this temporary bridge is public.

## Rollback

Keep a full copy of the previous hosting account and its DNS values. To roll back, restore the previous A/AAAA records or nameservers and allow DNS propagation.
