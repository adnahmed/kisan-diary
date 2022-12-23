import { cx } from "helpers";
import React from "react";

const DisabledInput = React.forwardRef<
  HTMLInputElement,
  JSX.IntrinsicElements["input"]
>(({ type = "text", className, ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    disabled
    className={cx(
      "block border-none w-full rounded-md outline-none text-[rgb(54,135,41)]shadow-sm sm:text-sm",
      className
    )}
    {...props}
  />
));

export default DisabledInput;
