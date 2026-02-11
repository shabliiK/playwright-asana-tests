import { Page } from '@playwright/test';

/**
 * DashboardPage - Handles interactions with the projects dashboard
 * Used for navigating to different projects and viewing project list
 */
export class DashboardPage {
  constructor(private page: Page) {}

  /**
   * Navigate to a specific project by clicking on its button
   * @param projectName - The name of the project to open (e.g., "Web Application", "Mobile Application")
   */
  async openProject(projectName: string) {
    // Find and click the project button with the specified name
    const projectButton = this.page.locator(`button:has-text("${projectName}")`).first();
    
    // Wait for the button to be visible before clicking
    await projectButton.isVisible({ timeout: 10000 });
    
    // Click the project button
    await projectButton.click();

    // Wait for the project page to fully load
    await this.page.waitForLoadState('networkidle');
    
    // Additional wait to ensure all content is rendered
    await this.page.waitForTimeout(1000);
  }
}
