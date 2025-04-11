"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type CacheContextType = {
  // 画像キャッシュ
  imageCache: Record<string, string>;
  addImageToCache: (url: string) => Promise<string>;
  getImageFromCache: (url: string) => string | null;
  // マップキャッシュ
  mapCache: string | null;
  setMapCache: (html: string) => void;
  getMapCache: () => string | null;
};

const CacheContext = createContext<CacheContextType | null>(null);

export function CacheProvider({ children }: { children: ReactNode }) {
  // 画像キャッシュ
  const [imageCache, setImageCache] = useState<Record<string, string>>({});
  // マップキャッシュ
  const [mapCache, setMapCacheState] = useState<string | null>(null);

  // ローカルストレージからキャッシュを復元
  useEffect(() => {
    try {
      const savedImageCache = localStorage.getItem('soypoy-image-cache');
      if (savedImageCache) {
        setImageCache(JSON.parse(savedImageCache));
      }
      
      const savedMapCache = localStorage.getItem('soypoy-map-cache');
      if (savedMapCache) {
        setMapCacheState(savedMapCache);
      }
    } catch (error) {
      console.error('キャッシュの復元に失敗しました:', error);
    }
  }, []);

  // キャッシュの変更をローカルストレージに保存
  useEffect(() => {
    try {
      if (Object.keys(imageCache).length > 0) {
        localStorage.setItem('soypoy-image-cache', JSON.stringify(imageCache));
      }
    } catch (error) {
      console.error('画像キャッシュの保存に失敗しました:', error);
    }
  }, [imageCache]);

  useEffect(() => {
    try {
      if (mapCache) {
        localStorage.setItem('soypoy-map-cache', mapCache);
      }
    } catch (error) {
      console.error('マップキャッシュの保存に失敗しました:', error);
    }
  }, [mapCache]);

  // 画像をキャッシュに追加する関数
  const addImageToCache = async (url: string): Promise<string> => {
    // すでにキャッシュにある場合はそれを返す
    if (imageCache[url]) {
      return imageCache[url];
    }

    try {
      // 画像をフェッチしてBase64に変換
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          // キャッシュに追加
          setImageCache((prev) => {
            const newCache = { ...prev, [url]: base64data };
            return newCache;
          });
          resolve(base64data);
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('画像のキャッシュに失敗しました:', error);
      return url; // エラーの場合は元のURLを返す
    }
  };

  // キャッシュから画像を取得する関数
  const getImageFromCache = (url: string): string | null => {
    return imageCache[url] || null;
  };

  // マップキャッシュを設定する関数
  const setMapCache = (html: string) => {
    setMapCacheState(html);
  };

  // マップキャッシュを取得する関数
  const getMapCache = (): string | null => {
    return mapCache;
  };

  const value = {
    imageCache,
    addImageToCache,
    getImageFromCache,
    mapCache,
    setMapCache,
    getMapCache,
  };

  return (
    <CacheContext.Provider value={value}>
      {children}
    </CacheContext.Provider>
  );
}

export function useCache() {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error('useCacheはCacheProviderの中で使用する必要があります');
  }
  return context;
}
