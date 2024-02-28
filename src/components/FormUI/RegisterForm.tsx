"use client";

import { registerAction } from "@/actions/auth.action";
import { AUTH_ROUTES } from "@/constants";
import useFocusOnFormError from "@/hooks/useFocusOnFormError";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
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

const RegisterForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, dispatch] = useFormState(registerAction, {
    errors: null,
    status: null,
    formError: null,
  });

  const nameError = formState?.errors?.name;
  const userNameError = formState?.errors?.username;
  const emailError = formState?.errors?.email;
  const passwordError = formState?.errors?.password;
  const formError = formState?.formError;

  const hasNameError = Boolean(nameError?.length);
  const hasUserNameError = Boolean(userNameError?.length);
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
        id="register-form"
        action={dispatch}
        className="flex flex-col gap-4"
      >
        <div>
          <label htmlFor="name" className={clsx(`input-label !mb-2`)}>
            Name
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="e.g John Doe"
            aria-describedby="name-error"
            aria-invalid={hasNameError || undefined}
            className={hasNameError ? `!border-jasper` : ""}
          />
          <ErrorList id="name-error" errors={nameError} />
        </div>
        <div>
          <label htmlFor="username" className={clsx(`input-label !mb-2`)}>
            Username
          </label>
          <Input
            type="text"
            id="username"
            name="username"
            placeholder="e.g johndoe"
            aria-describedby="username-error"
            aria-invalid={hasUserNameError || undefined}
            className={hasUserNameError ? `!border-jasper` : ""}
          />
          <ErrorList id="username-error" errors={userNameError} />
        </div>
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
        {hasFormError && (
          <AlertCard severity={alertSeverity} message={formState.formError} />
        )}
        <FormSubmissionButton title="Register" form="register-form" />
      </form>
      <CustomDivider title="Or,Register with" />
      <div className="flex justify-between items-center gap-2">
        <button className="btn-tertiary !w-full">
          <GoogleIcon />
        </button>
        <button className="btn-tertiary !w-full ">
          <GitHubIcon />
        </button>
      </div>
      <div className="flex justify-center">
        <p className="body-two-text">Already have an account? </p>
        <Link
          href={AUTH_ROUTES.LOGIN}
          className="bg-transparent hover:underline text-dark-blue-gray font-bold border-none transition-all ease-in ml-1"
        >
          SignIn
        </Link>
      </div>
    </CustomCard>
  );
};

export default RegisterForm;
