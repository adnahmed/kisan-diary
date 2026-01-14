import { cx } from "~/helpers/form";
import BaseButton from "./base-button";

export default function Button({
  className,
  ...props
}: JSX.IntrinsicElements["button"]) {
  return (
    <BaseButton
      className={cx(
        "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 focus:ring-offset-white shadow-sm hover:shadow transition-all duration-200 font-medium rounded-lg px-4 py-2",
        className
      )}
      {...props}
    />
  );
}
