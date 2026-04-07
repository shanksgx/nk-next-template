# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NK Next Template - a Next.js 16 template with tRPC, next-intl i18n, Tailwind CSS v4, and shadcn/ui components.

## Common Commands

```bash
pnpm dev          # Start dev server on port 3636
pnpm build        # Build production standalone output
pnpm start        # Start production server on port 3686
pnpm lint         # Run ESLint
pnpm fmt          # Format code with oxfmt
pnpm fmt:check    # Check formatting without modifying
pnpm commit       # Run git commit with commitlint
```

## Tech Stack

- **Framework**: Next.js 16 (App Router, standalone output)
- **API**: tRPC with tanstack/react-query
- **I18n**: next-intl (locales: en, zh)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Code Quality**: oxfmt (formatting), ESLint (linting), Husky + commitlint (commits)

## Architecture

### App Router Structure

- `app/[locale]/` - Locale-based routing; all pages go here
- `app/api/` - API routes for tRPC and OpenAI
- `app/_trpc/` - tRPC client setup (`client.ts`, `provider.tsx`)

### tRPC API (`server/trpc.ts`)

- Router defined here with `appRouter` export
- Currently has `hello` (query) and `getEnvInfo` (query) procedures
- Add new procedures in `server/index.ts`

### i18n

- `i18n/routing.ts` - locale configuration (`en`, `zh` with `localePrefix: 'always'`)
- `i18n/request.ts` - next-intl request config
- Messages stored in `messages/` directory

### Environment Variables (`env.ts`)

- Server vars: `GIT_CODE_URL`, `GIT_CODE_API_KEY`, `SUPER_COMPUTING_API_KEY`, `SUPER_COMPUTING_URL`, `SUPER_COMPUTING_OPEN_AI_URL`
- Client vars: `NEXT_PUBLIC_APP_URL`
- Uses `@t3-oss/env-nextjs` with Zod validation

### Key Components

- `components/share/agent/` - Agent/chat-related components (Agent.tsx, ChatContainer.tsx, SendInput.tsx)
- `components/ui/` - shadcn/ui base components
- `hooks/useSuperChat.ts` - Chat-related hook

## Code Style

- **Formatting**: oxfmt with 80 char width, single quotes, no semicolons, trailing commas none
- **Tailwind**: Uses `cn` utility (clsx + tailwind-merge) for class merging
- **React**: 19.2.3 with React Compiler enabled

## Lint-Staged

On commit, staged `.ts`/`.tsx` files run `eslint --fix` then `oxfmt`. `.json`/`.css`/`.md` files run `oxfmt` only.
