import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('runtime surface', () => {
  it('does not ship AI/server dependencies or provider secrets', () => {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8')) as {
      dependencies?: Record<string, string>;
    };
    const viteConfig = readFileSync('vite.config.ts', 'utf8');
    const environmentExample = readFileSync('.env.example', 'utf8');

    expect(packageJson.dependencies).not.toHaveProperty('@google/genai');
    expect(packageJson.dependencies).not.toHaveProperty('express');
    expect(packageJson.dependencies).not.toHaveProperty('dotenv');
    expect(`${viteConfig}\n${environmentExample}`).not.toMatch(/GEMINI_API_KEY|OPENAI_API_KEY/);
  });
});
