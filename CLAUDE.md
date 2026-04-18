# CRASH Lab Website — Claude Code Context

## What this project is

The CRASH Lab website — Centre for Responsible Autonomous Systems in Healthcare,
Ashoka University. Goal: position as India's premier responsible health AI lab,
attract clinicians/radiologists, and be fully readable by AI agents and search engines.

Live: https://crashlab.in | Preview: https://crashlab.vercel.app
Repo: https://github.com/snepraj2709/crashlab_prototype

---

## Stack

- Next.js 14 (App Router)
- Sanity.io v3 — schemas in `sanity/schemaTypes/`
- TypeScript strict — generated types at `sanity/types.ts` via `npm run sanity:typegen`
- Tailwind CSS + `cn()` utility (clsx + tailwind-merge)
- Framer Motion, Lucide React, next-seo, next-themes
- Vercel, Resend (email), Sentry

---

## Directory structure

```
app/
  (marketing)/          ← ALL public routes
    page.tsx            ← Homepage
    people/
      page.tsx          ← Team listing
      [slug]/page.tsx   ← Individual profile
    blog/
      page.tsx          ← Blog listing
      [slug]/page.tsx   ← Blog post (has partial author card)
    news/
      page.tsx          ← News listing
      [slug]/page.tsx   ← News post
    research/
      page.tsx
      [slug]/page.tsx
    publications/page.tsx
    collaborate/page.tsx
    join/page.tsx
    contact/page.tsx
    about/page.tsx
    layout.tsx          ← DO NOT TOUCH

  studio/[[...tool]]/   ← Sanity Studio
  layout.tsx            ← Root layout — DO NOT TOUCH
  error.tsx / not-found.tsx

lib/
  sanity/
    queries.ts          ← ALL GROQ queries (personFields, postFields, query constants)
    client.ts           ← DO NOT TOUCH
  content/
    site.ts             ← Data fetching wrappers (getTeamProfiles, getPostBySlug, etc.)
  utils/                ← formatDate, portableText, rateLimit, api helpers
  validations/          ← Zod schemas

sanity/
  schemaTypes/
    index.ts            ← [research, person, post, application, announcement, event]
    person.ts           ← "person" type
    post.ts             ← "post" type (blog + news via postType field)
    research.ts         ← "research" type
    announcement.ts / application.ts / event.ts
  types.ts              ← AUTO-GENERATED — never edit manually
  lib/client.ts         ← DO NOT TOUCH
  deskStructure.ts / sanity.config.ts / env.ts
```

---

## Sanity schema — exact field names (verified from source)

### `person` (`sanity/schemaTypes/person.ts`)

```
slug                    slug
name                    string
role                    string
title                   string
photo                   image { hotspot: true }
shortBio                text (50 words max — used on cards)
fullBio                 array<block> (PortableText)
email                   string
credentials             array<string>
researchFocus           array<string>
socialLinks             object {
                          twitter         url
                          googleScholar   url
                          linkedin        url
                          personalWebsite url
                          researchgate    url
                        }
isPrincipalInvestigator boolean
isActive                boolean  ← active (true) / alumni (false) toggle
joinedAt                date
position                number (sort order)
```

**To ADD (Phase 1):**

- `alumniYear` — number, optional
- `currentInstitution` — string, optional

**Known bug:** `people/[slug]/page.tsx` references `person.affiliation` which
doesn't exist in the schema. Address this in Phase 5.

### `post` (`sanity/schemaTypes/post.ts`)

```
slug            slug
title           string
excerpt         text
body            array<block | image | code>
coverImage      image { hotspot: true }
publishedAt     datetime
author          reference → person   ← ALREADY EXISTS AND IS QUERIED
category        "benchmark-update" | "research-paper" |
                "industry-insight" | "lab-news" | "policy"
tags            array<string>
seoTitle        string
seoDescription  text
featured        boolean
postType        "news" | "blog"   ← determines which listing page shows it
```

### `research` (`sanity/schemaTypes/research.ts`)

```
slug                  slug (required)
title / problemStatement / summary / body
status                "active" | "published" | "completed" | "seeking-collaborators"
venue / publishedAt / paperUrl
heroImage             image
tags                  array<string> (from defined list)
audience              array<string>: researcher | industry | investor | all
lead                  reference → person
team                  array<reference → person>
featured / seekingCollaborators  boolean
metrics               array<{ label, value, type: "human"|"ai"|"gap" }>
```

---

## GROQ queries — location: `lib/sanity/queries.ts`

### Field fragments (reused across queries)

- `personFields` — all person fields incl. `alumniYear`, `currentInstitution` ✅
- `postFields` — post fields + `author->{ ...personFields }`
- `projectFields` — research fields + `lead->` + `team[]->`

### Query constants

```
allProjectsQuery     research, ordered by featured/publishedAt
projectBySlugQuery   single research by slug
allPeopleQuery       returns ALL people (no isActive filter) ✅
personBySlugQuery    single person + authoredPosts reverse-lookup ✅
allPostsQuery        all posts (news + blog)
newsPostsQuery       postType == "news"
blogPostsQuery       postType == "blog"
postBySlugQuery      single post + full author data (already works correctly)
activeAnnouncementQuery
allEventsQuery
```

### Data fetcher functions (`lib/content/site.ts`)

Read this file before assuming function names. Known functions:

- `getTeamProfiles()` → calls `allPeopleQuery`
- `getTeamProfileBySlug(slug)` → calls `personBySlugQuery`
- `getBlogPosts()` → calls `blogPostsQuery`
- `getPostBySlug(slug)` → calls `postBySlugQuery`

---

## What already works — do NOT rebuild

- `author` reference on `post` schema, fully queried ✅
- Author data in `postBySlugQuery` — `author->{ name, shortBio, slug, ... }` ✅
- `socialLinks` object with `googleScholar`, `linkedin`, etc. ✅
- `isActive` boolean on `person` ✅
- `isPrincipalInvestigator` boolean + badge on profile page ✅
- Partial author card in `blog/[slug]/page.tsx` (name + shortBio shown) ✅
- `JsonLd` component at `components/seo/JsonLd.tsx` ✅
- `generateStaticParams` on people profile pages ✅

---

## Build phases — current status

### Phase 1 — Schema (small, unblocks alumni UI)

- [ ] Add `alumniYear` (number, optional) to `sanity/schemaTypes/person.ts`
- [ ] Add `currentInstitution` (string, optional) to `sanity/schemaTypes/person.ts`
- [ ] Run `npm run sanity:typegen` to update `sanity/types.ts`

### Phase 2 — Query updates

- [ ] `allPeopleQuery`: remove `isActive == true` filter, keep `isActive` in returned fields
- [ ] Add `authoredPosts` reverse-lookup to `personBySlugQuery`

### Phase 3 — Enhance blog author card ✅

- [x] `app/(marketing)/blog/[slug]/page.tsx`: photo, credentials[0], profile link, googleScholar
- [x] `types/site.ts`: extended `SitePostAuthor` with photo, credentials, socialLinks
- [x] `lib/content/site.ts`: `normalizePostAuthor` passes through new fields; `normalizePerson` param broadened to `AllPeopleQueryResult[number]`

### Phase 4 — People listing filter tabs

- [ ] `app/(marketing)/people/page.tsx`: client-side Active / Alumni filter using `isActive`

### Phase 5 — Person profile: authored posts + affiliation bug fix

- [ ] Add "Posts by this author" section using `authoredPosts` from Phase 2
- [ ] Fix `person.affiliation` reference (field doesn't exist — remove or add to schema)
- [ ] Add `alumniYear` + `currentInstitution` display when `isActive === false`

### Phase 6 — AI/SEO

- [ ] `public/llms.txt`
- [ ] `public/robots.txt` (add AI bot user-agents)
- [ ] Organization JSON-LD in `app/layout.tsx`
- [ ] FAQPage JSON-LD in `app/(marketing)/research/page.tsx`

### Phase 7 — New pages

- [ ] `app/(marketing)/for-clinicians/page.tsx`

---

## Conventions

- Tailwind only — no inline styles, no CSS modules
- `cn()` for conditional classes
- All images: `next/image` with explicit `sizes`
- GROQ: `groq` template literal, named constants in `lib/sanity/queries.ts`
- After any schema change: run `npm run sanity:typegen` before writing any component
- `sanity/types.ts` is auto-generated — never edit it directly

## Off-limits without explicit instruction

- `sanity/lib/client.ts`
- `app/layout.tsx`
- `app/(marketing)/layout.tsx`
- `sanity/types.ts`

---
