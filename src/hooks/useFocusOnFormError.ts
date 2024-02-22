import { isEmpty } from "lodash";
import { RefObject, useEffect } from "react";

/**
 * Custom hook that focuses on the first form element with an error.
 * @param {Object} options - The options for the hook.
 * @param {Partial<Record<string, string[]>>} options.errors - The errors object containing form field errors.
 * @param {RefObject<HTMLFormElement>} options.formRef - The reference to the form element.
 */
const useFocusOnFormError = <T>({
  errors,
  formRef,
}: {
  errors: T;
  formRef: RefObject<HTMLFormElement>;
}) => {
  useEffect(() => {
    if (isEmpty(errors) || !formRef.current) return;
    const elementWithError = document.querySelector('[aria-invalid="true"]');
    if (elementWithError instanceof HTMLElement) {
      elementWithError.focus();
    }
  }, [errors, formRef]);
};

export default useFocusOnFormError;
