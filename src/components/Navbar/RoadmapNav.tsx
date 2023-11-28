import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { APP_ROUTES } from "../../constants/appRoutes";
import useIsAuthorized from "../../hooks/useIsAuthorized";
import IconLeft from "../../public/assets/shared/icon-arrow-left.svg";
import PlusIcon from "../../public/assets/shared/icon-plus.svg";
import StyledButton from "../Button/StyledButton";

const RoadmapNav = () => {
  const router = useRouter();
  const { isAuthenticated, onRedirectForUnAuthorizeduser } = useIsAuthorized();

  const handleBackButton = () => {
    router.back();
  };
  const handleAddFeedback = () =>
    isAuthenticated
      ? router.push(APP_ROUTES.CREATE_FEEDBACK)
      : onRedirectForUnAuthorizeduser();

  return (
    <Box className="w-full flex items-center justify-between px-3 gap-2 min-h-[5rem] max-h-[5rem] bg-american-blue-200 md:p-6 md:rounded-lg">
      <Box className="flex flex-col items-start gap-1">
        <StyledButton
          className="btn-back-primary !p-0"
          onClick={handleBackButton}
        >
          <IconLeft className="mr-4 [&>path]:!stroke-white" />
          <Typography
            variant="h4"
            className="quaternary-text text-white capitalize"
          >
            go back
          </Typography>
        </StyledButton>
        <Typography variant="h1" className="primary-text text-white">
          Roadmap
        </Typography>
      </Box>
      <Box>
        <StyledButton
          className="flex items-center gap-2 btn-primary"
          onClick={handleAddFeedback}
        >
          <PlusIcon />
          <span>Add Feedback</span>
        </StyledButton>
      </Box>
    </Box>
  );
};

export default RoadmapNav;
