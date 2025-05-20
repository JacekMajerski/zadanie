import { test, expect } from '@playwright/test';
import { ContactPage } from '../pom/contact-page';
import { ContactDicts } from '../dicts/contact-dict';

test.describe('Formularz kontaktowy', () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    contactPage = new ContactPage(page);
  });

  test('Weryfikacja notyfikacji o wymaganych polach', async ({ page }) => {
    await contactPage.buttonSubmit.click();
    await expect(contactPage.errorName).toBeVisible();
    await expect(contactPage.errorSurName).toBeVisible();
    await expect(contactPage.errorEmail).toBeVisible();
    await expect(contactPage.errorPassword).toBeVisible();
    await expect(contactPage.errorRepeatPassword).toBeVisible();
    await expect(contactPage.errorBornDate).toBeVisible();
  });

  test('Weryfikacja notyfikacji o wpisaniu mniej niz 9 cyfr', async ({
    page,
  }) => {
    await expect(contactPage.telNumber).toBeVisible();
    await page.waitForTimeout(1500);
    await contactPage.telNumber.fill(ContactDicts.wrongTelNumber);
    await contactPage.name.click();
    await contactPage.buttonSubmit.click();
    await expect(contactPage.errorTelNumberToSmall).toBeVisible();
  });

  test('Weryfikacja notyfikacji o wpisaniu litery w nr telefonu', async ({
    page,
  }) => {
    await expect(contactPage.telNumber).toBeVisible();
    await page.waitForTimeout(1500);
    await contactPage.telNumber.fill('dd');
    await expect(contactPage.errorTelNumberWrongType).toBeVisible();
  });

  test('Weryfikacja notyfikacji o wpisaniu poprawnego emaila', async ({
    page,
  }) => {
    await expect(contactPage.email).toBeVisible();
    await page.waitForTimeout(1500);
    await contactPage.email.fill(ContactDicts.wrongEmail);
    await expect(contactPage.errorWrongEmail).toBeVisible();
  });

  test('Weryfikacja notyfikacji o zgodnosci haseł', async ({ page }) => {
    await contactPage.password.fill(ContactDicts.goodPassword);
    await contactPage.repeatPassword.fill(ContactDicts.goodPassword2);
    await expect(contactPage.passwordsDontMatch).toBeVisible();
  });

  test('weryfikacja blokady rejestracji bez zaznaczenia zgód', async ({
    page,
  }) => {
    await contactPage.fillFields();
    await contactPage.selectLanguage('pl');
    await contactPage.buttonSubmit.click();
    await expect(contactPage.errorConsent).toBeVisible();
  });

  test('weryfikacja rejestracji z wymagana zgodą', async ({ page }) => {
    await contactPage.fillFields();
    await contactPage.selectLanguage('pl');
    await contactPage.checkConsent.first().click();
    await contactPage.buttonSubmit.click();
    await expect(contactPage.header).toHaveText(
      `${ContactDicts.surname}, dziękujemy za rejestrację!`
    );
    await expect(contactPage.headerSmall).toHaveText(`${ContactDicts.email}`);
  });

  test('weryfikacja rejestracji z obydwiema zgodami', async ({ page }) => {
    await contactPage.fillFields();
    await contactPage.selectLanguage('pl');
    await contactPage.checkConsent.first().click();
    await contactPage.checkConsent.nth(1).click();

    await contactPage.buttonSubmit.click();
    await expect(contactPage.header).toHaveText(
      `${ContactDicts.surname}, dziękujemy za rejestrację!`
    );
    await expect(contactPage.headerSmall).toHaveText(`${ContactDicts.email}`);
  });
});
