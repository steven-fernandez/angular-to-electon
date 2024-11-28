import { join } from 'path';
import { updatePackageJson } from '../utils/package-utils';
import { createElectronFiles } from '../utils/file-utils';
import { executeCommand } from '../utils/shell-utils';
import chalk from 'chalk';

export async function addElectron(projectPath: string, platforms: string[]) {
  try {
    // Install required dependencies
    console.log(chalk.blue('📦 Installing Electron dependencies...'));
    await executeCommand('npm install electron electron-builder --save-dev', projectPath);
    
    // Create Electron files
    console.log(chalk.blue('📝 Creating Electron configuration files...'));
    await createElectronFiles(projectPath);
    
    // Update package.json
    console.log(chalk.blue('🔄 Updating package.json...'));
    await updatePackageJson(projectPath, platforms);
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to add Electron support: ${error.message}`);
    } else {
      throw new Error('Failed to add Electron support: An unknown error occurred');
    }
  }
} 