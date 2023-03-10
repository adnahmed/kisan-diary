// TODO: Add routes-gen please!!
import {
  ChakraProvider,
  ColorModeScript,
  cookieStorageManagerSSR,
  localStorageManager,
} from "@chakra-ui/react";
import { withEmotionCache } from "@emotion/react";
import roboto300 from "@fontsource/roboto/300.css";
import roboto400 from "@fontsource/roboto/400.css";
import roboto500 from "@fontsource/roboto/500.css";
import roboto700 from "@fontsource/roboto/700.css";
import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react";
import quillBubbleTheme from "quill/dist/quill.bubble.css";
import quillSnowTheme from "quill/dist/quill.snow.css";
import { useContext, useEffect } from "react";
import { route } from "routes-gen";
import { SocketProvider } from "./components/SocketProvider";
import Layout from "./components/pages/Layout";
import { ClientStyleContext, ServerStyleContext } from "./context";
import fetchFarm from "./models/farm.server";
import client_socket from "./services/chat.client";
import { getUser } from "./session.server";
import globalStyles from "./styles/global.css";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import theme from "./styles/theme";
import { DevSupport } from "@react-buddy/ide-toolbox";
import ComponentPreviews from "../dev/previews";
import { useInitial } from "../dev";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: quillSnowTheme },
    { rel: "stylesheet", href: quillBubbleTheme },
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
      href: roboto300,
    },
    {
      rel: "stylesheet",
      href: roboto400,
    },
    {
      rel: "stylesheet",
      href: roboto500,
    },
    {
      rel: "stylesheet",
      href: roboto700,
    },
    { rel: "preload", href: "/assets/dashboard.jpeg", as: "image" },
    { rel: "preload", href: "/assets/expert.jpeg", as: "image" },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Kisan Diary",
  viewport: "width=device-width,initial-scale=1",
  httpEquiv: "Content-Security-Policy",
  content: "default-src 'self'",
});

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
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />

          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload port={Number(process.env.REMIX_DEV_SERVER_WS_PORT)} />
        </body>
      </html>
    );
  }
);

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);
  if (user && new URL(request.url).pathname === route("/"))
    return redirect(route(`/${user.role}`));
  return json({
    user: await getUser(request),
    cookies: request.headers.get("cookie"),
    farm: user?.role === "farmer" && (await fetchFarm(user)),
  });
}

export default function App() {
  const { cookies, user } = useLoaderData<typeof loader>();

  useEffect(() => {
    return () => {
      client_socket.close();
    };
  }, []);

  useEffect(() => {
    if (!client_socket) return;
    client_socket.on("confirmation", (data) => {
      console.log(data);
    });
  }, []);
  return (
    <Document>
      <SocketProvider socket={client_socket}>
        <ChakraProvider
          theme={theme}
          colorModeManager={
            typeof cookies === "string"
              ? cookieStorageManagerSSR(cookies)
              : localStorageManager
          }
        >
          <DevSupport
            ComponentPreviews={<ComponentPreviews />}
            useInitialHook={useInitial}
          >
            <Layout user={user}>
              <Outlet />
            </Layout>
          </DevSupport>
        </ChakraProvider>
      </SocketProvider>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}
