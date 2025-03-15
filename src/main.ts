import process from 'node:process';
import type { Arguments } from './types.js';
import { ScriptManager } from './scriptManager.js';
import { FlowLauncher, sendJsonRpcRequest } from './utils/flowLauncher.js';
import { Clipboard } from './utils/clipboard.js';
import type { Script } from './models/Script.js';

const args: Arguments = JSON.parse(process.argv[2] ?? '{}');
const { method, parameters } = args;

let scriptManager = new ScriptManager();
scriptManager.init();

if (method === 'query') {
  let results = FlowLauncher.searchResultFormat(
    scriptManager.search(parameters[0] ?? '')
  );
  sendJsonRpcRequest({ result: results });
}

if (method === 'run') {
  let clip = Clipboard.get();
  let activeScript = scriptManager.scripts.filter(
    script => script.name === parameters[0]
  )[0];
  const result = scriptManager.runScript(activeScript as Script, clip);
  Clipboard.copy(result);
  FlowLauncher.showMessage('New Result Copied!', 'Yeah !!!');
}
