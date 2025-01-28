import { expect, Page, Locator } from "@playwright/test";
import { LeftNav } from "./common/left.nav";

export class DashboardPage {
  public leftNav: LeftNav;
  private page: Page;

  constructor(page: Page) {
    this.page = page;
    this.leftNav = new LeftNav(page);
  }

  /**
   * Returns a Locator object that targets a section within the page.
   * The section is identified by a CSS class of 'rounded-lg' and filtered by the provided section name.
   *
   * @param sectionName - The name of the section to locate.
   * @returns A Locator object for the specified section.
   */
  private section(sectionName: string): Locator {
    return this.page
      .locator(".rounded-lg")
      .filter({ hasText: new RegExp(`^${sectionName}`) });
  }

  /**
   * Retrieves a Locator for a specific card within a given section.
   *
   * @param sectionName - The name of the section containing the card.
   * @param cardName - The name of the card to locate.
   * @returns A Locator object for the specified card.
   */
  private card(sectionName: string, cardName: string): Locator {
    return this.section(sectionName)
      .locator(`.bg-white`)
      .filter({ hasText: new RegExp(`^${cardName}`) });
  }

  /**
   * Retrieves the tags associated with a specific card within a given section.
   *
   * @param sectionName - The name of the section containing the card.
   * @param cardName - The name of the card to retrieve tags from.
   * @returns A promise that resolves to an array of strings, each representing a tag.
   */
  async getCardTags(sectionName: string, cardName: string): Promise<string[]> {
    const card = this.card(sectionName, cardName);
    const tagElements = await card
      .locator(".gap-2")
      .locator("span")
      .allTextContents();
    return tagElements;
  }

  /**
   * Asserts that the specified card within a section contains the expected tags.
   *
   * @param sectionName - The name of the section containing the card.
   * @param cardName - The name of the card to check.
   * @param expectedTags - An array of tags that are expected to be present on the card.
   * @returns A promise that resolves when the assertion is complete.
   */
  async assertCardTags(
    sectionName: string,
    cardName: string,
    expectedTags: string[],
  ): Promise<void> {
    const tags = await this.getCardTags(sectionName, cardName);
    for (const tag of expectedTags) {
      expect(tags).toContain(tag);
    }
  }

  /**
   * Asserts that a specific section contains a card with the expected text.
   *
   * @param sectionName - The name of the section to search within.
   * @param expectedText - The text expected to be found within the card.
   * @returns A promise that resolves when the assertion is complete.
   */
  async assertSectionHasCard(
    sectionName: string,
    expectedText: string,
  ): Promise<void> {
    const cards = this.section(sectionName).locator(
      ".bg-white >> text=" + expectedText,
    );
    await expect(cards).toContainText(expectedText);
  }

  /**
   * Verifies that a card within a specified section on the dashboard has the expected tags.
   *
   * @param dashboardPage - The instance of the DashboardPage.
   * @param section - The section of the dashboard where the card is located.
   * @param cardName - The name of the card to verify.
   * @param expectedTags - An array of expected tags that should be present on the card.
   * @returns A promise that resolves when the verification is complete.
   */
  async verifyCardTags(
    dashboardPage: DashboardPage,
    section: string,
    cardName: string,
    expectedTags: string[],
  ): Promise<void> {
    await dashboardPage.assertSectionHasCard(section, cardName);
    const tags = await dashboardPage.getCardTags(section, cardName);
    expect(tags).toEqual(expectedTags);
  }
}
