import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { expect, test } from '@playwright/test';

test('HTML and PDF exports render, with representative slide screenshots', async ({ page }, testInfo) => {
  const pdf = await readFile(resolve('site/agentic-harness-l300.pdf'));
  expect(pdf.subarray(0, 5).toString()).toBe('%PDF-');
  expect(pdf.length).toBeGreaterThan(10_000);

  await page.goto(pathToFileURL(resolve('site/index.html')).href);
  const slides = page.locator('section');
  expect(await slides.count()).toBeGreaterThan(1);

  // Cover the title, agenda, dense table, text diagram, and closing timing map.
  const selected = [
    slides.first(),
    slides.filter({ hasText: 'The trail map' }).first(),
    slides.filter({ hasText: 'Reference architecture' }).first(),
    slides.filter({ hasText: 'A worked harness evaluation' }).first(),
    slides.last(),
  ];
  for (const [index, slide] of selected.entries()) {
    await expect(slide).toHaveCount(1);
    const id = await slide.getAttribute('id');
    await page.goto(`${pathToFileURL(resolve('site/index.html')).href}#${id}`);
    await expect(slide).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const screenshot = testInfo.outputPath(`slide-${index + 1}.png`);
    await slide.screenshot({ path: screenshot, animations: 'disabled' });
    await testInfo.attach(`slide-${index + 1}`, { path: screenshot, contentType: 'image/png' });
  }
});
