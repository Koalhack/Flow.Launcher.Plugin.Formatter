import fs from 'node:fs';
import path from 'node:path';
import type { Metas } from './types.js';
import { Script, type ScriptArguments } from './models/Script.js';
import { ScriptExecution } from './models/ScriptExecution.js';
import { ScriptError } from './models/ScriptError.js';
import {
  defaultScriptPath,
  metaEndTerm,
  metaStartTerm,
  NOTIFY,
  SCRIPT_EXTENSION,
  userScriptPath
} from './const.js';
import { matchesObject, sortByProperty, stringRange } from './utils/utils.js';
import { Clipboard } from './utils/clipboard.js';
import { FlowLauncher } from './utils/flowLauncher.js';
import { ensureError } from './utils/error.js';
import { NotificationManagerController } from './controllers/NotificationManagerController.js';

export class ScriptManager {
  scripts: Script[];
  scriptsError: ScriptError[];

  //WARN: possibly change in futur
  notifier: NotificationManagerController;

  constructor() {
    this.scripts = [];
    this.scriptsError = [];

    this.notifier = new NotificationManagerController();
  }

  init() {
    this.loadDefaultScripts();
    this.loadUserScripts();
  }

  loadDefaultScripts() {
    let scriptsFilenames = fs
      .readdirSync(defaultScriptPath)
      .filter(file => file.match(SCRIPT_EXTENSION));

    scriptsFilenames.forEach(filename => {
      this.loadScript(path.join(defaultScriptPath, filename), true);
    });
  }

  loadUserScripts() {
    let scriptsFilenames = fs
      .readdirSync(userScriptPath)
      .filter(file => file.match(SCRIPT_EXTENSION));

    scriptsFilenames.forEach(filename => {
      this.loadScript(path.join(userScriptPath, filename), false);
    });
  }

  loadScript(path: string, builtIn: boolean) {
    try {
      let script: string = fs.readFileSync(path).toString();

      let meta = stringRange(script, metaStartTerm, metaEndTerm);
      let jsonMeta = JSON.parse(meta) as Metas;

      let scriptObject = new Script({
        script: script,
        parameters: jsonMeta,
        builtIn: builtIn
      });

      this.scripts.push(scriptObject);
    } catch (err) {
      const error = ensureError(err);
      const scriptErrorObject = new ScriptError({
        file: path,
        error: error
      });
      this.scriptsError.push(scriptErrorObject);
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

  displayUserError(errorObjectString: string) {
    // TODO: Better origanisation for all patterns (regex, escpape char)
    const ESCAPE_LINE_FEED = /\\n/g;
    const LINE_FEED = '\n';
    const AT_PATTERN = /\s*\sat\s.[^"]*/g;
    const NOTHING = ' ';

    let prettyErrorString = errorObjectString.replace(
      ESCAPE_LINE_FEED,
      LINE_FEED
    );
    prettyErrorString = prettyErrorString.replace(AT_PATTERN, NOTHING);
    this.replaceText(prettyErrorString);
  }

  runScriptM(scriptArguments: ScriptArguments) {
    // Get clipboard content
    const clip = Clipboard.get();

    const script = new Script(scriptArguments);

    const result = this.runScript(script, clip);

    this.replaceText(result, clip);

    //TODO: Possibly change location in futur
    this.notifier.displayAll();
  }

  runScript(script: Script, text: string): string {
    let scriptExecution = new ScriptExecution({
      text: text,
      notifier: this.notifier
    });

    script.run(scriptExecution);

    return scriptExecution.text ?? '';
  }

  replaceText(newText: string, originText: string = '') {
    if (newText !== originText) {
      // Update clipboard with new value
      Clipboard.copy(newText);

      //TODO: Possibly change location in futur
      // Notify User from change
      this.notifier.add('MESSAGE', NOTIFY.clipboard);
    }
  }
}
