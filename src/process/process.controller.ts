import { Controller, Post, Body } from '@nestjs/common';
import { ProcessService } from './process.service';

@Controller('process')
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  // Spawns a child process.
  @Post('spawn')
  spawnProcess(@Body('command') command: string, @Body('args') args: string[]) {
    this.processService.spawnProcess(command, args);
    return { message: 'Child process spawned' };
  }

  // Writes input to the child process's stdin.
  @Post('stdin')
  writeToStdin(@Body('input') input: string) {
    this.processService.writeToStdin(input);
    return { message: `input: ${input}` };
  }

  // Ends the child process's stdin.
  @Post('end')
  endStdin() {
    this.processService.endStdin();
    return { message: 'Child process stdin ended' };
  }
}
