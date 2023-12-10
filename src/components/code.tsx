import { formatData } from "~/server/utils/common";

export default function Code({
  children,
}: {
  children: object | null | undefined;
}) {
  return (
    <pre className="bg-gray flex w-full overflow-x-auto whitespace-pre-wrap p-4">
      {formatData(children)}
    </pre>
  );
}
