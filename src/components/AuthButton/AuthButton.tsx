import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { useRouter } from "next/router";
import { APP_ROUTES } from "../../constants/appRoutes";
import useIsAuthorized from "../../hooks/useIsAuthorized";
import useLogoutUser from "../../hooks/useLogoutUser";
import StyledButton from "../Button/StyledButton";

const AuthButton = () => {
  const { isAuthenticated } = useIsAuthorized();
  const router = useRouter();
  const onSuccess = () => router.push(APP_ROUTES.LOGIN_PAGE);
  const onError = () => console.log("error");
  const { refetch, data } = useLogoutUser({ onSuccess, onError });

  const handleLogout = () => refetch();

  const renderLoginButton = () => {
    return (
      <Link href={"/auth/login"}>
        <StyledButton className="flex justify-center items-center">
          <span className="mr-1 text-white body-two-text !font-semibold">
            Login
          </span>
          <LoginIcon className="fill-white" />
        </StyledButton>
      </Link>
    );
  };

  const renderLogoutButton = () => {
    return (
      <StyledButton
        className="flex justify-center items-center"
        onClick={handleLogout}
      >
        <span className="mr-1 text-white body-two-text !font-semibold">
          Logout
        </span>
        <LogoutIcon className="fill-white" />
      </StyledButton>
    );
  };

  return isAuthenticated ? renderLogoutButton() : renderLoginButton();
};

export default AuthButton;
