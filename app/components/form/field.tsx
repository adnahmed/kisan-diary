import { cx } from "~/helpers/form";

export default function Field({
  className,
  ...props
}: JSX.IntrinsicElements["div"]) {
  return (
    <div className={cx("flex flex-col space-y-2", className)} {...props} />
  );
}
