"use client";

import { resetPasswordAction } from "@/actions/auth.action";
import useFocusOnFormError from "@/hooks/useFocusOnFormError";
import clsx from "clsx";
import Link from "next/link";
import { useRef } from "react";
import { useFormState } from "react-dom";
import AlertCard from "../UI/AlertCard";
import CustomCard from "../UI/CustomCard";
import ErrorList from "./ErrorLists";
import FormSubmissionButton from "./FormSubmissionButton";
import Input from "./Input";

const PasswordResetForm = ({ token }: { token: string }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const resetAction = resetPasswordAction.bind(null, token);
  const [formState, dispatch] = useFormState(resetAction, {
    errors: {
      password: [],
    },
    status: null,
    formMessage: null,
  });

  const passwordError = formState?.errors?.password;
  const formError = formState?.formMessage;
  const hasPasswordError = Boolean(passwordError?.length);
  const hasFormError = Boolean(formError);
  const alertSeverity = formState.status === "error" ? "error" : "success";

  // Focus on the first form element with an error
  useFocusOnFormError({ errors: formState.errors, formRef });

  return (
    <CustomCard className="flex flex-col gap-4">
      <p className="tertiary-text text-center">Reset your password?</p>
      <form
        ref={formRef}
        id="login-form"
        action={dispatch}
        className="flex flex-col gap-4"
      >
        <div>
          <label htmlFor="password" className={clsx(`input-label !mb-2`)}>
            Password
          </label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="*********"
            aria-describedby="password-error"
            aria-invalid={hasPasswordError || undefined}
            className={hasPasswordError ? `!border-jasper` : ""}
          />
          <ErrorList id="password-error" errors={passwordError} />
        </div>
        {hasFormError && (
          <AlertCard severity={alertSeverity} message={formState.formMessage} />
        )}
        <FormSubmissionButton title="Reset Password" form="login-form" />
      </form>
      <Link href="/auth/login" className="w-full">
        <button className="btn-back-secondary w-full">Back to login</button>
      </Link>
    </CustomCard>
  );
};

export default PasswordResetForm;
