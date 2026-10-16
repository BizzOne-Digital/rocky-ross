# Rocky Ross Productions / Inked & Infused

Single Next.js (App Router) project for the public destination site and MongoDB-backed admin portal.

**Stack:** Next.js, TypeScript, Tailwind CSS v4, Motion, Mongoose (MongoDB Atlas), Cloudinary, SMTP (Nodemailer).

## Quick start

```bash
npm install
cp .env.example .env.local
# Fill MONGODB_URI, AUTH_SECRET, then:
npm run seed
npm run admin:create
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

### Scripts

| Command | Purpose |
|--------|---------|
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm run seed` | Idempotent seed (5 businesses + settings) |
| `npm run admin:create` | Create/update admin from `ADMIN_EMAIL` / `ADMIN_PASSWORD` |
| `npm test` | Vitest |

## Preview without MongoDB

If `MONGODB_URI` is unset, the public site renders **preview content** from seed data. Forms and admin **do not** persist data until MongoDB is configured.

## MongoDB Atlas

1. Create a cluster and database user.
2. Allow network access (Vercel: allow `0.0.0.0/0` or use Vercel static IPs if available).
3. Set `MONGODB_URI` and optional `MONGODB_DB` in `.env.local` and Vercel project settings.

## Cloudinary

1. Create a Cloudinary account and upload folder (e.g. `inked-infused`).
2. Set `CLOUDINARY_*` env vars.
3. In admin → Media, register assets after upload (public ID + HTTPS URL).
4. `/api/cloudinary/sign` provides signed upload params for authenticated admins.

## SMTP

Set `SMTP_*` and `NOTIFICATION_EMAIL`. Inquiries are **always saved first**; email failures are recorded on the inquiry record.

## Client assets checklist

Upload only **authorized** business assets (no stock/AI). Organize per business:

- [ ] Rocky Ross / Inked & Infused logo
- [ ] Old North End Tattoos — logo, portfolio, artists
- [ ] El Gringo's Tacos — logo, food photos, menu copy/prices
- [ ] Tequila Chillada's Bar — drinks, venue, events
- [ ] Trims Barbershop — logo, shop, barbers
- [ ] Ross Squad DJs — event photos, equipment

Until assets exist, the site uses **typography panels** (no placeholder photos).

## Public routes (7 pages)

- `/` — hub
- `/about` — destination & property story
- `/old-north-end-tattoos`
- `/el-gringos-tacos`
- `/tequila-chilladas-bar`
- `/trims-barbershop`
- `/ross-squad-djs-event-rentals`

Additional businesses can be added in admin (slug must not conflict with `admin`, `api`, etc.).

## Vercel deployment

1. Import repo, set all env vars from `.env.example`.
2. Set `NEXT_PUBLIC_SITE_URL` to the primary production domain.
3. Run `npm run seed` locally or via a one-off script against production DB.
4. Run `npm run admin:create` locally with production `MONGODB_URI` (do not commit passwords).

## Domain migration (Wix → this site)

1. Inventory existing Wix URLs (especially DJ-related).
2. Map each to a new path or redirect in `SlugRedirect` / Vercel redirects.
3. Point primary domain DNS to Vercel; secondary domain → 301 to primary with path preserved.
4. Configure `www` vs apex in Vercel; keep HTTPS enforced.

Do not change live DNS from this repo.

## License

Private — Rocky Ross Productions client project.
