import {mouse, left, right, up, down, sleep, keyboard, Key} from '@nut-tree/nut-js';

/**
 * Class for Mouse Movement
 */
class MouseMovement {
  private delay = 30000;
  private move = 100;

  /**
   * Move Movement constructor that calls the asynchronous startMovement function
   */
  constructor() {
    this.startMovement().then();
  }

  /**
   * Start movement by calling both square and keyboardInput
   */
  private async startMovement(): Promise<void> {
    let lastPosition = await mouse.getPosition();

    while (true) {
      const tmpPosition = await mouse.getPosition();
      if (lastPosition.x === tmpPosition.x && lastPosition.y === tmpPosition.y) {
        await this.square();
        await this.keyboardInput(Key.LeftControl);
      }
      lastPosition = await mouse.getPosition();
      await sleep(this.delay);
    }
  }

  /**
   * asynchronous function to start moving the mouse in a square shape
   */
  private async square(): Promise<void> {
    await mouse.move(right(this.move));
    await mouse.move(down(this.move));
    await mouse.move(left(this.move));
    await mouse.move(up(this.move));
  }

  /**
   * Press and release the submitted value on the keyboard
   * @param {Key} key Key binding alias which points to a keyboard key
   */
  private async keyboardInput(key: Key): Promise<void> {
    await keyboard.pressKey(key);
    await keyboard.releaseKey(key);
  }
}

export default new MouseMovement();
