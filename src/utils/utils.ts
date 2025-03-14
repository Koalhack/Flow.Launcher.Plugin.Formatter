import type { Metas } from '../types.js';

/**
 * Return part of a string based on terms
 * @param str The string range.
 * @param start The term searched to start range.
 * @param end The term searched to end range.
 */
export function stringRange(str: string, start: string, end: string): string {
  const NOT_FOUND = -1;
  let startPos = str.indexOf(start);
  let endPos = str.indexOf(end);

  if (startPos === NOT_FOUND || endPos === NOT_FOUND)
    throw new Error('Search terms not found');

  return str.substring(str.indexOf(start) + start.length, str.indexOf(end));
}

/**
 * Return match bool based on queries and metas
 * @param queries The multiples search term.
 * @param metas The searched metas.
 */
export function matchesMetas(queries: string[], metas: Metas): boolean {
  return queries.every(query =>
    Object.values(metas).some(meta => meta.includes(query))
  );
}
