// const robot = require('robotjs');
import robot from 'robotjs';

const delay = 30000;
const move = 100;

robot.setMouseDelay(delay);
let lastPosition = robot.getMousePos();

while (true) {
    for (let ele of [move, -move]) {
        const tmp = robot.getMousePos()
        if (lastPosition.x === tmp.x && lastPosition.y === tmp.y) {
            const mouse = robot.getMousePos();
            lastPosition = {x: mouse.x, y: mouse.y + ele};
            robot.moveMouse(mouse.x, mouse.y + ele);
        } else {
            lastPosition = robot.getMousePos();
            robot.moveMouse(robot.getMousePos().x, robot.getMousePos().y);
        }
    }
}