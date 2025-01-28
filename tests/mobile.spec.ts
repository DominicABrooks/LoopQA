import { expect } from "@playwright/test";
import { test } from "./fixtures";
import { DashboardPage } from "../pages/dashboard.page";
import { LoginPage } from "../pages/login.page";

test.describe("Mobile Application Project Tests", () => {
  test.beforeEach(async ({ page, dashboardPage }) => {
    await dashboardPage.leftNav.navigateToTab("Mobile");
  });

  test('Verify "Push notification system" card in "To Do"', async ({
    dashboardPage,
  }) => {
    const section = "To Do",
      cardName = "Push notification system",
      tags = ["Feature"];
    await dashboardPage.verifyCardTags(dashboardPage, section, cardName, tags);
  });

  test('Verify "Offline mode" card in "In Progress"', async ({
    dashboardPage,
  }) => {
    const section = "In Progress",
      cardName = "Offline mode",
      tags = ["Feature", "High Priority"];
    await dashboardPage.verifyCardTags(dashboardPage, section, cardName, tags);
  });

  test('Verify "App icon design" card in "Done"', async ({ dashboardPage }) => {
    const section = "Done",
      cardName = "App icon design",
      tags = ["Design"];
    await dashboardPage.verifyCardTags(dashboardPage, section, cardName, tags);
  });
});
