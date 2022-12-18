import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { withEmotionCache } from "@emotion/react";
import { cookieStorageManagerSSR, localStorageManager } from "@chakra-ui/react";

import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { ServerStyleContext, ClientStyleContext } from "./context";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import remixImageStyles from "remix-image/remix-image.css";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import globalStyles from "./styles/global.css";
import { useContext, useEffect } from "react";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },

    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap",
    },
    {
      rel: "stylesheet",
      href: globalStyles,
    },
    {
      rel: "stylesheet",
      href: remixImageStyles,
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Kisan Diary",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  return request.headers.get("cookie") ?? "";
}

interface DocumentProps {
  children: React.ReactNode;
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
    }, []);

    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body className="scrollbar">
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload port={Number(process.env.REMIX_DEV_SERVER_WS_PORT)} />
        </body>
      </html>
    );
  }
);

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};
const theme = extendTheme({ colors });
export default function App() {
  const cookies = useLoaderData();

  return (
    <Document>
      <ChakraProvider
        theme={theme}
        colorModeManager={
          typeof cookies === "string"
            ? cookieStorageManagerSSR(cookies)
            : localStorageManager
        }
      >
        <Outlet />
      </ChakraProvider>
    </Document>
  );
}
