import type { Script } from '../models/Script.js';
import type { Result } from '../types.js';

/**
 * Return reformatted list of scripts for Flow Launcher
 * @param scripts list of scripts to format.
 */
export function FLSearchResultFormat(scripts: Script[]): Result[] {
  return scripts.map(script => ({
    Title: script.name ?? 'No Name',
    Subtitle: script.desc ?? 'No description',
    JsonRPCAction: {
      method: 'run',
      parameters: []
    },
    IcoPath: 'icon\\app.png',
    score: 0
  }));
}

/**
 * Send a Flow Launcher JsonRPC request
 * @param req Flow Launcher request
 */
export function sendJsonRpcRequest(req: any): void {
  console.log(JSON.stringify(req));
}
