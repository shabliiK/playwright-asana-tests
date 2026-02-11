/**
 * TestCase Interface - Defines the structure for data-driven test cases
 * Each test case specifies a project, task, column location, and expected tags
 */
interface TestCase {
  testId: number;           // Unique identifier for the test case
  project: string;          // Project name (e.g., "Web Application", "Mobile Application")
  taskName: string;         // Name of the task to verify
  expectedColumn: string;   // Expected column where the task should be (e.g., "To Do", "In Progress", "Done")
  expectedTags: string[];   // Array of expected tags on the task
}

/**
 * Test data array containing all 6 test cases
 * This demonstrates the data-driven approach where tests iterate through this array
 * Each test case is independent and can be easily added, modified, or removed
 */export const testCases: TestCase[] = [
  {
    testId: 1,
    project: "Web Application",
    taskName: "Implement user authentication",
    expectedColumn: "To Do",
    expectedTags: ["Feature", "High Priority"],
  },
  {
    testId: 2,
    project: "Web Application",
    taskName: "Fix navigation bug",
    expectedColumn: "To Do",
    expectedTags: ["Bug"],
  },
  {
    testId: 3,
    project: "Web Application",
    taskName: "Design system updates",
    expectedColumn: "In Progress",
    expectedTags: ["Design"],
  },
  {
    testId: 4,
    project: "Mobile Application",
    taskName: "Push notification system",
    expectedColumn: "To Do",
    expectedTags: ["Feature"],
  },
  {
    testId: 5,
    project: "Mobile Application",
    taskName: "Offline mode",
    expectedColumn: "In Progress",
    expectedTags: ["Feature", "High Priority"],
  },
  {
    testId: 6,
    project: "Mobile Application",
    taskName: "App icon design",
    expectedColumn: "Done",
    expectedTags: ["Design"],
  },
];
