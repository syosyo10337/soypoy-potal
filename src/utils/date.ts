import { DateTime } from "luxon";

const DATE_FORMATS = {
  FULL_DATE_JP: "yyyy年MM月dd日(EEE) HH:mm",
  DATE_JP: "yyyy年MM月dd日",
  TIME: "HH:mm",
} as const;

type DateFormatKey = keyof typeof DATE_FORMATS;

const APP_TIMEZONE = "Asia/Tokyo";
const DATE_PLACEHOLDER_TEXT = "日時不明";
const TIME_PLACEHOLDER_TEXT = "時刻未定";
const LOCALE = "ja";

/**
 * タイムゾーンを固定したDateTimeオブジェクトを作成する
 * trueを返すことで、isValidを強制する
 */
function dateTimeFromISO(dateString: string): DateTime<true> {
  return DateTime.fromISO(dateString)
    .setZone(APP_TIMEZONE)
    .setLocale(LOCALE) as DateTime<true>;
}

/**
 * ISO形式の日時文字列から指定されたフォーマットで文字列を返す
 *
 * @param dateString - ISO8601形式の日時文字列
 * @param format - FORMATSのキーまたはカスタムフォーマット文字列
 * @returns フォーマットされた日時文字列
 */
function format(dateString: string, format: DateFormatKey | string): string {
  try {
    const dt = dateTimeFromISO(dateString);

    if (!dt.isValid) {
      console.warn(`Invalid date string: ${dateString}`);
      return DATE_PLACEHOLDER_TEXT;
    }

    const formatString =
      format in DATE_FORMATS ? DATE_FORMATS[format as DateFormatKey] : format;

    return dt.toFormat(formatString);
  } catch (error) {
    console.error("Date formatting error:", error);
    return DATE_PLACEHOLDER_TEXT;
  }
}

/**
 * 日本語形式の日付、曜日、時間を返す (shorthand)
 */
function formatFullDateJP(dateString: string): string {
  return format(dateString, DATE_FORMATS.FULL_DATE_JP);
}

/**
 * 日本語形式の日付文字列を返す (shorthand)
 */
function formatDateJP(dateString: string): string {
  return format(dateString, DATE_FORMATS.DATE_JP);
}

/**
 * 時刻文字列を返す (shorthand)
 */
function formatTime(dateString: string): string {
  if (!hasTimeInfo(dateString)) {
    console.warn(`No time information in date string: ${dateString}`);
    return TIME_PLACEHOLDER_TEXT;
  }
  return format(dateString, DATE_FORMATS.TIME);
}

/**
 * 指定された日時が過去かどうかを判定
 *
 * @param dateString - ISO8601形式の日時文字列
 * @returns 過去の場合true
 */
function isPast(dateString: string): boolean {
  try {
    const dt = dateTimeFromISO(dateString);
    if (!dt.isValid) {
      console.warn(`Invalid date string for isPast: ${dateString}`);
      return false;
    }
    return dt < nowInUTC();
  } catch (error) {
    console.error("Date comparison error:", error);
    return false;
  }
}

/**
 * 指定された日時が未来かどうかを判定
 *
 * @param dateString - ISO8601形式の日時文字列
 * @returns 未来の場合true
 */
function isFuture(dateString: string): boolean {
  try {
    const dt = dateTimeFromISO(dateString);
    if (!dt.isValid) {
      console.warn(`Invalid date string for isFuture: ${dateString}`);
      return false;
    }
    return dt > nowInUTC();
  } catch (error) {
    console.error("Date comparison error:", error);
    return false;
  }
}

/**
 * 2つの日付を比較
 *
 * @param dateString1 - 比較する日付1
 * @param dateString2 - 比較する日付2
 * @returns dateString1 < dateString2: -1, dateString1 > dateString2: 1, equal: 0
 */
function compare(dateString1: string, dateString2: string): -1 | 0 | 1 {
  try {
    const dt1 = dateTimeFromISO(dateString1);
    const dt2 = dateTimeFromISO(dateString2);

    if (!dt1.isValid || !dt2.isValid) {
      console.warn("Invalid date strings for comparison");
      return 0;
    }

    if (dt1 < dt2) return -1;
    if (dt1 > dt2) return 1;
    return 0;
  } catch (error) {
    console.error("Date comparison error:", error);
    return 0;
  }
}

/**
 * 現在時刻をUTCタイムゾーンのDateTimeオブジェクトで取得する
 * フォームのデフォルト値設定などに使用
 *
 * NOTE: フォームなどの初期値にする際にはtoISOをつけて変換すること。
 */
function nowInUTC(): DateTime<true> {
  return DateTime.now().toUTC();
}

/**
 * ISO形式の文字列に時刻情報が含まれているかチェック
 */
function hasTimeInfo(dateString: string): boolean {
  return dateString.includes("T");
}

export {
  format,
  formatFullDateJP,
  formatDateJP,
  formatTime,
  isPast,
  isFuture,
  compare,
  nowInUTC,
  dateTimeFromISO,
  type DateFormatKey,
};
