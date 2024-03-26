"use client";

import { sendPasswordResetEmailAction } from "@/actions/auth.action";
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

const ResetForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, dispatch] = useFormState(sendPasswordResetEmailAction, {
    errors: {
      email: [],
    },
    status: null,
    formMessage: null,
  });

  const emailError = formState?.errors?.email;
  const formError = formState?.formMessage;
  const hasEmailError = Boolean(emailError?.length);
  const hasFormError = Boolean(formError);
  const alertSeverity = formState.status === "error" ? "error" : "success";

  // Focus on the first form element with an error
  useFocusOnFormError({ errors: formState.errors, formRef });

  return (
    <CustomCard className="flex flex-col gap-4">
      <p className="tertiary-text text-center">Forgot your password?</p>
      <form
        ref={formRef}
        id="login-form"
        action={dispatch}
        className="flex flex-col gap-4"
      >
        <div>
          <label htmlFor="email" className={clsx(`input-label !mb-2`)}>
            Email
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="johndoe@mail.com"
            aria-describedby="email-error"
            aria-invalid={hasEmailError || undefined}
            className={hasEmailError ? `!border-jasper` : ""}
          />
          <ErrorList id="email-error" errors={emailError} />
        </div>
        {hasFormError && (
          <AlertCard severity={alertSeverity} message={formState.formMessage} />
        )}
        <FormSubmissionButton title="Send reset email" form="login-form" />
      </form>
      <Link href="/auth/login" className="w-full">
        <button className="btn-back-secondary w-full">Back to login</button>
      </Link>
    </CustomCard>
  );
};

export default ResetForm;
