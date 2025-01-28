import { test } from "./fixtures";
import testData from "../data/testData.json";

testData.forEach(({ tab, tests }) => {
  test.describe(`${tab} Application Project Tests`, () => {
    test.beforeEach(async ({ dashboardPage }) => {
      await dashboardPage.leftNav.navigateToTab(tab);
    });

    tests.forEach(({ section, cardName, tags }) => {
      test(`Verify "${cardName}" card in "${section}"`, async ({
        dashboardPage,
      }) => {
        await dashboardPage.verifyCardTags(
          dashboardPage,
          section,
          cardName,
          tags,
        );
      });
    });
  });
});
