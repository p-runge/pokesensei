import { forwardRef } from "react";
import clsx from "clsx";

import { cn } from "~/server/utils/cn";

export default forwardRef(function Button(
  {
    variant = "primary",
    noTextShadow = false,
    ...props
  }: React.ComponentProps<"button"> & {
    variant?: "primary" | "secondary";
    noTextShadow?: boolean;
  },
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      ref={ref}
      {...props}
      type="button"
      className={clsx(
        // this needs to be extra wrapped in clsx because text-shadow is no tailwind class
        // TODO: migrate this to tailwind
        noTextShadow ? "" : "text-shadow",
        cn(
          "cursor-pointer break-words rounded px-4 py-2 transition hover:no-underline",
          variant === "primary" &&
            "bg-primary-500 text-white hover:bg-primary-600 disabled:bg-primary-300",
          variant === "secondary" &&
            "bg-secondary-500 text-white hover:bg-secondary-600 disabled:bg-secondary-300",
          props.disabled && "cursor-not-allowed",
          props.className,
        ),
      )}
    ></button>
  );
});
