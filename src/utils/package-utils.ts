import { promises as fs } from 'fs';
import { join } from 'path';

export async function updatePackageJson(projectPath: string, platforms: string[]) {
  const packageJsonPath = join(projectPath, 'package.json');
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));

  // Add Electron-specific scripts
  packageJson.main = 'main.js';
  packageJson.scripts = {
    ...packageJson.scripts,
    'electron:serve': 'electron .',
    'electron:build': 'ng build && electron .',
    'electron:package': 'electron-builder build --config electron-builder.json'
  };

  // Add build configuration
  const buildConfig = {
    appId: `com.${packageJson.name}.app`,
    productName: packageJson.name,
    directories: {
      output: 'release/'
    },
    files: [
      'dist/**/*',
      'main.js',
      'preload.js'
    ],
    mac: {
      category: 'public.app-category.developer-tools'
    },
    win: {
      target: 'nsis'
    },
    linux: {
      target: 'AppImage'
    }
  };

  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
  
  // Create electron-builder.json
  await fs.writeFile(
    join(projectPath, 'electron-builder.json'),
    JSON.stringify(buildConfig, null, 2)
  );
} 