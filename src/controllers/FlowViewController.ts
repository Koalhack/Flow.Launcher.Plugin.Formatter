import type { ScriptManager } from '../scriptManager.js';
import { FlowLauncher, sendJsonRpcRequest } from '../utils/flowLauncher.js';

type FlowViewControllerArguments = {
  manager: ScriptManager;
};

export class FlowViewController {
  scriptManager: ScriptManager;

  constructor({ manager }: FlowViewControllerArguments) {
    this.scriptManager = manager;
  }

  // ─── METHOD: query ───────────────────────────────────────────────────────────────────
  queryScript(parameter: string = '') {
    const results = this.scriptManager.search(parameter ?? '');
    const resultsFmt = FlowLauncher.searchResultFormat(results);

    // Send result to Flow laucher via JsonRPC
    sendJsonRpcRequest({ result: resultsFmt });
  }

  // ─── METHOD: run ─────────────────────────────────────────────────────────────────────
  runSelectedScript(parameters: string) {
    const scriptArguments = JSON.parse(parameters);
    this.scriptManager.runScriptM(scriptArguments);
  }
}
