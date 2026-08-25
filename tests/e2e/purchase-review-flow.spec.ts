import { test, expect } from '@playwright/test';

test.describe('Purchase → Review Loop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('complete purchase and review flow', async ({ page }) => {
    // 1. Start at homepage
    await expect(page.locator('h1')).toContainText('Nexus');
    
    // 2. Navigate to modules
    await page.click('text=浏览所有模块');
    await expect(page).toHaveURL(/\/modules/);
    
    // 3. Click on a module
    await page.click('text=Next.js 14 核心指南');
    await expect(page).toHaveURL(/\/modules\/nextjs-14-guide/);
    
    // 4. Click purchase
    await page.click('text=立即购买');
    await expect(page).toHaveURL(/\/purchase\//);
    
    // 5. Confirm payment (Mock)
    await page.click('text=确认支付');
    await expect(page).toHaveURL(/\/purchase\//);
    
    // 6. Navigate to write review
    await page.click('text=去评价');
    await expect(page).toHaveURL(/\/review\//);
    
    // 7. Fill and submit review
    await page.click('button[value="5"]'); // 5 stars
    await page.fill('textarea[name="body"]', '这篇文章非常值得推荐！特别是关于 Serverless 的部分，让我领悟到了很多关键点。');
    await page.click('text=提交评价');
    
    // 8. Should redirect to dashboard or module page
    await expect(page.locator('text=我的仪表盘')).toBeVisible();
  });
});

test.describe('Auth Flow', () => {
  test('phone login flow', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('h1')).toContainText('欢迎回归 Nexus');
    
    await page.fill('input[name="phone"]', '13800138000');
    await page.click('text=发送验证码');
    
    // In dev, the code is logged to console
    await expect(page.locator('text=验证码已发送')).toBeVisible({ timeout: 5000 });
  });

  test('email magic link flow', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.click('text=发送登录链接');
    
    await expect(page.locator('text=发送成功')).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Fragment Discovery', () => {
  test('fragment page loads', async ({ page }) => {
    await page.goto('/fragments');
    await expect(page.locator('h1')).toContainText('知识碎片流');
    await expect(page.locator('text=来自').first()).toBeVisible();
  });
});