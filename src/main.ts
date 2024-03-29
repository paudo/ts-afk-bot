import {Worker} from 'worker_threads';
import chalk from 'chalk';

const stdin = process.openStdin();
process.stdin.setRawMode(true);

console.log('Press:\tq to quit the program\n' +
  '\tp to pause mouse movement\n' +
  '\tr to restart mouse movement');
stdin.resume();
const workerPath = './out/mouseMovement.js';

let worker = new Worker(workerPath);
stdin.on('data', (keydata) => {
  if (keydata == 'q') {
    console.log('\nTerminating Worker.');
    worker.terminate().then(process.exit(0));
  } else if (keydata == 'p') {
    if (worker.threadId > 0) {
      worker.terminate().then();
      write(chalk.green('Paused mouse movement.'));
    } else {
      write(chalk.red('Mouse movement already paused.'));
    }
  } else if (keydata == 'r') {
    if (worker.threadId < 1) {
      worker = new Worker(workerPath);
      write(chalk.green('Restarted mouse movement.'));
    } else {
      write(chalk.red('Mouse movement is not paused.'));
    }
  }
});

/**
 * Move cursor to beginning of line and delete all content, then write message
 * @param {string} message Message that should be written
 */
function write(message: string): void {
  process.stdout.cursorTo(0);
  process.stdout.clearLine(0);
  process.stdout.write(message);
}
