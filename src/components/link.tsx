import clsx from "clsx";
import { type LinkProps } from "next/link";
import type { Locale } from "~/i18n";
import { Link as NextLink } from "~/navigation";
import { cn } from "~/server/utils/cn";

export default function Link({
  children,
  variant = "a",
  ...props
}: Omit<React.ComponentProps<"a">, "ref"> &
  Omit<LinkProps, "locale"> & {
    children: React.ReactNode;
    variant?: "a" | "primary" | "blank";
    locale?: Locale;
  }) {
  return (
    <NextLink
      {...props}
      className={clsx(
        // this needs to be extra wrapped in clsx because text-shadow is no tailwind class
        // TODO: migrate this to tailwind
        variant === "primary" && "text-shadow",
        cn(
          "text-lg",
          variant === "a" && "text-primary-500 hover:underline",
          variant === "primary" &&
            "disabled:bg-primary-300 hover:bg-primary-600 bg-primary-500 inline-block cursor-pointer break-words rounded px-4 py-2 text-white drop-shadow transition hover:no-underline",
          props.className,
        ),
      )}
    >
      {children}
    </NextLink>
  );
}
