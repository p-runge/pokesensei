import { formatData } from "~/server/utils/common";

export default function Code({
  children,
}: {
  children: object | null | undefined;
}) {
  return (
    <pre className="bg-gray overflow-auto p-4">{formatData(children)}</pre>
  );
}
