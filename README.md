# EnglishApp

## 🧠 O projekcie

To moja pierwsza autorska aplikacja do nauki języka angielskiego. Zanim jednak ją stworzyłem, przetestowałem i przeanalizowałem wiele istniejących rozwiązań jako użytkownik.

Dzięki temu mogłem zidentyfikować ich najmocniejsze strony, ale też zauważyć powtarzające się problemy — szczególnie to, że wiele osób (w tym ja na wcześniejszym etapie) pozostaje na poziomie tzw. „wiecznego początkującego".

Ta aplikacja jest próbą rozwiązania właśnie tego problemu.

## 🚀 Założenia i podejście

Projekt powstał w oparciu o wnioski wyciągnięte z realnego korzystania z innych aplikacji. Zamiast powielać schematy, skupiłem się na tym, co faktycznie pomaga robić postęp:

- Aplikacja rozwiązuje problem biernej nauki poprzez wspieranie aktywnego używania języka
- Aplikacja eliminuje naukę oderwanych słów poprzez wprowadzanie ich w kontekście
- Aplikacja przeciwdziała brakowi umiejętności budowania wypowiedzi poprzez rozwijanie zdolności tworzenia zdań
- Aplikacja ogranicza efekt „znam, ale nie potrafię użyć" poprzez regularne ćwiczenie praktycznego zastosowania języka

## 💡 Cel

Celem tej aplikacji jest stworzenie środowiska, które:

- prowadzi użytkownika od podstaw do komunikacji
- wspiera systematyczny i zauważalny progres
- pomaga wyjść z poziomu „wiecznego początkującego"

## ✨ Główne cechy

- 📚 Naukę słów w kontekście zdań
- 🎯 Ćwiczenia skoncentrowane na praktycznym zastosowaniu
- 📈 Progresywny system nauki
- 🔄 Regularne powtórki wzmacniające zapamiętywanie
- 🎨 Intuicyjny i przyjazny interfejs użytkownika

## 📋 Wymagania systemowe

- **Node.js**: wersja 14.0 lub wyższa
- **npm** lub **yarn**: manager pakietów
- **Baza danych**: MongoDB/Firebase (w zależności od implementacji)
- **System operacyjny**: Windows, macOS, Linux

## 🛠️ Instalacja

1. **Sklonuj repozytorium:**
   ```bash
   git clone https://github.com/marcinKgit1/EnglishApp.git
   cd EnglishApp
   ```

2. **Zainstaluj zależności:**
   ```bash
   npm install
   ```

3. **Skonfiguruj zmienne środowiska:**
   ```bash
   cp .env.example .env
   # Edytuj plik .env i dodaj swoje zmienne
   ```

4. **Uruchom aplikację:**
   ```bash
   npm start
   ```

## 📖 Użytkowanie

Po uruchomieniu aplikacji:

1. Utwórz konto lub zaloguj się
2. Wybierz poziom trudności
3. Przejdź przez moduły nauki
4. Regularnie ćwicz słownictwo i gramatykę
5. Śledź swój postęp w panelu statystyk

## 🏗️ Architektura projektu

```
EnglishApp/
├── public/              # Pliki statyczne
├── src/
│   ├── components/      # Komponenty React
│   ├── pages/          # Strony aplikacji
│   ├── services/       # Usługi (API calls, auth)
│   ├── utils/          # Funkcje pomocnicze
│   ├── styles/         # Pliki CSS/SCSS
│   └── App.js          # Główny komponent
├── .env.example        # Szablon zmiennych środowiska
├── package.json        # Zależności projektu
└── README.md          # Ten plik
```

## 🔧 Dostępne skrypty

- `npm start` - Uruchamia aplikację w trybie deweloperskim
- `npm run build` - Buduje aplikację do produkcji
- `npm test` - Uruchamia testy
- `npm run lint` - Sprawdza kod pod kątem stylów

## 🤝 Wkład w projekt

Zapraszam do współpracy! Jeśli chciałbyś/chciałabyś przyczynić się do projektu:

1. Utwórz fork repozytorium
2. Stwórz gałąź dla swojej funkcjonalności (`git checkout -b feature/AmazingFeature`)
3. Zacommituj swoje zmiany (`git commit -m 'Add some AmazingFeature'`)
4. Wyślij pull request

## 📄 Licencja

Ten projekt jest udostępniany na licencji MIT. Szczegóły znajdują się w pliku LICENSE.

## 📞 Kontakt

- **Autor**: marcinKgit1
- **Email**: [Twój email]
- **GitHub**: https://github.com/marcinKgit1
- **Strona projektu**: [Link do live demo/strony projektu]

## 🔗 Linki

- [Live Demo](https://link-do-demo.com) - Spróbuj aplikacji online
- [Dokumentacja](./docs) - Pełna dokumentacja
- [Issues](https://github.com/marcinKgit1/EnglishApp/issues) - Zgłoś problem
- [Discussions](https://github.com/marcinKgit1/EnglishApp/discussions) - Dyskusje i pomysły

## 📚 Zasoby i inspiracje

- [MDN Web Docs](https://developer.mozilla.org/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/docs/)

## 🗺️ Mapa drogowa

- [ ] Wersja 1.0 - Podstawowe funkcjonalności
- [ ] Wersja 1.1 - Gamifikacja i system nagród
- [ ] Wersja 1.2 - Zaawansowane ćwiczenia mówienia
- [ ] Wersja 2.0 - Integracja z AI do personalizowanej nauki

---

**Ostatnia aktualizacja**: 2026-03-18