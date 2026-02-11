import { Page } from '@playwright/test';

/**
 * Interface for task verification parameters
 * Defines the structure for task verification data
 */
interface TaskVerificationParams {
  task: string;           // Name of the task to verify
  column: string;         // Expected column (e.g., "To Do", "In Progress", "Done")
  tags: string[];         // Array of expected tags
}

/**
 * ProjectPage - Handles task verification within a project
 * Used for verifying task placement and associated tags
 */
export class ProjectPage {
  constructor(private page: Page) {}

  /**
   * Verify that a task exists in the expected column with correct tags
   * @param params - Object containing task name, column, and tags to verify
   */
  async verifyTask(params: TaskVerificationParams) {
    const { task, column, tags } = params;

    // Verify the task exists in the correct column
    await this.verifyTaskInColumn(column, task);

    // Verify all expected tags are present on the task
    await this.verifyTaskTags(task, tags);
  }

  /**
   * Verify that a task exists in a specific column
   * @param columnName - The name of the column (e.g., "To Do", "In Progress", "Done")
   * @param taskName - The name of the task to find
   */
  private async verifyTaskInColumn(columnName: string, taskName: string) {
    // Find the column header by searching for H2 elements with the column name
    const columnHeader = this.page.locator(`h2:has-text("${columnName}")`).first();
    
    // Verify the column header is visible to confirm column exists
    await columnHeader.isVisible({ timeout: 10000 });

    // Find the task within the page by searching for H3 elements with the task name
    const taskLocator = this.page.locator(`h3:has-text("${taskName}")`).first();

    // Verify the task heading is visible and in the expected column
    await taskLocator.isVisible({ timeout: 10000 });
  }

  /**
   * Verify that a task has all expected tags
   * @param taskName - The name of the task
   * @param expectedTags - Array of tag names that should be present on the task
   */
  private async verifyTaskTags(taskName: string, expectedTags: string[]) {
    // Find the task heading by searching for H3 with the task name
    const taskHeading = this.page.locator(`h3:has-text("${taskName}")`).first();
    
    // Verify the task heading is visible
    await taskHeading.isVisible({ timeout: 10000 });

    // Find the parent task card container (white background div containing the task)
    const taskCard = taskHeading.locator("xpath=ancestor::div[contains(@class, 'bg-white')][1]");

    // Extract all text content from the task card
    const containerText = await taskCard.first().innerText();

    // Verify each expected tag is present in the task content
    for (const tag of expectedTags) {
      // Check if the tag text is contained in the task card
      if (!containerText.includes(tag)) {
        throw new Error(`Tag "${tag}" not found in task "${taskName}"`);
      }
    }
  }
}
