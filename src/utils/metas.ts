function stringRange(str: string, start: string, end: string): string {
  return str.substring(str.indexOf(start) + start.length, str.indexOf(end));
}
