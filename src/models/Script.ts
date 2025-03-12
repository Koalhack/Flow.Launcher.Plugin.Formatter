import type { Metas } from '../types.js';

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

  constructor({ script, parameters, builtIn }: ScriptArguments) {
    const TAGS_SEPARATOR = ',';

    this.scriptCode = script;
    this.isBuiltInt = builtIn;

    this.name = parameters['name'] as string;
    this.desc = parameters['description'] as string;
    this.tags = (parameters['tags'] as string).split(TAGS_SEPARATOR);
    this.bias = parameters['bias'] as number;
  }
}
