import { type Locator, type Page } from '@playwright/test';
import { ContactDicts } from '../dicts/contact-dict';

export class ContactPage {
    /////////BUTTONS
    readonly buttonSubmit: Locator

    //////////OTHERS
  readonly page: Page;
  readonly surName: Locator;
  readonly name: Locator;
  readonly errorName: Locator;
  readonly errorSurName: Locator;
  readonly email: Locator;
  readonly errorEmail: Locator;
  readonly errorWrongEmail: Locator;
  readonly password: Locator;
  readonly errorPassword: Locator;
  readonly repeatPassword: Locator;
  readonly errorRepeatPassword: Locator;
  readonly bornDate: Locator
  readonly errorBornDate: Locator
  readonly telNumber: Locator
  readonly errorTelNumberToSmall: Locator
  readonly errorTelNumberWrongType: Locator
  readonly passwordsDontMatch: Locator
  readonly selectLang: Locator
  readonly checkConsent: Locator
  readonly errorConsent: Locator
  readonly header: Locator
  readonly headerSmall: Locator
  readonly terms: Locator



  
  constructor(page: Page) {
      this.page = page;
      //BUTTONS
      this.buttonSubmit = page.locator('.btn', {hasText: 'Zarejestruj'})

      //OTHERS
    this.surName = page.locator('[placeholder="Imię"]');
    this.errorSurName = page.locator('.errors', {hasText: 'Pole Imię jest wymagane'})
    this.name = page.locator('[placeholder="Nazwisko"]');
    this.errorName = page.locator('.errors', {hasText: 'Pole Nazwisko jest wymagane'})
    this.email = page.locator('[placeholder="Twój adres e-mail"]');
    this.errorEmail = page.locator('.errors', {hasText: 'Pole E-mail jest wymagane'})
    this.errorWrongEmail = page.locator('.errors', {hasText: 'Pole E-mail musi być poprawnym adresem email'})
    this.password = page.locator('[placeholder="Hasło"]');
    this.errorPassword = page.locator('.errors', {hasText: 'Pole password jest wymagane'})
    this.repeatPassword = page.locator('[placeholder="Powtórz hasło"]');
    this.errorRepeatPassword = page.locator('.errors', {hasText: 'Pole Powtórz hasło jest wymagane'})
    this.bornDate = page.locator('[placeholder="Data urodzenia"]');
    this.errorBornDate = page.locator('.errors', {hasText: 'Pole Data urodzenia jest wymagane'})
    this.telNumber = page.locator('[placeholder="Numer telefonu"]');
    this.errorTelNumberToSmall = page.locator('.errors', {hasText: 'To pole musi zawierać co najmniej 9 cyfr'})
    this.errorTelNumberWrongType = page.locator('.errors', {hasText: 'To pole może zawierać tylko cyfry i spacje'})
    this.passwordsDontMatch = page.locator('.errors', {hasText: 'Hasła nie są jednakowe!'})
    this.selectLang = page.locator('.input.select'),
    this.checkConsent = page.locator('.fake-input')
    this.errorConsent = page.locator('.errors', {hasText: 'To pole jest wymagane'})
    this.header = page.locator('h1')
    this.headerSmall = page.locator('.email')
    this.terms = page.locator('[href="/regulamin"]')
    

  }
  async selectLanguage(value: string) {
    await this.selectLang.selectOption(value);
  }
  async fillFields(){
    await this.surName.fill(ContactDicts.surname)
        await this.name.fill(ContactDicts.name)
        await this.email.fill(ContactDicts.email)
        await this.password.fill(ContactDicts.goodPassword)
        await this.repeatPassword.fill(ContactDicts.goodPassword)
        await this.bornDate.fill(ContactDicts.bornDate)
        await this.telNumber.fill(ContactDicts.telNumber)
  }
}
