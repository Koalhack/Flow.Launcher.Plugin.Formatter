type ScriptErrorArguments = {
  file: string;
  error: Error;
};

export class ScriptError {
  filename: string;
  err: Error;
  constructor({ file, error }: ScriptErrorArguments) {
    this.filename = file;
    this.err = error;
  }
}
