import fs from 'node:fs';
import path from 'node:path';
import type { Metas } from './types.js';
import { Script } from './models/Script.js';
import { defaultScriptPath, metaEndTerm, metaStartTerm } from './const.js';
import { matchesMetas, stringRange } from './utils/utils.js';

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

  search(query: string): Script[] {
    const QUERY_CHAR_LIMIT = 20;
    const ALL_SCRIPTS_CHAR = '*';
    const QUERIES_SEPARATOR = ' ';

    const metaNameSort = (a: Script, b: Script): 1 | -1 =>
      (a.name || '') < (b.name || '') ? 1 : -1;

    if (query.length > QUERY_CHAR_LIMIT) return [];

    if (query === ALL_SCRIPTS_CHAR) return this.scripts.sort(metaNameSort);

    const normalizeQuery = query.toLowerCase();
    const queries = new Set(normalizeQuery.split(QUERIES_SEPARATOR));

    const results = this.scripts.filter(script =>
      matchesMetas(Array.from(queries), {
        name: script.name,
        tags: script.tags
      })
    );

    return results.sort(metaNameSort);
  }
}
