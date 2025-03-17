type ScriptExecutionArguments = {
  text: string;
};

// ╭────────────────────────────────────────────────────────────────────────────────╮
// │   TODO: postInfo and postError functions (notify user)                         │
// │   TODO: insert function (clipboard + new value)                                │
// ╰────────────────────────────────────────────────────────────────────────────────╯

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
