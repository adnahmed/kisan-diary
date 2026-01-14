import * as React from "react";
import { cx } from "~/helpers/form";

const Checkbox = React.forwardRef<
  HTMLInputElement,
  JSX.IntrinsicElements["input"]
>(({ type = "checkbox", className, ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cx(
      "h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 transition-colors duration-200 cursor-pointer",
      className,
      !className && "border-gray-300 text-primary-600 focus:ring-primary-500"
    )}
    {...props}
  />
));
Checkbox.displayName = "Checkbox";

export default Checkbox;
