import {Worker} from 'worker_threads';

let stdin = process.openStdin();
process.stdin.setRawMode(true);

console.log('Press:\tq to quit the program\n' +
  '\tp to pause mouse movement\n' +
  '\tr to restart mouse movement');
stdin.resume();
const workerPath = './out/mouseMovement.js';

let worker = new Worker(workerPath);
stdin.on('data', function (keydata) {
  if (keydata == 'q') {
    console.log('Terminating Worker.');
    worker.terminate().then(process.exit(0));
  } else if (keydata == 'p') {
    if (worker.threadId > 0) {
      worker.terminate().then();
      write('Paused mouse movement.');
    } else {
      write('Mouse movement already paused.');
    }
  } else if (keydata == 'r') {
    if (worker.threadId < 1) {
      worker = new Worker(workerPath);
      write('Restarted mouse movement.');
    } else {
      write('Mouse movement is not paused.');
    }
  }
});

function write(message: string) {
  process.stdout.cursorTo(0);
  process.stdout.clearLine(0);
  process.stdout.write(message);

}
