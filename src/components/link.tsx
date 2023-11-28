import clsx from "clsx";
import { type LinkProps } from "next/link";
import type { LOCALES } from "~/i18n";
import { Link as NextLink } from "~/navigation";

export default function Link({
  children,
  variant = "a",
  ...props
}: Omit<LinkProps, "locale"> & {
  children: React.ReactNode;
  variant?: "a" | "primary";
  locale?: (typeof LOCALES)[number];
}) {
  return (
    <NextLink
      {...props}
      className={clsx(
        variant === "a" && "text-primary hover:underline",
        variant === "primary" &&
          "text-shadow inline-block cursor-pointer break-words rounded bg-primary px-4 py-2 text-white drop-shadow transition hover:bg-primary-dark hover:no-underline disabled:bg-primary-light",
      )}
    >
      {children}
    </NextLink>
  );
}
