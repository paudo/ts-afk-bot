import {mouse, left, right, up, down, sleep} from '@nut-tree/nut-js';

class MouseMovement {

  private delay = 30000;
  private move = 100;

  constructor() {
    this.startMovement().then();
  }

  private async startMovement() {
    let lastPosition = await mouse.getPosition();

    while (true) {
      const tmpPosition = await mouse.getPosition();
      if (lastPosition.x === tmpPosition.x && lastPosition.y === tmpPosition.y) {
        await this.square();
      }
      lastPosition = await mouse.getPosition();
      await sleep(this.delay);
    }
  }

  private async square() {
    await mouse.move(right(this.move));
    await mouse.move(down(this.move));
    await mouse.move(left(this.move));
    await mouse.move(up(this.move));
  }
}

export default new MouseMovement();
