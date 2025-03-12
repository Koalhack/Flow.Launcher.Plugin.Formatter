import fs from 'node:fs';
import path from 'node:path';
import type { Metas } from './types.js';
import { defaultScriptPath, metaEndTerm, metaStartTerm } from './const.js';
import { stringRange } from './utils/utils.js';
import { Script } from './models/Script.js';

export class ScriptManager {
  scripts: Script[];

  constructor() {
    this.scripts = [];
  }

  init() {
    this.loadDefaultScripts();
  }

  loadDefaultScripts() {
    let scriptsFilenames = fs
      .readdirSync(defaultScriptPath)
      .filter(file => file.includes('.js'));

    scriptsFilenames.forEach(filename => {
      this.loadScript(path.join(defaultScriptPath, filename));
    });
  }

  loadScript(path: string) {
    try {
      let script: string = fs.readFileSync(path).toString();

      let meta = stringRange(script, metaStartTerm, metaEndTerm);
      let jsonMeta = JSON.parse(meta) as Metas;

      let scriptObject = new Script({
        script: script,
        parameters: jsonMeta,
        builtIn: true
      });

      this.scripts.push(scriptObject);
    } catch (e) {
      console.error(`Unable to load ${path}, Error: ${e}`);
    }
  }
}
