# EnglishTree

Aplikacja webowa do nauki angielskiego z drzewem umiejętności, treningiem tematów gramatycznych i bazą słów.

## O projekcie

EnglishTree łączy naukę gramatyki i słownictwa w jednej aplikacji frontendowej. Użytkownik przechodzi przez poziomy A1-C1/C2, ćwiczy tłumaczenia zdań i buduje bazę słów. Dane treści edukacyjnych są pobierane z Supabase, a aplikacja jest publikowana na GitHub Pages.

Linki:

- Demo: https://marcinkgit1.github.io/EnglishApp/
- Repo: https://github.com/marcinKgit1/EnglishApp

## Założenia i podejście

- Prosty, szybki frontend bez własnego backendu aplikacyjnego.
- Publiczny odczyt danych z Supabase przez anon key i RLS.
- Brak sekretów serwerowych po stronie klienta.
- Niezawodność tłumaczeń słów przez lokalny słownik + darmowe fallbacki online.
- Automatyczny deployment przez GitHub Actions na GitHub Pages.

## Najważniejsze funkcje

- Drzewo umiejętności (A1-C1/C2) pobierane z Supabase.
- Trening zdań dla konkretnego tematu.
- Baza słów i trening słówek.
- Lokalne podpowiedzi i walidacja odpowiedzi.
- Tłumaczenie klikniętego słowa: lokalny słownik + fallback online.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Supabase (read-only po stronie frontendu)

## Wymagania

- Node.js 22.x (zalecane)
- Projekt Supabase z tabelami i politykami z [supabase_schema.sql](supabase_schema.sql)

## Szybki start lokalny

1. Zainstaluj zależności:

```bash
npm install
```

2. Utwórz `.env` na podstawie `.env.example` i uzupełnij:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (tylko dla skryptów migrate/seed)

3. Uruchom aplikację:

```bash
npm run dev
```

## Supabase i bezpieczeństwo

- Frontend korzysta wyłącznie z publicznych zmiennych `VITE_SUPABASE_*`.
- Skrypty [scripts/migrate.ts](scripts/migrate.ts) i [scripts/seed_more_sentences.ts](scripts/seed_more_sentences.ts) wymagają `SUPABASE_SERVICE_ROLE_KEY`.
- Nie udostępniaj `SUPABASE_SERVICE_ROLE_KEY` w frontendzie ani w sekretach GitHub Pages.
- Po utworzeniu tabel uruchom [scripts/supabase_lockdown.sql](scripts/supabase_lockdown.sql), aby usunąć niebezpieczne anon insert policies.

## Komendy

```bash
npm run lint
npm run build
npm run check:supabase
npx tsx scripts/migrate.ts
npx tsx scripts/seed_more_sentences.ts
```

## Deploy na GitHub Pages

Workflow: [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml)

Wymagane sekrety repo:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Automatyzacja publikacji lokalnej:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/publish_github_pages.ps1 -RemoteUrl https://github.com/OWNER/REPO.git
```

Po pushu na `main` workflow buduje aplikację i publikuje katalog `dist` na GitHub Pages.
