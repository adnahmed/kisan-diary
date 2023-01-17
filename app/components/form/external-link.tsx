import { cx } from "~/helpers/form";

export default function ExternalLink({
  className,
  children,
  ...props
}: JSX.IntrinsicElements["a"]) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      className={cx("underline", className)}
    >
      {children}
    </a>
  );
}
