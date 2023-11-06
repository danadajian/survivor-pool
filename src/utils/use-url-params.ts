import { useSearchParams } from "react-router-dom";

export function useUrlParams() {
  const [searchParams, setUrlParams] = useSearchParams();
  const urlParams: Record<string, string | undefined> = Object.fromEntries(
    searchParams.entries(),
  );
  return {
    urlParams,
    setUrlParams,
  };
}
