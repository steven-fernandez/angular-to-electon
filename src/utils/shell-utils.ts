import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function executeCommand(command: string, cwd: string): Promise<void> {
  try {
    const { stdout, stderr } = await execAsync(command, { cwd });
    if (stderr) console.error(stderr);
    if (stdout) console.log(stdout);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Command execution failed: ${error.message}`);
    } else {
      throw new Error('Command execution failed with an unknown error');
    }
  }
} 