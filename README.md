# EnglishApp

## O projekcie

EnglishApp to aplikacja webowa do nauki języka angielskiego, zaprojektowana tak, aby pomóc wyjść z poziomu tzw. wiecznego początkującego. Łączy naukę gramatyki i słownictwa w jednym przepływie i prowadzi użytkownika przez poziomy A1-C1/C2.

Treści edukacyjne są pobierane z Supabase, a aplikacja jest publikowana na GitHub Pages.

Linki:

- Demo: https://marcinkgit1.github.io/EnglishApp/
- Repo: https://github.com/marcinKgit1/EnglishApp

## Założenia i podejście

Projekt powstał na bazie realnych doświadczeń z nauką języka i testowania podobnych narzędzi. Priorytetem było aktywne używanie języka, a nie bierne przyswajanie materiału.

- Nauka słów odbywa się w kontekście zdań.
- Ćwiczenia rozwijają umiejętność budowania wypowiedzi.
- Regularna praktyka ogranicza efekt znam, ale nie potrafię użyć.
- Architektura jest prosta: szybki frontend + dane z Supabase.
- Bezpieczeństwo: brak sekretów serwerowych po stronie klienta.

## Najważniejsze funkcje

- Drzewo umiejętności A1-C1/C2 pobierane z Supabase.
- Trening zdań dla konkretnego tematu gramatycznego.
- Baza słów i trening słówek.
- Lokalne podpowiedzi i walidacja odpowiedzi.
- Tłumaczenie klikniętego słowa: lokalny słownik + darmowe fallbacki online.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Supabase

## Szybki start

- Node.js 22.x (zalecane)

1. Zainstaluj zależności:

```bash
npm install
```

2. Utwórz plik .env na podstawie .env.example i ustaw:

- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY (tylko dla skryptów migrate/seed)

3. Uruchom aplikację:

```bash
npm run dev
```

## Konfiguracja Supabase

- Uruchom [supabase_schema.sql](supabase_schema.sql), aby utworzyć tabele.
- Uruchom [scripts/supabase_lockdown.sql](scripts/supabase_lockdown.sql), aby usunąć niebezpieczne anon insert policies.
- Frontend korzysta wyłącznie z publicznych zmiennych VITE_SUPABASE_*.

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

- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

Automatyzacja publikacji lokalnej:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/publish_github_pages.ps1 -RemoteUrl https://github.com/OWNER/REPO.git
```

Po pushu na main workflow buduje aplikację i publikuje katalog dist na GitHub Pages.
