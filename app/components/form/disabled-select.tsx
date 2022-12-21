import { cx } from "helpers";
import * as React from "react";

const DisabledSelect = React.forwardRef<
  HTMLSelectElement,
  JSX.IntrinsicElements["select"]
>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    disabled
    className={cx(
      "block w-full border-none appearance-none rounded-md py-2 pl-3  pr-10 text-base text-[rgb(54,135,41)] focus:outline-none sm:text-sm",
      className
    )}
    {...props}
  />
));

export default DisabledSelect;
