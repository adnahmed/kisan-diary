import React from "react";
import { cx } from "~/helpers/form";

const DisabledInput = React.forwardRef<
  HTMLInputElement,
  JSX.IntrinsicElements["input"]
>(({ type = "text", className, ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    disabled
    className={cx(
      "block border-none w-full rounded-mda bg-yellow-400 outline-none text-[rgb(54,135,41)] shadow-sm sm:text-sm",
      className
    )}
    {...props}
  />
));
DisabledInput.displayName = "Disabled Input";

export default DisabledInput;
