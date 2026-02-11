import { Page } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  async openProject(projectName: string) {
    await this.page.click(`text=${projectName}`);
  }
}