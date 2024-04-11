import type { ZodObject, ZodRawShape } from "zod";

export function withDefaultedProps<T extends ZodRawShape>(
  schema: ZodObject<T>,
) {
  const shape = schema.shape;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const defaultObject: any = {};

  for (const key in shape) {
    const fieldSchema = shape[key]!;
    if ("_def" in fieldSchema && "defaultValue" in fieldSchema._def) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      defaultObject[key] = fieldSchema._def.defaultValue();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return schema.default(defaultObject);
}
