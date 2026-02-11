/**
 * Asana Demo - Data-Driven Test Suite
 * 
 * This test suite demonstrates a data-driven approach to testing.
 * Instead of writing individual test cases, we maintain a single test that iterates
 * through an array of test data (testCases). This approach:
 * - Reduces code duplication
 * - Makes it easy to add/modify test cases by updating the data array
 * - Maintains a consistent testing pattern
 * - Improves scalability and maintainability
 */

// Import the custom test fixture that includes login and page objects
import { test } from './fixtures/auth.fixture';
// Import the test data array containing all test cases
import { testCases } from './data/testCases';

/**
 * Test suite grouping - provides organization for related tests in the report
 */
test.describe('Asana Demo - Data Driven Validation', () => {

  /**
   * Iterate through each test case in the testCases array
   * For each test case, create a unique test with the task name in the title
   */
  for (const data of testCases) {

    /**
     * Individual test case - uses data-driven approach
     * Parameters:
     * - dashboard: Authenticated DashboardPage instance (fixture automatically handles login)
     * - project: ProjectPage instance for task verification
     */
    test(`Validate task: ${data.taskName}`, async ({ dashboard, project }) => {

      // Step 1: Navigate to the specified project
      // This clicks on the project button and waits for the project page to load
      await dashboard.openProject(data.project);

      // Step 2: Verify the task exists in the expected column with correct tags
      // The verifyTask method (in ProjectPage) handles:
      // - Checking if the task exists in the specified column
      // - Verifying all expected tags are present on the task
      await project.verifyTask({
        task: data.taskName,
        column: data.expectedColumn,
        tags: data.expectedTags
      });

    });

  }

});

