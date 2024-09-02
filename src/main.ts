import {Worker} from 'worker_threads';
import {Key} from "@nut-tree-fork/nut-js";
import {confirm, input, number, select} from '@inquirer/prompts';
import {ConfigInterface, TempConfigInterface} from "./interfaces/config.interface.js";
import {fileExists, readConfigFromFile, writeConfigToFile} from "./tools.js";

const configPath = 'mouseMovement.config';

const workerPath = './out/mouseMovement.js';

if (!fileExists(configPath)) {
    await editConfig();
}
let worker = new Worker(workerPath);

await operations();

async function operations() {
    let operationsAnswer = await select({
            message: 'Which operation do you want to perform?',
            choices: [
                {name: 'Quit the program', value: 'quit'},
                {
                    name: 'Pause mouse movement',
                    value: 'pause',
                    disabled: worker.threadId > 0 ? false : `not possible since it is not running.`
                },
                {
                    name: 'Restart mouse movement',
                    value: 'restart',
                    disabled: worker.threadId < 0 ? false : `not possible since it is already running. `
                },
                {name: 'Edit settings', value: 'edit'}
            ]
        }
    )
    switch (operationsAnswer) {
        case 'quit':
            await worker.terminate();
            // process.exit(0)
            return
        case 'pause':
            await worker.terminate();
            break;
        case 'restart':
            worker = new Worker(workerPath);
            break;
        case 'edit':
            await editConfig()
            await worker.terminate()
            worker = new Worker(workerPath);
            break;
        default:
            break;
    }
    await operations()
}

async function editConfig() {
    let tempConfigObj: TempConfigInterface = {}


    const delay = await number({
        message: 'Interval between inputs, if not activity is detected in ms.',
        default: 30000,
        required: true
    }) as number
    const moveMouse = await confirm({message: 'Should mouse movement be enabled?', default: true})
    if (moveMouse) {
        tempConfigObj.move = await number({
            message: 'Movement in pixels',
            default: 100,
            required: true
        })
    }
    const keyboardInput = await confirm({message: 'Should keyboard input be enabled?', default: true})
    if (keyboardInput) {
        let test = await input({
            message: 'Keyboard input key',
            default: `${Key.ScrollLock}`,
            required: true,
            validate: (value) => {
                if (Object.keys(Key).includes(value)) {
                    return true
                } else {
                    return 'Invalid value'
                }
            }
        }) as keyof typeof Key
        tempConfigObj.keyboardInputKey = Key[test]
    }

    let configObj: ConfigInterface = {
        delay: delay,
        moveMouse: moveMouse,
        keyboardInput: keyboardInput,
    }
    configObj = { ...configObj, ...tempConfigObj }
    writeConfigToFile(configPath, configObj);
}
