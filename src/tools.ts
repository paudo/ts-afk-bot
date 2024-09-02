import fs from 'fs';
import {ConfigInterface} from "./interfaces/config.interface";


export function fileExists(filePath: string): boolean {
    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        return true;
    } catch (err) {
        return false;
    }
}

export function writeConfigToFile(filePath: string, obj: any): void {
    const jsonData = JSON.stringify(obj, null, 2);
    fs.writeFileSync(filePath, jsonData);
}

export function readConfigFromFile(filePath: string): ConfigInterface {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(jsonData);
}

export default { fileExists, writeConfigToFile, readConfigFromFile }