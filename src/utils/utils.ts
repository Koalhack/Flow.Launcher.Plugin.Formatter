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
 * @param object The searched datas.
 */
export function matchesObject(queries: string[], object: Object): boolean {
  return queries.every(query =>
    Object.values(object).some(item => item.includes(query))
  );
}

/**
 * Sorts an array of objects based on a specified property.
 * @template T - The type of objects in the array.
 * @template K - The key of the property to sort by.
 * @param arr - The array of objects to sort.
 * @param property - The property key to sort by.
 * @param ascending - Whether to sort in ascending order (default: true).
 */
export function sortByProperty<T, K extends keyof T>(
  arr: T[],
  property: K,
  ascending: boolean = true
): T[] {
  return arr.sort((a, b) => {
    const valueA = a[property];
    const valueB = b[property];

    if (valueA < valueB) return ascending ? -1 : 1;
    if (valueA > valueB) return ascending ? 1 : -1;
    return 0;
  });
}
