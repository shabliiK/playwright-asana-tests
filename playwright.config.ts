import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration
 * Defines test settings, timeouts, reporters, and browser configurations
 */
export default defineConfig({
  // Directory where test files are located
  testDir: '.',
  
  // Pattern to match test files (only .spec.ts files)
  testMatch: '**/*.spec.ts',
  
  // Global test timeout (120 seconds per test)
  timeout: 120000,
  
  // Individual assertion/expectation timeout
  expect: {
    timeout: 10000,
  },
  
  // Run tests sequentially (not in parallel) for consistency
  fullyParallel: false,
  
  // Fail on test.only() in CI/production environment
  forbidOnly: !!process.env.CI,
  
  // Number of retries for failed tests (only in CI)
  retries: process.env.CI ? 2 : 0,
  
  // Number of worker processes (1 in CI for consistency)
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter configuration - generates HTML report
  reporter: 'html',
  
  // Browser and page settings
  use: {
    // Base URL for all requests
    baseURL: 'https://animated-gingersnap-8cf7f2.netlify.app/',
    
    // Trace recordings for debugging failed tests
    trace: 'on-first-retry',
    
    // Screenshot capture on test failure
    screenshot: 'only-on-failure',
  },

  // Define browsers to test on
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
