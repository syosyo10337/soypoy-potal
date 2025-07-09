import { Client, LogLevel } from "@notionhq/client";

class NotionClient extends Client {
  private static instance: NotionClient;

  private constructor() {
    if (!process.env.NOTION_API_KEY) {
      throw new Error("NOTION_API_KEY is not defined");
    }
    super({
      auth: process.env.NOTION_API_KEY,
      logLevel: LogLevel.DEBUG,
    });
  }

  public static getInstance(): NotionClient {
    if (!NotionClient.instance) {
      NotionClient.instance = new NotionClient();
    }
    return NotionClient.instance;
  }
}

// シングルトンインスタンスをエクスポート
export const notion = NotionClient.getInstance();
