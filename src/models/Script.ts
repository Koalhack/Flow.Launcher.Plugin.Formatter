import vm from 'node:vm';
import type { Metas } from '../types.js';
import { MAIN_FUNCTION_EXEC } from '../const.js';
import type { ScriptExecution } from './ScriptExecution.js';

type ScriptArguments = {
  script: string;
  parameters: Metas;
  builtIn: boolean;
};

export class Script {
  isBuiltInt: boolean;
  scriptCode: string;

  name: string | undefined;
  desc: string | undefined;
  tags: string[] | undefined;
  bias: number | undefined;

  vmScript: vm.Script;

  constructor({ script, parameters, builtIn }: ScriptArguments) {
    const TAGS_SEPARATOR = ',';

    this.scriptCode = script;
    this.isBuiltInt = builtIn;

    // Define metas
    this.name = parameters['name'] as string;
    this.desc = parameters['description'] as string;
    this.tags = (parameters['tags'] as string).split(TAGS_SEPARATOR);
    this.bias = parameters['bias'] as number;

    // Init script
    this.vmScript = new vm.Script(`${this.scriptCode}; ${MAIN_FUNCTION_EXEC}`);
  }

  run(context: ScriptExecution) {
    vm.createContext(context);
    try {
      this.vmScript.runInContext(context);
    } catch (e) {
      console.error(`Error in VM Script execution: ${e}`);
    }
  }
}
