export const notionDB = {
  events: process.env.NOTION_EVENTS_DB_ID,
  members: process.env.NOTION_MEMBERS_DB_ID,
} as const;
