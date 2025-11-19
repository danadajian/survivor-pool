import { useSearchParams } from "react-router-dom";

export function useUrlParams() {
  const [searchParams, setUrlParams] = useSearchParams();
  const urlParams: Record<string, string | undefined> = Object.fromEntries(
    searchParams.entries(),
  );

  const setUrlParamsMerged = (nextInit: Record<string, string | undefined>) => {
    setUrlParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        Object.entries(nextInit).forEach(([key, value]) => {
          if (value === undefined) {
            next.delete(key);
          } else {
            next.set(key, value);
          }
        });
        return next;
      },
      { replace: true },
    );
  };

  return {
    urlParams,
    setUrlParams: setUrlParamsMerged,
  };
}
