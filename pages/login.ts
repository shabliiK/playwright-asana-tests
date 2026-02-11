import { Page, expect } from '@playwright/test';

/**
 * LoginPage - Handles all login-related actions for the Asana demo app
 * This page object encapsulates the login functionality
 */
export class LoginPage {
  constructor(private page: Page) {}

  /**
   * Navigate to the application home page
   */
  async goto() {
    await this.page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');
  }

  /**
   * Perform login with provided credentials
   * @param email - User email/username
   * @param password - User password
   */
  async login(email: string, password: string) {
    // Fill in the username field
    await this.page.fill('#username', email);

    // Fill in the password field
    await this.page.fill('#password', password);

    // Click the Sign In button
    await this.page.click('button[type="submit"]');

    // Wait for page to load and verify login success by waiting for network to idle
    await this.page.waitForLoadState('networkidle');
  }
}
