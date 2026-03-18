# EnglishTree

Frontend do nauki angielskiego z drzewem umiejetnosci, baza slow i cwiczeniami opartymi o dane z Supabase.

## Wymagania

- Node.js 22.x dla CI i deployu na GitHub Pages
- projekt Supabase z tabelami zdefiniowanymi w [supabase_schema.sql](supabase_schema.sql)

## Konfiguracja lokalna

1. Zainstaluj zaleznosci:
   `npm install`
2. Uzupelnij `.env` na podstawie `.env.example`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` tylko do skryptow seed/migrate
3. Uruchom aplikacje:
   `npm run dev`

## Supabase

- Frontend korzysta tylko z publicznych zmiennych `VITE_SUPABASE_*`.
- Skrypty [scripts/migrate.ts](scripts/migrate.ts) i [scripts/seed_more_sentences.ts](scripts/seed_more_sentences.ts) wymagaja `SUPABASE_SERVICE_ROLE_KEY`.
- Nie udostepniaj `SUPABASE_SERVICE_ROLE_KEY` w GitHub Pages ani w frontendzie.

## GitHub Pages

Workflow deployu jest w [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml).

Do sekretow repozytorium dodaj:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Po pushu na `main` lub `master` GitHub zbuduje aplikacje i opublikuje katalog `dist` na GitHub Pages.

## Komendy pomocnicze

- `npm run lint`
- `npm run build`
- `npx tsx scripts/check.ts`
- `npx tsx scripts/migrate.ts`
- `npx tsx scripts/seed_more_sentences.ts`

## Publikacja nowego repo krok po kroku

### 1) Supabase

1. W SQL Editor uruchom [supabase_schema.sql](supabase_schema.sql).
2. W SQL Editor uruchom [scripts/supabase_lockdown.sql](scripts/supabase_lockdown.sql).
3. Lokalnie uzupelnij `.env` i uruchom:
   - `npx tsx scripts/migrate.ts`
   - `npx tsx scripts/seed_more_sentences.ts`
   - `npx tsx scripts/check.ts`

### 2) GitHub repo

1. Utworz puste repo w GitHub.
2. Uruchom automatyzacje publikacji:
   - `powershell -ExecutionPolicy Bypass -File scripts/publish_github_pages.ps1 -RemoteUrl https://github.com/OWNER/REPO.git`
3. W repo dodaj sekrety:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. W Settings -> Pages ustaw Source na GitHub Actions.

### 3) Weryfikacja po deployu

1. Sprawdz zakladke Actions: workflow [ .github/workflows/deploy-pages.yml ](.github/workflows/deploy-pages.yml) powinien byc zielony.
2. Otworz URL GitHub Pages i przejdz do:
   - Drzewo umiejetnosci
   - Trening tematyczny
   - Baza slow i trening slow
3. Jesli nie laduje danych, sprawdz sekrety i RLS w Supabase.
