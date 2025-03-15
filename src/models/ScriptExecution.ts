import { FlowLauncher } from '../utils/flowLauncher.js';

type ScriptExecutionArguments = {
  text: string;
};

export class ScriptExecution {
  fullText: string;
  constructor({ text }: ScriptExecutionArguments) {
    this.fullText = text;
  }

  get text(): string {
    return this.fullText;
  }

  set text(txt: string) {
    this.fullText = txt;
  }
}
