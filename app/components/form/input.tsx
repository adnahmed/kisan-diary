import * as React from "react";
import { cx } from "~/helpers/form";

const Input = React.forwardRef<
  HTMLInputElement,
  JSX.IntrinsicElements["input"]
>(({ type = "text", className, ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cx(
      "block w-full rounded-lg border-surface-300 bg-white/50 backdrop-blur-sm text-surface-900 placeholder-surface-400 focus:border-primary-500 focus:ring-primary-500 shadow-sm sm:text-sm transition-colors duration-200 outline-none px-3 py-2",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";
export default Input;
