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
    variant?: "a" | "primary";
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
          variant === "a" && "text-primary hover:underline",
          variant === "primary" &&
            "inline-block cursor-pointer break-words rounded bg-primary px-4 py-2 text-white drop-shadow transition hover:bg-primary-dark hover:no-underline disabled:bg-primary-light",
          props.className,
        ),
      )}
    >
      {children}
    </NextLink>
  );
}
