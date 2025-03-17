import process from 'node:process';
import type { Arguments } from './types.js';
import { ScriptManager } from './scriptManager.js';
import { FlowViewController } from './controllers/FlowViewController.js';

const args: Arguments = JSON.parse(process.argv[2] ?? '{}');
const { method, parameters } = args;

const scriptManager = new ScriptManager();
const flowViewController = new FlowViewController({ manager: scriptManager });

if (method === 'query') {
  // Init scriptManager to load all scripts
  scriptManager.init();

  flowViewController.queryScript(parameters[0] as string);
}

if (method === 'run') {
  flowViewController.runSelectedScript(parameters[0] as string);
}
