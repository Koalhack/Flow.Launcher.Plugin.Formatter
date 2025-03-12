import process from 'node:process';
import type { Arguments } from './types.js';
import { ScriptManager } from './scriptManager.js';
import {
  FLSearchResultFormat,
  sendJsonRpcRequest
} from './utils/flowLauncher.js';

const args: Arguments = JSON.parse(process.argv[2] ?? '{}');
const { method, parameters } = args;

let scriptManager = new ScriptManager();
scriptManager.init();

if (method === 'query') {
  const result = FLSearchResultFormat(
    scriptManager.search(parameters[0] ?? '')
  );
  sendJsonRpcRequest({ result });
}

if (method === 'run') {
}
