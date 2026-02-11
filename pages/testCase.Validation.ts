import { Page, expect } from '@playwright/test';

interface TaskOptions {
  task: string;
  column: string;
  tags: string[];
}

export class ProjectPage {
  constructor(private page: Page) {}

  async verifyTask({ task, column, tags }: TaskOptions) {
    const columnLocator = this.page.locator(`text=${column}`).locator('..');
    const taskCard = columnLocator.locator(`text=${task}`);

    await expect(taskCard).toBeVisible();

    for (const tag of tags) {
      await expect(taskCard.locator(`text=${tag}`)).toBeVisible();
    }
  }
}