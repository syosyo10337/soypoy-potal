# CLAUDE.md - AI Assistant Guide for SOY-POY Portal

This document provides essential context for AI assistants working on the SOY-POY Portal codebase.

## Project Overview

SOY-POY Portal is a full-stack web application for a community bar's event management platform. It features a public-facing website for event discovery and an admin panel for content management.

**Tech Stack:**
- **Framework**: Next.js 15 (App Router) + React 19
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL (Neon serverless) + Drizzle ORM
- **API**: tRPC for type-safe client-server communication
- **Admin**: Refine framework with custom components
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Linting/Formatting**: Biome (NOT ESLint/Prettier)
- **Package Manager**: pnpm

## Quick Commands

```bash
# Development
pnpm dev              # Start dev server (port 3000)
./bin/dev             # Start via Docker container

# Code Quality
pnpm check            # Run tsc + lint:fix + format (use before commits)
pnpm lint             # Lint only
pnpm lint:fix         # Lint with auto-fix
pnpm format           # Format code
pnpm tsc              # Type check

# Database
pnpm drzl:gen         # Generate migrations after schema changes
pnpm drzl:migrate     # Apply migrations to database
pnpm drzl:studio      # Open Drizzle Studio GUI
```

## Architecture: Clean Architecture / DDD

This project follows Clean Architecture principles. **Respect dependency rules:**

```
src/
├── app/                 # Presentation Layer (Next.js routes)
├── components/          # Shared UI components
├── domain/              # Domain Layer (entities, repository interfaces)
│   ├── entities/        # Business models (EventEntity, ClosedDayEntity)
│   └── repositories/    # Data access interfaces
├── services/            # Application Layer (business logic)
├── infrastructure/      # Infrastructure Layer
│   ├── db/              # Drizzle ORM + PostgreSQL
│   ├── trpc/            # tRPC routers and schemas
│   └── refine/          # Refine data provider
├── assets/              # Fonts, icons, styles
├── hooks/               # Custom React hooks
└── utils/               # Utility functions
```

### Dependency Rules

**Allowed:**
- `app/` → `services/` → `domain/`
- `infrastructure/` → `domain/`

**Forbidden:**
- `domain/` → anything (domain must be framework-agnostic)
- `services/` → `infrastructure/` (use dependency injection)

## Code Conventions

### File Organization

- Page-specific components go in `_components/` directory within that route
- Shared components go in `src/components/`
- Co-located assets use `assets/` subdirectory within component folder
- Use `Entity` suffix for domain models (e.g., `EventEntity`)
- Use `Repository` suffix for data interfaces (e.g., `EventRepository`)
- Use `Service` suffix for business logic classes (e.g., `EventService`)

### TypeScript

- Use `type` imports: `import type { X } from "..."`
- Path alias: `@/*` maps to `src/*`
- Prefer interfaces for entities, types for unions/utilities
- No inferrable type annotations (enforced by Biome)

### Biome Rules (Key Points)

- Double quotes for strings
- Semicolons required
- 2-space indentation
- No unused imports/variables (error)
- Self-closing elements required
- Organize imports automatically

### Styling

- Use Tailwind CSS utility classes
- Use `cn()` utility from `@/utils/cn` for conditional classes
- shadcn/ui components are in `src/components/shadcn/`
- Custom CSS files in `src/assets/styles/` for animations

**Color Theme:**
- Main: `#F3F0E6` (beige)
- Secondary: `#000000` (black)
- Accent: `#F0433C` (red)
- Muted: `#8E8E8E` (gray)

### Date Handling

- Use Luxon for date operations (not Date-fns for complex operations)
- Timezone: Asia/Tokyo (hardcoded)
- Import utility: `import { dateTimeFromISO } from "@/utils/date"`
- Store dates as ISO 8601 strings or YYYY-MM-DD format

## tRPC API Structure

### Available Routers

**Events Router (`events.*`):**
- `events.list` - Get all published events
- `events.listByMonth({ year, month })` - Get events for specific month
- `events.getById(id)` - Get single event
- `events.create(data)` - Create new event
- `events.update({ id, ...data })` - Update event
- `events.delete({ id })` - Delete event

**Closed Days Router (`closedDays.*`):**
- `closedDays.listByMonth({ year, month })` - Get closed days for month

### Adding New API Routes

1. Define Zod schema in `src/infrastructure/trpc/schemas/`
2. Create router in `src/infrastructure/trpc/routers/`
3. Add to main router in `src/infrastructure/trpc/router.ts`
4. Services are injected via tRPC context

## Database Schema

### Tables

**events:**
- `id` (text, PK)
- `publicationStatus` (enum: Draft, Published, Archived)
- `title` (varchar 255)
- `date` (varchar 255) - ISO format
- `description` (text, nullable)
- `thumbnail` (text, nullable)
- `type` (enum: Art, Comedy, Dance, Design, Impro, Movie, Music, Photo, Talk, Theater, Workshop, Other)

**closed_days:**
- `id` (text, PK)
- `date` (varchar 255) - YYYY-MM-DD format

### Adding New Tables

Follow the guide in `docs/database-setup.md`:
1. Define entity in `src/domain/entities/`
2. Define repository interface in `src/domain/repositories/`
3. Add Drizzle schema in `src/infrastructure/db/schema.ts`
4. Implement repository in `src/infrastructure/db/repositories/`
5. Create service in `src/services/`
6. Run `pnpm drzl:gen` then `pnpm drzl:migrate`

## Admin Panel

The admin panel uses Refine framework at `/admin`:
- Custom UI components in `src/components/refine-ui/`
- Data provider bridges Refine to tRPC in `src/infrastructure/refine/data-provider.ts`
- Views: list-view, create-view, edit-view, show-view

## Important Notes

### Language

- Comments in code are primarily in Japanese
- Documentation in `/docs` is in Japanese
- The team communicates in Japanese

### Environment Variables

- `NETLIFY_DATABASE_URL` - PostgreSQL connection string (required)
- Obtain `.env.local` from team lead for local development

### Testing

No test framework is currently configured. Code quality is maintained through:
- TypeScript strict mode
- Biome linting
- Zod runtime validation

### Don't Forget

- Run `pnpm check` before committing
- The project uses Docker dev containers for consistent environments
- SVGs are transformed to React components via SVGR webpack loader
- Unique IDs are generated using `nanoid`

## Common Tasks

### Add a New Page

1. Create route in `src/app/(user)/[route-name]/page.tsx`
2. Add page-specific components in `_components/` subdirectory
3. Use services from `src/services/` for data fetching

### Add a New UI Component

1. For shadcn components: Add to `src/components/shadcn/`
2. For custom shared components: Add to `src/components/[ComponentName]/`
3. Use Tailwind + `cn()` utility for styling

### Modify Event Types

1. Update enum in `src/domain/entities/event.ts`
2. Update Drizzle schema enum in `src/infrastructure/db/schema.ts`
3. Update Zod schema in `src/infrastructure/trpc/schemas/`
4. Generate and run migration

## Related Documentation

- `README.md` - Setup instructions and basic usage
- `docs/project-structure.md` - Detailed directory structure
- `docs/database-setup.md` - Database operations guide
- `.github/copilot-instructions.md` - Code review style guide
