import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { Outlet, useLocation } from "@remix-run/react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { route } from "routes-gen";
import PostCard, { links as PostCardLinks } from "~/components/pages/PostCard";
import PostInput, {
  links as PostInputLinks,
} from "~/components/pages/PostInput";
import { prisma } from "~/db.server";
import { getUser } from "~/session.server";
import styles from "~/styles/routes/farmer.help.css";
export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    ...PostCardLinks(),
    ...PostInputLinks(),
  ];
};

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);
  if (!user) throw new Error("User Not Found");
  return typedjson({
    posts: await prisma.post.findMany({
      where: {
        postedBy: {
          id: user.id,
        },
      },
      include: {
        tags: true,
      },
    }),
  });
}

export default function Help() {
  const { posts } = useTypedLoaderData<typeof loader>();
  const location = useLocation();
  // TODO: is this a remix bug?
  return location.pathname === route("/farmer/help") ? (
    <div className="help_dashboard">
      <PostInput />
      {posts &&
        posts.map((post) => (
          <PostCard key={post.id} post={post} tags={post.tags} />
        ))}
    </div>
  ) : (
    <Outlet />
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
