import { test as base, Page } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { DashboardPage } from "../pages/dashboard.page";

type TestFixtures = {
  page: Page;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
};

const test = base.extend<TestFixtures>({
  page: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await page.goto("/");
    await loginPage.login(process.env.DEMO_USERNAME, process.env.DEMO_PASSWORD);

    await use(page);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
});

export { test };
