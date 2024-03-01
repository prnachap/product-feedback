import { AnyZodObject } from "zod";

/**
 * Validates the given form data against a schema.
 * @param {Object} options - The options for validation.
 * @param {AnyZodObject} options.schema - The schema to validate against.
 * @param {FormData} options.formData - The form data to validate.
 * @returns {ZodParsedType<AnyZodObject>} - The validated fields.
 */
export const validateSchema = ({
  schema,
  formData,
}: {
  schema: AnyZodObject;
  formData: FormData;
}) => {
  const validatedFields = schema.safeParse({
    ...Object.fromEntries(formData.entries()),
  });
  return validatedFields;
};
