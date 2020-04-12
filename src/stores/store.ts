import { Store } from "laco";
import { useState, useEffect } from "react";

export function useStore(store: {
  get: () => any;
  subscribe: (arg0: () => void) => void;
  unsubscribe: (arg0: () => void) => void | undefined;
}) {
  const [state, setState] = useState(store.get());
  function updateState() {
    setState(store.get());
  }
  useEffect(() => {
    store.subscribe(updateState);
    return () => store.unsubscribe(updateState);
  });

  return state;
}

/**
 * 用户信息
 */
export const userData = new Store(
  {
    userName: "letter",
  },
  "userData"
);
