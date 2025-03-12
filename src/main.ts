import process from 'node:process';
import type { Arguments } from './types.js';
import { ScriptManager } from './scriptManager.js';

const args: Arguments = JSON.parse(process.argv[2] ?? '{}');
const { method, parameters } = args;

if (method === 'query') {
}

if (method === 'do_something_for_query') {
}

let scriptManager = new ScriptManager();
scriptManager.init();

console.log(scriptManager.scripts);
