import { promises as fs } from 'fs';
import { join } from 'path';

export async function validateAngularProject(projectPath: string): Promise<void> {
  try {
    // Check if directory exists
    await fs.access(projectPath);
    
    // Check for angular.json
    const angularJsonPath = join(projectPath, 'angular.json');
    await fs.access(angularJsonPath);
    
    // Check for package.json
    const packageJsonPath = join(projectPath, 'package.json');
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
    
    // Verify Angular dependencies
    if (!packageJson.dependencies['@angular/core']) {
      throw new Error('Not a valid Angular project: @angular/core dependency not found');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Invalid Angular project: ${error.message}`);
    } else {
      throw new Error('Invalid Angular project: An unknown error occurred');
    }
  }
} 