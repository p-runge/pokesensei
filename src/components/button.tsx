import clsx from "clsx";
import { cn } from "~/server/utils/cn";

export default function Button({
  variant = "primary",
  noTextShadow = false,
  ...props
}: React.ComponentProps<"button"> & {
  variant?: "primary" | "secondary";
  noTextShadow?: boolean;
}) {
  return (
    <button
      {...props}
      type="button"
      className={clsx(
        // this needs to be extra wrapped in clsx because text-shadow is no tailwind class
        // TODO: migrate this to tailwind
        noTextShadow ? "" : "text-shadow",
        cn(
          "cursor-pointer break-words rounded px-4 py-2 transition hover:no-underline",
          variant === "primary" &&
            "bg-primary text-white hover:bg-primary-dark disabled:bg-primary-light",
          variant === "secondary" &&
            "bg-secondary text-white hover:bg-secondary-dark disabled:bg-secondary-light",
          props.disabled && "cursor-not-allowed",
          props.className,
        ),
      )}
    ></button>
  );
}
