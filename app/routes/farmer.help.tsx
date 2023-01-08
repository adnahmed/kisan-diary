import { Heading } from "@chakra-ui/react";
import type { ActionArgs, LinksFunction, LoaderArgs } from "@remix-run/node";
import { Outlet, useFetcher, useLocation } from "@remix-run/react";
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

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  return typedjson({
    post: formData.get("post"),
    title: formData.get("title"),
  });
}
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
  const post_fetcher = useFetcher<typeof action>();

  // TODO: is this a remix bug?
  return location.pathname === route("/farmer/help") ? (
    <div className="help help__dashboard">
      <Heading className="help__dashboard dashboard__heading">
        Post For Emerging Issue
      </Heading>
      <div className="help__dashboard dashboard__input">
        <PostInput post_fetcher={post_fetcher} />
      </div>
      <div className="help__dashboard dashboard__posts">
        {posts &&
          posts.map((post) => (
            <PostCard key={post.id} post={post} tags={post.tags} />
          ))}
      </div>
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
