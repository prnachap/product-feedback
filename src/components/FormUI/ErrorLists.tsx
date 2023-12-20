function ErrorList({
  id,
  errors,
}: {
  id?: string;
  errors?: Array<string> | null;
}) {
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
