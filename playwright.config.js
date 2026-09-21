import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  use: {
    channel: 'chrome',
    launchOptions: { executablePath: process.env.CHROME_PATH },
    viewport: { width: 1280, height: 720 },
  },
});
