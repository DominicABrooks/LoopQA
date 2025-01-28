import { Locator, Page } from "@playwright/test";

export class LeftNav {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Clicks on the specified tab.
   *
   * @param tab - The Locator object representing the tab to be clicked.
   * @returns A promise that resolves when the click action is completed.
   */
  private async clickTab(tab: Locator) {
    await tab.click();
  }

  /**
   * Navigates to a tab with the specified name.
   *
   * @param tabName - The name of the tab to navigate to.
   * @throws Will throw an error if the tab with the specified name is not found.
   * @returns A promise that resolves when the navigation is complete.
   */
  async navigateToTab(tabName: string) {
    const tab = this.page.locator(`button:has-text("${tabName}")`);
    // Check if the tab exists
    if ((await tab.count()) === 0) {
      throw new Error(`Tab with name "${tabName}" not found`);
    }
    await this.clickTab(tab);
  }
}
