import { atom } from 'jotai';

// ユーザー認証状態を管理するアトム
export const userAtom = atom<{
  id: string;
  email: string;
  name?: string;
} | null>(null);

// テーマ設定を管理するアトム
export const themeAtom = atom<'light' | 'dark'>('light');

// UI状態を管理するアトム
export const sidebarOpenAtom = atom<boolean>(false);
