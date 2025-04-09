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
    const normalizeQuery = parameter.toLowerCase();

    const errorResults = this.scriptManager.scriptsError;
    const errorsFMT = FlowLauncher.searchScriptErrorResultFMT(errorResults);

    const scriptResults = this.scriptManager.search(normalizeQuery);
    const scriptsFMT = FlowLauncher.searchScriptResultFMT(scriptResults);

    // Send result to Flow laucher via JsonRPC
    sendJsonRpcRequest({ result: [...errorsFMT, ...scriptsFMT] });
  }

  // ─── METHOD: run ─────────────────────────────────────────────────────────────────────
  runSelectedScript(parameters: string) {
    const scriptArguments = JSON.parse(parameters);
    this.scriptManager.runScriptM(scriptArguments);
  }

  // ─── METHOD: error ───────────────────────────────────────────────────────────────────
  displaySelectedUserError(parameters: string) {
    this.scriptManager.displayUserError(parameters);
  }
}
