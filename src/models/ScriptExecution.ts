import { NotificationManagerController } from '../controllers/NotificationManagerController.js';

type ScriptExecutionArguments = {
  text: string;
  notifier: NotificationManagerController;
};

interface ScriptExecutionJSExport {
  get text(): string;
  set text(txt: string);
  postError(error: string): void;
  postInfo(info: string): void;
}

// ╭────────────────────────────────────────────────────────────────────────────────╮
// │   TODO: insert function (clipboard + new value)                                │
// ╰────────────────────────────────────────────────────────────────────────────────╯

export class ScriptExecution implements ScriptExecutionJSExport {
  fullText: string;
  notifier: NotificationManagerController;

  constructor({ text, notifier }: ScriptExecutionArguments) {
    this.fullText = text;
    this.notifier = notifier;
  }

  get text(): string {
    return this.fullText;
  }

  set text(txt: string) {
    this.fullText = txt;
  }

  postError(error: string): void {
    this.notifier.add('ERROR', { source: 'SCRIPT', text: error });
  }

  postInfo(info: string): void {
    this.notifier.add('INFO', { source: 'SCRIPT', text: info });
  }
}
