import { cx } from "~/helpers/form";

export default function Label({
  className,
  ...props
}: JSX.IntrinsicElements["label"]) {
  return (
    <label
      className={cx("block font-medium", className, !className && "text-rb")}
      {...props}
    />
  );
}
