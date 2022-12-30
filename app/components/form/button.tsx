import { cx } from "~/helpers/form";
import BaseButton from "./base-button";

export default function Button({
  className,
  ...props
}: JSX.IntrinsicElements["button"]) {
  return (
    <BaseButton
      className={cx(
        "bg-pink-600 text-white hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-white",
        className
      )}
      {...props}
    />
  );
}
