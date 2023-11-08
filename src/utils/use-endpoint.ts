import { useLocation } from "react-router-dom";

export function useEndpoint() {
  const { pathname } = useLocation();
  return pathname.split("/")[1];
}
