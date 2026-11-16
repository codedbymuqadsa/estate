# ESTATE

A premium real estate marketplace — a frontend-only portfolio project built with **Next.js 14 (App Router), React, JavaScript and SCSS Modules**.

All listings, agents, testimonials and prices are fictional. There is no backend, database or authentication; saved properties, comparison, inquiries, visits and profile data live in the browser's `localStorage`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Routes

`/` · `/properties` · `/properties/[slug]` · `/map` · `/compare` · `/saved` · `/agents` · `/agents/[slug]` · `/schedule-visit` · `/dashboard` (+ `/saved`, `/inquiries`, `/visits`, `/profile`) · `/about` · `/contact`

## Structure

- `app/` routes and metadata · `components/` (layout, common, property, agent, forms, home, dashboard)
- `context/` UI (toasts, confirm dialog, menu), Property, Wishlist, Comparison
- `hooks/` `useLocalStorage` (hydration-safe, synced across components), `useProperties`, `useDebounce`, `useForm`, `useToday`
- `lib/` filters, formatters, validation, constants, image catalogue · `data/` 26 properties, 8 agents, 6 cities, testimonials
- `styles/` design tokens, mixins, reset, typography; each component has its own `.module.scss`

## Notes

- Filter state lives in the URL (shareable); results are derived, not stored.
- Photos are hot-linked from Unsplash through `next/image`; map tiles come from OpenStreetMap.
- Prices are in USD; rent and commercial-lease prices are monthly.
