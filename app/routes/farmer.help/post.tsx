import type { LinksFunction } from "@remix-run/node";
import CommentInput, {
  links as CommentInputLinks,
} from "~/components/pages/CommentInput";
import CommentList, {
  links as CommentListLinks,
} from "~/components/pages/CommentList";
import styles from "~/styles/routes/farmer.help.post.css";
export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    ...CommentInputLinks(),
    ...CommentListLinks(),
  ];
};
export default function Post() {
  return (
    <div className="post">
      <div className="post post__details"></div>
      <CommentInput />
      <CommentList for={"post"} id={""} />
    </div>
  );
}
