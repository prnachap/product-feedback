import { isUndefined } from "lodash";

function ErrorList({
  id,
  errors,
}: {
  id?: string;
  errors?: Array<string> | string | undefined;
}) {
  if (isUndefined(errors)) return null;

  if (typeof errors === "string") {
    return (
      <ul id={id} aria-live="polite" className="flex flex-col gap-1">
        <li className="error-text">{errors}</li>
      </ul>
    );
  }

  return errors?.length ? (
    <ul id={id} aria-live="polite" className="flex flex-col gap-1">
      {errors.map((error, i) => (
        <li key={i} className="error-text">
          {error}
        </li>
      ))}
    </ul>
  ) : null;
}

export default ErrorList;
