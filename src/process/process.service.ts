import { Injectable } from '@nestjs/common';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

@Injectable()
export class ProcessService {
  private child: ChildProcessWithoutNullStreams;

  /**
   * Spawns a child process.
   * @param command - The command to run (e.g., 'sh', 'python').
   * @param args - Arguments for the command.
   * @returns The child process instance.
   */
  spawnProcess(
    command: string,
    args: string[],
  ): ChildProcessWithoutNullStreams {
    this.child = spawn(command, args);

    // Handle stdout
    this.child.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    // Handle stderr
    this.child.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    // Handle process exit
    this.child.on('close', (code) => {
      console.log(`Child process exited with code ${code}`);
    });

    // Handle process error
    this.child.on('error', (error) => {
      console.error(`Child process error: ${error.message}`);
    });

    return this.child;
  }

  /**
   * Writes input to the child process's stdin.
   * @param input - The input to send to the process.
   */
  writeToStdin(input: string): void {
    if (!this.child) {
      throw new Error('Child process not spawned');
    }
    this.child.stdin.write(input);
  }

  /**
   * Ends the child process's stdin.
   */
  endStdin(): void {
    if (!this.child) {
      throw new Error('Child process not spawned');
    }
    this.child.stdin.end();
  }
}
