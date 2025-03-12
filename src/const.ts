import { fileURLToPath } from 'node:url';
import path from 'node:path';

/////////////////////
//      Paths      //
/////////////////////

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __rootpath = path.resolve(__dirname, '..');

export const defaultScriptPath = path.join(__rootpath, 'src', 'scripts/');

/////////////////////
//     Metas       //
/////////////////////

export const metaStartTerm = '/**';
export const metaEndTerm = '**/';
