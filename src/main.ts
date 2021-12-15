import {Worker} from 'worker_threads';

let stdin = process.openStdin();
process.stdin.setRawMode(true);

console.log('Press q to quit the program');
stdin.resume();

let worker = new Worker('./out/mouseMovement.js');
stdin.on('data', function (keydata) {
  if (keydata == 'q') {
    console.log('Terminating Worker.');
    worker.terminate().then(process.exit(0));
  }
});
