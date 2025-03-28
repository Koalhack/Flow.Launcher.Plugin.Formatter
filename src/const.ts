import { fileURLToPath } from 'node:url';
import path from 'node:path';
import clipboard from 'clipboardy';

// ┌           ┐
// │   Paths   │
// └           ┘

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __rootpath = path.resolve(__dirname, '..');

export const defaultScriptPath = path.join(__rootpath, 'dist', 'scripts/');

// ┌           ┐
// │   Metas   │
// └           ┘

export const metaStartTerm = '/**';
export const metaEndTerm = '**/';

// ┌            ┐
// │   Script   │
// └            ┘

export const SCRIPT_EXTENSION = /\.js$/g;
export const MAIN_FUNCTION_EXEC = 'main(this)';

// ┌                   ┐
// │   Notifications   │
// └                   ┘

export const NOTIFY = {
  clipboard: {
    title: 'Clipboard value change',
    subtitle: 'You have a new value in your clipboard'
  }
};
