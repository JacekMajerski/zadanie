# Playwright Tests – Formularz Kontaktowy

Ten projekt zawiera zestaw automatycznych testów end-to-end z użyciem [Playwright](https://playwright.dev/) do weryfikacji poprawności działania formularza kontaktowego.

## 📂 Struktura

- `pom/contact-page.ts` – Strona obiektowa zawierająca lokalizatory i metody pomocnicze dla formularza.
- `dicts/contact-dict.ts` – Zestaw przykładowych danych testowych.
- `tests/contact-form.spec.ts` – Główne testy E2E sprawdzające poprawność formularza.

---

## ✅ Scenariusze testowe

### 1. **Walidacja wymaganych pól**
Weryfikacja, że po kliknięciu przycisku „Zarejestruj” bez uzupełniania danych pojawiają się odpowiednie komunikaty o błędach.

### 2. **Za krótki numer telefonu**
Sprawdzenie, że numer telefonu zawierający mniej niż 9 cyfr wywołuje odpowiednią walidację.

### 3. **Niepoprawny typ danych w numerze telefonu**
Sprawdzenie, że wpisanie liter w pole numeru telefonu wywołuje komunikat o błędnym formacie.

### 4. **Nieprawidłowy e-mail**
Sprawdzenie, że wpisanie niepoprawnego adresu e-mail (np. bez `@`) pokazuje błąd walidacyjny.

### 5. **Niezgodność haseł**
Sprawdzenie, że różne hasła w polach „Hasło” i „Powtórz hasło” powodują błąd.

### 6. **Brak akceptacji wymaganych zgód**
Sprawdzenie, że formularz nie zostanie wysłany bez zaznaczenia wymaganej zgody.

### 7. **Rejestracja z jedną zgodą**
Wypełnienie formularza i zaznaczenie tylko jednej (wymaganej) zgody powinno zakończyć się sukcesem i komunikatem powitalnym.

### 8. **Rejestracja z obiema zgodami**
Pełna rejestracja z zaznaczeniem wszystkich zgód – oczekiwany pozytywny scenariusz zakończony sukcesem.

---

## 🧪 Użyte dane testowe (`ContactDicts`)

| Pole            | Wartość                  |
|------------------|---------------------------|
| Imię             | `Testowy`                 |
| Nazwisko         | `Janusz`                  |
| Email            | `Janusz@wp.pl`            |
| Niepoprawny e-mail | `janusz.pl`             |
| Hasło            | `Password123.`            |
| Niepasujące hasło | `Password123`           |
| Data urodzenia   | `2000-05-08`              |
| Telefon poprawny | `500600700`               |
| Telefon błędny   | `50060`                   |

---

## 🧱 Technologia

- **Playwright** z językiem TypeScript
- Architektura **Page Object Model (POM)**
- Dane testowe zdefiniowane w pliku `dicts/contact-dict.ts`

---

## ▶️ Uruchamianie testów

Zainstaluj zależności i uruchom testy:

```bash
npm install
npx playwright test
