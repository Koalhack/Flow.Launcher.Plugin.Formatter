import { fileURLToPath } from 'node:url';
import path from 'node:path';

// ┌           ┐
// │   Paths   │
// └           ┘

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __rootpath = path.resolve(__dirname, '..');

// ─── Scripts ─────────────────────────────────────────────────────────────────────────

export const defaultScriptPath = path.join(__rootpath, 'dist', 'scripts/');
export const userScriptPath = path.join(__rootpath, 'Scripts/');

// ─── Icon ────────────────────────────────────────────────────────────────────────────

export const ICON = {
  app: path.join(__rootpath, 'icon', 'app.png'),
  error: path.join(__rootpath, 'icon', 'error.png')
};

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
  title: 'Text Formatter',
  clipboard: {
    source: 'CLIP',
    text: 'Clipboard value change'
  }
};
