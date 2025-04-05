import fs from 'node:fs';
import path from 'node:path';
import type { Metas } from './types.js';
import { Script, type ScriptArguments } from './models/Script.js';
import { ScriptExecution } from './models/ScriptExecution.js';
import {
  defaultScriptPath,
  metaEndTerm,
  metaStartTerm,
  NOTIFY,
  SCRIPT_EXTENSION
} from './const.js';
import { matchesObject, sortByProperty, stringRange } from './utils/utils.js';
import { Clipboard } from './utils/clipboard.js';
import { FlowLauncher } from './utils/flowLauncher.js';

export class ScriptManager {
  scripts: Script[];

  constructor() {
    this.scripts = [];
  }

  init() {
    this.loadDefaultScripts();
    //TODO: Manage users scripts
  }

  loadDefaultScripts() {
    let scriptsFilenames = fs
      .readdirSync(defaultScriptPath)
      .filter(file => file.match(SCRIPT_EXTENSION));

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

  search(query: string): Script[] {
    const QUERY_CHAR_LIMIT = 20;
    const ALL_SCRIPTS_CHAR = '*';
    const QUERIES_SEPARATOR = ' ';
    const SORT_PROPERTY = 'name';

    if (query.length > QUERY_CHAR_LIMIT) return [];

    if (query === ALL_SCRIPTS_CHAR)
      return sortByProperty(this.scripts, SORT_PROPERTY);

    const queries = query.split(QUERIES_SEPARATOR);

    const results = this.scripts.filter(script =>
      matchesObject(queries, {
        name: script.name,
        tags: script.tags
      })
    );

    return sortByProperty(results, SORT_PROPERTY);
  }

  runScriptM(scriptArguments: ScriptArguments) {
    // Get clipboard content
    const clip = Clipboard.get();

    const script = new Script(scriptArguments);

    const result = this.runScript(script, clip);

    this.replaceText(result, clip);
  }

  runScript(script: Script, text: string) {
    let scriptExecution = new ScriptExecution({ text: text });

    script.run(scriptExecution);

    return scriptExecution.text ?? '';
  }

  replaceText(newText: string, originText: string) {
    if (newText !== originText) {
      // Update clipboard with new value
      Clipboard.copy(newText);

      //TODO: Possibly change location in futur
      // Notify User from change
      const { title, subtitle } = NOTIFY.clipboard;
      FlowLauncher.showMessage(title, subtitle);
    }
  }
}
