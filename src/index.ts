#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { addElectron } from './commands/add-electron';
import { validateAngularProject } from './utils/validation-utils';
import chalk from 'chalk';

// Type the argv object
interface Arguments {
  platforms: string;
  _: (string | number)[];
  [x: string]: unknown;
}

const cli = yargs(hideBin(process.argv))
  .usage('Usage: $0 <path> [options]')
  .option('platforms', {
    alias: 'p',
    type: 'string',
    description: 'Target platforms (comma-separated): macos,windows,linux',
    default: 'macos,windows'
  })
  .demandCommand(1, 'Please provide the path to your Angular project')
  .help()
  .alias('help', 'h');

const argv = cli.argv as Arguments;
const projectPath = argv._[0].toString();
const platforms = argv.platforms.split(',');

async function main() {
  try {
    console.log(chalk.blue('🔍 Validating Angular project...'));
    await validateAngularProject(projectPath);
    
    console.log(chalk.blue('⚡ Adding Electron support...'));
    await addElectron(projectPath, platforms);
    
    console.log(chalk.green('✅ Successfully converted to Angular/Electron application!'));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(chalk.red('❌ Error:'), error.message);
    } else {
      console.error(chalk.red('❌ An unknown error occurred'));
    }
    process.exit(1);
  }
}

main(); 