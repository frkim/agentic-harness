import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { expect, test } from '@playwright/test';

test('guide-only broken links and anchors fail without a deck change', async () => {
  const root = await mkdtemp(join(tmpdir(), 'harness-links-'));
  try {
    execFileSync('git', ['init', '--quiet', root]);
    execFileSync('git', ['-C', root, 'remote', 'add', 'origin', 'https://github.com/frkim/agentic-harness.git']);
    await mkdir(join(root, 'docs'));
    await writeFile(join(root, 'README.md'), '# Reference\n\n## Build\n');
    const remark = resolve('node_modules/remark-cli/cli.js');
    const plugin = resolve('node_modules/remark-validate-links/index.js');
    const cases = [
      ['[valid file](../README.md) and [valid anchor](../README.md#build)', 0],
      ['[missing file](missing.md)', 1],
      ['[missing local anchor](#missing)', 1],
      ['[missing cross-file anchor](../README.md#missing)', 1],
    ];
    for (const [link, expectedStatus] of cases) {
      await writeFile(join(root, 'docs/guide.md'), `# Guide\n\n${link}\n`);
      const result = spawnSync(process.execPath, [
        remark, '--use', plugin, '--frail', '--no-stdout', 'README.md', 'docs/guide.md',
      ], { cwd: root, encoding: 'utf8' });
      expect(result.error).toBeUndefined();
      expect(result.status, result.stderr).toBe(expectedStatus);
      if (expectedStatus !== 0) {
        expect(result.stderr).toContain('remark-validate-links');
      }
    }
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
