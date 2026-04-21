# Cartelle Mock Store — E-commerce Web App

A production-style fashion e-commerce application built with **Next.js App Router**.
It includes a customer-facing storefront and an admin back office for managing products, blog content, and media.

## 🔗 Links

- **Storefront** — https://cartelle-mock-store.vercel.app
- **Admin** — https://cartelle-mock-store.vercel.app/admin
- **Storybook** — https://cartelle-mock-store-storybook.vercel.app/
- **Architecture Case Study (includes demo video)** — https://samhalsall.dev/cartelle-case-study

---

## ✨ Features

- 🏪 **Customer storefront** — home, shop, product details, cart, checkout, blog, about, and support pages
- 🛒 **Cart system with persistence** — cookie-backed cart ID, quantity guardrails, and server-side cart mutations
- 💳 **Stripe checkout flow** — payment intent creation, multi-step checkout UI, and webhook-driven order/payment updates
- 📡 **Realtime admin order updates** — SSE stream pushes payment/order events to the admin dashboard after successful webhook processing
- 📦 **Inventory reservation logic** — stock is reserved during checkout and finalized on successful payment
- ⚙️ **Admin content management** — product, blog, and author management pages with create/edit routes
- 📚 **Component library documentation** — Storybook for isolated component development and UI review
- 🖼️ **Media pipeline** — product image uploads to Vercel Blob via API route
- 🔧 **Automated maintenance jobs** — scheduled cleanup for unused Blob assets and expired checkout carts
- ✨ **Responsive, animated UI** — Tailwind + Framer Motion across key storefront sections

---

## 🛠️ Tech Stack

| Area      | Choice                             | Notes                                                            |
| --------- | ---------------------------------- | ---------------------------------------------------------------- |
| Framework | Next.js 16 (App Router)            | React Compiler enabled; server components + route handlers       |
| Language  | TypeScript                         | Full-stack typing                                                |
| Styling   | Tailwind CSS 4                     | `tailwind-merge`, `tw-animate-css`                               |
| UI        | shadcn/ui + Radix primitives       | Form controls, dialogs, admin UI building blocks                 |
| Animation | Framer Motion                      | Section and component transitions                                |
| Forms     | react-hook-form + zod              | Checkout and admin form validation                               |
| Data      | Prisma ORM + PostgreSQL            | Products, sizes, carts, orders, blog posts, authors              |
| Payments  | Stripe                             | Payment intents + webhook event processing                       |
| Realtime  | Server-Sent Events + Upstash Redis | Redis-backed pub/sub pushes admin order updates over SSE         |
| Storage   | Vercel Blob                        | Product/blog/author asset storage                                |
| Tables    | TanStack React Table               | Admin listing tables                                             |
| Tooling   | ESLint, Prettier, Storybook, Husky | Linting/formatting/component development and pre-commit workflow |

---

## 🧩 Key Implementations

For a deeper architecture walkthrough (including a demo video), see the case study:
https://samhalsall.dev/cartelle-case-study

### Cart + Checkout + Payment

Checkout is handled through server actions and Stripe integration:

1. Customer adds items by product + size into a cookie-scoped cart
2. Server validates per-item and total cart quantity limits
3. Checkout initiation reserves stock (`stockReserved`) atomically in Prisma
4. A Stripe Payment Intent is created and stored on the order (`stripeSessionId`)
5. Frontend checkout runs a three-step flow (delivery, payment, summary)
6. Stripe webhook finalizes order/payment status and decrements reserved stock
7. Successful webhook events are broadcast through Upstash Redis and streamed into the admin UI via SSE

Core files:

```
src/lib/server/actions/cart-actions.ts
src/lib/server/actions/order-actions.ts
src/components/common/CheckoutForm/CheckoutForm.tsx
src/app/api/webhooks/stripe/route.ts
```

Related realtime files:

```
src/app/api/orders/stream/route.ts
src/lib/server/helpers/broadcast-update.ts
src/hooks/useStream.ts
src/hooks/useOrderStream.ts
src/components/admin/common/AdminOrdersToast.tsx
```

Environment variables required:

```
DATABASE_URL=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

Notes:

- The admin realtime updates feature uses SSE, with Redis pub/sub as the cross-instance event transport.
- Stripe webhook success events publish order updates, and the admin orders UI subscribes through `/api/orders/stream`.
- For local development, Stripe webhooks need to be forwarded to your local app for the realtime flow to trigger.

---

### Admin + Media Storage

The admin area supports product/blog/author content workflows and media uploads.

- Product images are uploaded through `POST /api/products/upload`
- Files are stored in Vercel Blob with resource-based path prefixes
- Scheduled Vercel crons remove orphaned assets and clear expired checkout carts

Core files:

```
src/app/admin/products/page.tsx
src/app/admin/blogs/page.tsx
src/app/admin/authors/page.tsx
src/app/api/products/upload/route.ts
src/app/api/cleanup-unused-images/route.ts
src/app/api/payment/cleanup-expired-carts/route.ts
vercel.json
```

Additional environment variables:

```
BLOB_READ_WRITE_TOKEN=
```

---

## 💻 Development

Install and run locally:

```
npm install
npm run dev
```

Database setup (first run):

```
npx prisma migrate dev
```

Optional local tooling:

```
npm run storybook
npm run lint
```

Create a `.env` (or `.env.local`) file in the project root:

```
DATABASE_URL=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
BLOB_READ_WRITE_TOKEN=
DEMO_MODE=
```

---

## 🚀 Deployment

The app is configured for **Vercel** deployment.

- Pushes to `master` can be connected to automatic deployments
- Configure all runtime environment variables in Vercel Project Settings
- `vercel.json` includes scheduled maintenance jobs:
  - `0 2 * * *` → `/api/cleanup-unused-images`
  - `0 1 * * *` → `/api/payment/cleanup-expired-carts`

---

## 🔮 Future Improvements

- Add authentication for admin dashboard rather then using demo flag
- Add automated tests for server actions, webhook flows, and checkout steps
- Add observability around Stripe webhook and background cleanup jobs
- Improve product recommendation logic on product detail pages

---
