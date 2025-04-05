import { ICON } from '../const.js';
import type { Script } from '../models/Script.js';
import type { ScriptError } from '../models/ScriptError.js';
import type { Result } from '../types.js';

export const FlowLauncher = {
  /**
   * Return reformatted list of scripts for Flow Launcher
   * @param scripts list of scripts to format.
   */
  searchScriptResultFMT: function (scripts: Script[]): Result[] {
    return scripts.map(script => ({
      Title: script.name ?? 'No Name',
      Subtitle: script.desc ?? 'No description',
      JsonRPCAction: {
        method: 'run',
        parameters: [
          JSON.stringify({
            script: script.scriptCode,
            parameters: script.metas,
            builtIn: script.isBuiltInt
          })
        ]
      },
      IcoPath: ICON.app,
      score: 0
    }));
  },

  /**
   * Return reformatted list of scripts Errors for Flow Launcher
   * @param scriptErrors list of scripts errors to format.
   */
  searchScriptErrorResultFMT: function (scriptErrors: ScriptError[]): Result[] {
    return scriptErrors.map(scriptError => ({
      Title: `Unable to load ${scriptError.filename ?? 'No filename'}`,
      Subtitle: `Error: ${scriptError.err.message ?? 'No error'}`,
      JsonRPCAction: {
        method: '', // TODO: add script error function
        parameters: []
      },
      IcoPath: ICON.error,
      score: 0
    }));
  },

  /**
   * Shows a desktop notification.
   * @param title The notification title.
   * @param subtitle The notification text content.
   */
  showMessage: function (title: string = '', subtitle: string = '') {
    sendJsonRpcRequest({
      method: 'Flow.Launcher.ShowMsg',
      parameters: [title, subtitle, '']
    });
  }
};

/**
 * Send a Flow Launcher JsonRPC request
 * @param req Flow Launcher request
 */
export function sendJsonRpcRequest(req: any): void {
  console.log(JSON.stringify(req));
}
