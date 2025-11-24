"use client";

import type { ReactNode } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

interface ClientErrorBoundaryProps {
  children: ReactNode;
  fallback?: React.ComponentType<FallbackProps>;
  onReset?: () => void;
}

/**
 * ページ単位のエラーハンドリングはNextの機構を利用する。(error.tsx)
 * コンポーネントレベルでエラーをハンドリングする場合にはこちらを使う。
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/error#how-errorjs-works
 */
export function ClientErrorBoundary({
  children,
  fallback,
  onReset,
}: ClientErrorBoundaryProps) {
  const FallbackComponent = fallback ?? _DefaultFallback;

  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      {...(onReset && { onReset })}
    >
      {children}
    </ErrorBoundary>
  );
}

function _DefaultFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            エラーが発生しました
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{error.message}</p>
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={resetErrorBoundary}
              className="rounded bg-red-100 px-2 py-1 text-sm font-medium text-red-800 hover:bg-red-200"
            >
              再試行
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
