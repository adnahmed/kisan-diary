import * as React from "react";
import { cx } from "~/helpers/form";

const Radio = React.forwardRef<
  HTMLInputElement,
  JSX.IntrinsicElements["input"]
>(({ type = "radio", className, ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cx(
      "h-4 w-4 rounded-full border-gray-300 text-primary-600 focus:ring-primary-500 transition-all duration-200 cursor-pointer",
      className,
      !className && "border-gray-300 text-primary-600 focus:ring-primary-500"
    )}
    {...props}
  />
));

export default Radio;
