// @ts-ignore
import {mouse, left, right, up, down, straightTo, centerOf, Region, sleep} from '@nut-tree/nut-js';

async function square() {
  await mouse.move(right(move));
  await mouse.move(down(move));
  await mouse.move(left(move));
  await mouse.move(up(move));
}

const [delay, move] = [30000, 100];
let lastPosition = await mouse.getPosition();

while (true) {
  const tmpPosition = await mouse.getPosition();
  if (lastPosition.x === tmpPosition.x && lastPosition.y === tmpPosition.y) {
    await square();
  }
  lastPosition = await mouse.getPosition();
  await sleep(delay);
}
