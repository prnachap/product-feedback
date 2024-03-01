"use client";

import { loginAction } from "@/actions/auth.action";
import { APP_ROUTES } from "@/constants";
import useFocusOnFormError from "@/hooks/useFocusOnFormError";
import clsx from "clsx";
import Link from "next/link";
import { useRef } from "react";
import { useFormState } from "react-dom";
import AlertCard from "../UI/AlertCard";
import CustomCard from "../UI/CustomCard";
import CustomDivider from "../UI/CustomDivider";
import ErrorList from "./ErrorLists";
import FormSubmissionButton from "./FormSubmissionButton";
import Input from "./Input";
import Social from "./Social";

const LoginForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, dispatch] = useFormState(loginAction, {
    errors: null,
    status: null,
    formMessage: null,
  });

  const emailError = formState?.errors?.email;
  const passwordError = formState?.errors?.password;
  const formError = formState?.formMessage;
  const hasEmailError = Boolean(emailError?.length);
  const hasPasswordError = Boolean(passwordError?.length);
  const hasFormError = Boolean(formError);
  const alertSeverity = formState.status === "error" ? "error" : "success";

  // Focus on the first form element with an error
  useFocusOnFormError({ errors: formState.errors, formRef });

  return (
    <CustomCard className="flex flex-col gap-4">
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
        <div>
          <Link
            href={APP_ROUTES.RESET_PASSWORD}
            className="btn-back-primary !px-0"
            prefetch={true}
          >
            Forgot password?
          </Link>
        </div>
        {hasFormError && (
          <AlertCard severity={alertSeverity} message={formState.formMessage} />
        )}
        <FormSubmissionButton title="Login" form="login-form" />
      </form>
      <CustomDivider title="Or,Login with" />
      <Social />
      <div className="flex justify-center">
        <p className="body-two-text">Don&apos;t have an account? </p>
        <Link
          href={APP_ROUTES.REGISTER}
          className="bg-transparent hover:underline text-dark-blue-gray font-bold border-none transition-all ease-in ml-1"
        >
          Register
        </Link>
      </div>
    </CustomCard>
  );
};

export default LoginForm;
