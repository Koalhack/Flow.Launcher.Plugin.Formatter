import clipboard from 'clipboardy';

export const Clipboard = {
  /**
   * Return clipboard from clipboardy dependency
   */
  get: function (): string {
    return clipboard.readSync();
  },
  /**
   * Update clipboard with new content using clipboardy
   * @param text Text to add in clipboard
   */
  copy: function (text: string | undefined) {
    if (text !== undefined) {
      clipboard.writeSync(text);
    }
  }
};
