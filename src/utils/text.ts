/**
 * テキストを指定された長さで切り詰める
 * @param text - 切り詰めるテキスト
 * @param maxLength - 最大長
 * @returns 切り詰められたテキスト（必要に応じて末尾に...を追加）
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
}
