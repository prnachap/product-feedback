"use client";

import { APP_ROUTES } from "@/constants";
import { getErrorText } from "@/utils/formElementUtils";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AlertCard from "../UI/AlertCard";
import CustomCard from "../UI/CustomCard";
import CustomDivider from "../UI/CustomDivider";

const RegisterForm = () => {
  const searchParams = useSearchParams();
  const loginError = searchParams.get("error");
  // const formRef = useRef<HTMLFormElement>(null);
  // const [formState, dispatch] = useFormState(registerAction, {
  //   errors: null,
  //   status: null,
  //   formMessage: null,
  // });

  // const nameError = formState?.errors?.name;
  // const emailError = formState?.errors?.email;
  // const passwordError = formState?.errors?.password;
  // const formError = formState?.formMessage;

  // const hasNameError = Boolean(nameError?.length);
  // const hasEmailError = Boolean(emailError?.length);
  // const hasPasswordError = Boolean(passwordError?.length);
  // const hasFormError = Boolean(formError);
  // const alertSeverity = formState.status === "error" ? "error" : "success";

  // Focus on the first form element with an error
  // useFocusOnFormError({ errors: formState.errors, formRef });

  return (
    <CustomCard className="flex flex-col gap-4">
      {/* <form
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
          <AlertCard severity={alertSeverity} message={formState.formMessage} />
        )}
        <FormSubmissionButton title="Register" form="register-form" />
      </form> */}
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
          href={APP_ROUTES.LOGIN}
          className="bg-transparent hover:underline text-dark-blue-gray font-bold border-none transition-all ease-in ml-1"
        >
          SignIn
        </Link>
      </div>
      {loginError && (
        <AlertCard severity={"error"} message={getErrorText(loginError)} />
      )}
    </CustomCard>
  );
};

export default RegisterForm;
