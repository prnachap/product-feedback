import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/router";
import { APP_ROUTES } from "../constants/appRoutes";
import { useCurrentUser } from "./useCurrentUser";

const useIsAuthorized = () => {
  const { data: userDetails, isLoading, ...otherProps } = useCurrentUser();
  const router = useRouter();
  const isAuthenticated = !isEmpty(userDetails) && !isLoading;

  const handleRedirectForUnAuthorizedUser = () =>
    router.push(APP_ROUTES.LOGIN_PAGE);

  return {
    isAuthenticated,
    onRedirectForUnAuthorizeduser: handleRedirectForUnAuthorizedUser,
    isLoading,
    ...otherProps,
  };
};

export default useIsAuthorized;
