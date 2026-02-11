import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login';
// Import DashboardPage from dashboard.ts (not dashboard.page.ts)
import { DashboardPage } from '../pages/dashboard';
// Import ProjectPage from project.page.ts
import { ProjectPage } from '../pages/project.page';

/**
 * Custom fixtures that extend the base Playwright test with page objects
 * This provides authentication and access to dashboard and project pages
 */
type Fixtures = {
  // DashboardPage fixture: provides authenticated access to the dashboard
  dashboard: DashboardPage;
  // ProjectPage fixture: provides access to project-specific verification methods
  project: ProjectPage;
};

/**
 * Extend base test with custom fixtures
 * The dashboard fixture automatically handles login and provides the dashboard page
 */
export const test = base.extend<Fixtures>({
  // Dashboard fixture setup: logs in and provides DashboardPage instance
  dashboard: async ({ page }, use) => {
    // Create a login page instance
    const login = new LoginPage(page);
    
    // Navigate to the application
    await login.goto();
    
    // Perform login with demo credentials
    await login.login('admin', 'password123');

    // Provide the DashboardPage instance to the test
    await use(new DashboardPage(page));
  },

  // Project fixture setup: provides ProjectPage instance for task verification
  project: async ({ page }, use) => {
    // Provide the ProjectPage instance to the test
    await use(new ProjectPage(page));
  }
});

// Export the expect function from Playwright for use in tests
export { expect } from '@playwright/test';

