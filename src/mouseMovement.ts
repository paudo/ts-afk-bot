import {mouse, left, right, up, down, sleep, keyboard, Key} from '@nut-tree-fork/nut-js';
import fs from 'fs';
import {ConfigInterface} from "./interfaces/config.interface";

/**
 * Class for Mouse Movement
 */
class MouseMovement {
  private configPath = 'mouseMovement.config'
  private config: ConfigInterface = this.getConfig();

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
        if (this.config.moveMouse) {
          await this.square();
        }
        if  (this.config.keyboardInput && this.config.keyboardInputKey) {
          await this.keyboardInput(this.config.keyboardInputKey);
        }
      }
      lastPosition = await mouse.getPosition();
      await sleep(this.config.delay);
    }
  }

  /**
   * asynchronous function to start moving the mouse in a square shape
   */
  private async square(): Promise<void> {
    if (this.config.move) {
      await mouse.move(right(this.config.move));
      await mouse.move(down(this.config.move));
      await mouse.move(left(this.config.move));
      await mouse.move(up(this.config.move));
    }
  }

  /**
   * Press and release the submitted value on the keyboard
   * @param {Key} key Key binding alias which points to a keyboard key
   */
  private async keyboardInput(key: Key): Promise<void> {
    await keyboard.pressKey(key);
    await keyboard.releaseKey(key);
  }

  private getConfig(): ConfigInterface {
    try {
      fs.accessSync(this.configPath)
    } catch (error) {
      console.error('Config should have been already created, but wasn\'t');
      throw error;
    }
    return JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
  }
}

export default new MouseMovement();
