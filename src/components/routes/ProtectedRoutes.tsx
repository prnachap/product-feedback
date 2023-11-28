import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import isEqual from "lodash/isEqual";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { APP_ROUTES } from "../../constants/appRoutes";
import useIsAuthorized from "../../hooks/useIsAuthorized";

type ProtectedRoutesProps = {
  children: React.ReactNode;
};

const isBrowser = () => typeof window !== "undefined";

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useIsAuthorized();
  const router = useRouter();

  const unprotectedRoutes = [
    APP_ROUTES.HOME_PAGE,
    APP_ROUTES.LOGIN_PAGE,
    APP_ROUTES.FEEDBACK_DETAIL,
  ];

  const isPathProtected = isEqual(
    unprotectedRoutes.indexOf(router.pathname),
    -1
  );

  if (isLoading && isPathProtected) {
    return (
      <Box className="w-full h-[100vh] items-center flex justify-center">
        <CircularProgress />
      </Box>
    );
  }

  if (isBrowser() && !isAuthenticated && isPathProtected) {
    router.push(APP_ROUTES.LOGIN_PAGE);
  }

  return <Fragment>{children}</Fragment>;
};

export default ProtectedRoutes;
