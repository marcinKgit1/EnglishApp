# EnglishApp

## O projekcie

To moja autorska aplikacja do nauki języka angielskiego. Przed rozpoczęciem prac przetestowałem wiele podobnych narzędzi jako użytkownik i zauważyłem powtarzający się problem: wielu uczących się zatrzymuje się na poziomie tzw. wiecznego początkującego.

EnglishApp ma pomóc ten problem przełamać. Łączy naukę gramatyki i słownictwa w jednej aplikacji, prowadząc użytkownika przez poziomy A1-C1/C2. Dane edukacyjne są pobierane z Supabase, a aplikacja publikowana na GitHub Pages.

Linki:

- Demo: https://marcinkgit1.github.io/EnglishApp/
- Repo: https://github.com/marcinKgit1/EnglishApp

## Założenia i podejście

Projekt powstał w oparciu o realne doświadczenia z używania innych aplikacji. Celem było stworzenie narzędzia, które wspiera aktywne używanie języka, a nie tylko bierne przyswajanie materiału.

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

## Wymagania

- Node.js 22.x (zalecane)
- Projekt Supabase z tabelami i politykami z [supabase_schema.sql](supabase_schema.sql)

## Instalacja i uruchomienie

1. Sklonuj repozytorium:

```bash
git clone https://github.com/marcinKgit1/EnglishApp.git
cd EnglishApp
```

2. Zainstaluj zależności:

```bash
npm install
```

3. Utwórz plik .env na podstawie .env.example i ustaw:

- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY (tylko dla skryptów migrate/seed)

4. Uruchom aplikację:

```bash
npm run dev
```

## Supabase i bezpieczeństwo

- Frontend korzysta wyłącznie z publicznych zmiennych VITE_SUPABASE_*.
- Skrypty [scripts/migrate.ts](scripts/migrate.ts) i [scripts/seed_more_sentences.ts](scripts/seed_more_sentences.ts) wymagają SUPABASE_SERVICE_ROLE_KEY.
- Nie udostępniaj SUPABASE_SERVICE_ROLE_KEY w frontendzie ani w sekretach GitHub Pages.
- Po utworzeniu tabel uruchom [scripts/supabase_lockdown.sql](scripts/supabase_lockdown.sql), aby usunąć niebezpieczne anon insert policies.

## Dostępne komendy

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

## Licencja

Projekt jest udostępniany na licencji MIT.
