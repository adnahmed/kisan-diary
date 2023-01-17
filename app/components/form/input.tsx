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
      "block w-full rounded-md outline-none text-gray-800 border-[rgb(54,135,41)] border-2 focus:border-[rgb(135,171,111)] shadow-sm sm:text-sm",
      className,
      !className && "border-gray-300 focus:border-pink-500 focus:ring-pink-500"
    )}
    {...props}
  />
));
Input.displayName = "Input";
export default Input;
