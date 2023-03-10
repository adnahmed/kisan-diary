import { cx } from "~/helpers/form";

export default function BaseButton({
  className,
  ...props
}: JSX.IntrinsicElements["button"]) {
  return (
    <button
      className={cx(
        "inline-flex items-center justify-center rounded-md border border-transparent px-6 py-2 text-base font-medium shadow-sm ring-2 ring-transparent ring-offset-2 ring-offset-transparent focus:outline-none disabled:bg-gray-400",
        className
      )}
      {...props}
    />
  );
}
