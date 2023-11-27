import clsx from "clsx";

export default function Button({
  variant = "primary",
  ...props
}: React.ComponentProps<"button"> & {
  variant?: "primary";
}) {
  return (
    <button
      {...props}
      type="button"
      className={clsx(
        "inline-block cursor-pointer break-words rounded px-4 py-2 drop-shadow transition hover:no-underline",
        variant === "primary" &&
          "bg-primary hover:bg-primary-dark disabled:bg-primary-light text-white",
      )}
    ></button>
  );
}
