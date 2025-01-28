import { Locator, Page } from "@playwright/test";

export class LoginPage {
  private page: Page;

  private readonly usernameTextbox: Locator;
  private readonly passwordTextbox: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameTextbox = this.page.getByRole("textbox", { name: "Username" });
    this.passwordTextbox = this.page.getByRole("textbox", { name: "Password" });
    this.loginButton = this.page.getByRole("button", { name: "Sign in" });
  }

  /**
   * Fills the username textbox with the provided username.
   *
   * @param username - The username to be entered into the textbox.
   * @returns A promise that resolves when the username has been filled.
   */
  private async fillUsernameTextbox(username: string) {
    await this.usernameTextbox.fill(username);
  }

  /**
   * Fills the password textbox with the provided password.
   *
   * @param password - The password to be entered into the password textbox.
   * @returns A promise that resolves when the password has been filled.
   */
  private async fillPasswordTextbox(password: string) {
    await this.passwordTextbox.fill(password);
  }

  /**
   * Clicks the login button on the login page.
   *
   * @returns {Promise<void>} A promise that resolves when the login button has been clicked.
   */
  private async clickLoginButton() {
    await this.loginButton.click();
  }

  /**
   * Logs in a user by filling in the username and password fields and clicking the login button.
   *
   * @param username - The username to be entered in the username textbox. Defaults to an empty string.
   * @param password - The password to be entered in the password textbox. Defaults to an empty string.
   * @returns A promise that resolves when the login process is complete.
   */
  async login(username: string = "", password: string = "") {
    await this.fillUsernameTextbox(username);
    await this.fillPasswordTextbox(password);
    await this.clickLoginButton();
  }
}
