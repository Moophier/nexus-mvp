import { test, expect } from '@playwright/test';

test.describe('Auth Flows', () => {
  test('login page loads', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('h1')).toContainText('欢迎回归 Nexus');
    await expect(page.locator('input[name="phone"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
  });

  test('verify page loads', async ({ page }) => {
    await page.goto('/verify');
    await expect(page.locator('h1')).toContainText('身份验证');
    await expect(page.locator('input[maxlength="1"]')).toHaveCount(6);
  });
});