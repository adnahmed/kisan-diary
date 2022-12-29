import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode, useState } from "react";
import { cacheAssets } from "remix-utils";
import { hydrateRoot } from "react-dom/client";
import { ClientStyleContext } from "./context";
import { CacheProvider } from "@emotion/react";
import createEmotionCache, { defaultCache } from "./createEmotionCache";

cacheAssets().catch((error) => {
  // do something with the error. or not
});
interface ClientCacheProviderProps {
  children: React.ReactNode;
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(defaultCache);

  function reset() {
    setCache(createEmotionCache());
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}
const hydrate = () => {
  startTransition(() => {
    hydrateRoot(
      document,
      <ClientCacheProvider>
        <RemixBrowser />
      </ClientCacheProvider>
    );
  });
};

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
