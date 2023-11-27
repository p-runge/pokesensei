import clsx from "clsx";
import NextLink, { type LinkProps } from "next/link";

export default function Link({
  children,
  variant = "a",
  ...props
}: LinkProps & {
  children: React.ReactNode;
  variant?: "a" | "primary";
}) {
  return (
    <NextLink
      {...props}
      className={clsx(
        variant === "a" && "text-primary hover:underline",
        variant === "primary" &&
          "bg-primary hover:bg-primary-dark disabled:bg-primary-light inline-block cursor-pointer break-words rounded px-4 py-2 text-white drop-shadow transition hover:no-underline",
      )}
    >
      {children}
    </NextLink>
  );
}
