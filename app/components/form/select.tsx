import * as React from "react";
import { cx } from "~/helpers/form";

const Select = React.forwardRef<
  HTMLSelectElement,
  JSX.IntrinsicElements["select"]
>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cx(
      "block w-full rounded-lg border-surface-300 bg-white/50 backdrop-blur-sm text-surface-900 focus:border-primary-500 focus:ring-primary-500 shadow-sm sm:text-sm transition-colors duration-200 outline-none py-2 pl-3 pr-10",
      className
    )}
    {...props}
  />
));
Select.displayName = "Select";
export default Select;
