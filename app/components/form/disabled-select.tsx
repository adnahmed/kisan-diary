import * as React from "react";
import { cx } from "~/helpers/form";

const DisabledSelect = React.forwardRef<
  HTMLSelectElement,
  JSX.IntrinsicElements["select"]
>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    disabled
    className={cx(
      "appearance-none rounded-md py-2 pl-3 bg-none border-none  pr-10 text-base focus:outline-none sm:text-sm",
      className
    )}
    {...props}
  />
));
DisabledSelect.displayName = "Disabled Select";
export default DisabledSelect;
