import { cx } from "~/helpers/form";

export default function Label({
  className,
  ...props
}: JSX.IntrinsicElements["label"]) {
  return (
    <label
      className={cx("block text-sm font-medium text-surface-700 mb-1", className)}
      {...props}
    />
  );
}
