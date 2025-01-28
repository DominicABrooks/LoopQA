import { test } from "./fixtures";

test.describe("Web Application Project Tests", () => {
  test.beforeEach(async ({ page, dashboardPage }) => {
    await dashboardPage.leftNav.navigateToTab("Web Application");
  });

  test('Verify "Implement user authentication" card in "To Do"', async ({
    dashboardPage,
  }) => {
    const section = "To Do",
      cardName = "Implement user authentication",
      tags = ["Feature", "High Priority"];
    await dashboardPage.verifyCardTags(dashboardPage, section, cardName, tags);
  });

  test('Verify "Fix navigation bug" card in "To Do"', async ({
    dashboardPage,
  }) => {
    const section = "To Do",
      cardName = "Fix navigation bug",
      tags = ["Bug"];
    await dashboardPage.verifyCardTags(dashboardPage, section, cardName, tags);
  });

  test('Verify "Design system updates" card in "In Progress"', async ({
    dashboardPage,
  }) => {
    const section = "In Progress",
      cardName = "Design system updates",
      tags = ["Design"];
    await dashboardPage.verifyCardTags(dashboardPage, section, cardName, tags);
  });
});
