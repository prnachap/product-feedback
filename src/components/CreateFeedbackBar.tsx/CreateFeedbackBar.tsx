"use client";

import { sortBy } from "../../constants";
// import useIsAuthorized from "../../hooks/useIsAuthorized";
import { useRouter } from "next/navigation";
import PlusIcon from "../../../public/assets/shared/icon-plus.svg";
import BlubIcon from "../../../public/assets/suggestions/icon-suggestions.svg";
import StyledButton from "../Button/StyledButton";
import MenuButton from "../DropdownMenu/MenuButton";

const CreateFeedbackBar: React.FC = () => {
  const router = useRouter();
  // const { isAuthenticated, onRedirectForUnAuthorizeduser } = useIsAuthorized();

  // const handleCreateFeedback = () => {
  //   if (!isAuthenticated) {
  //     onRedirectForUnAuthorizeduser();
  //     return;
  //   }
  //   router.push("/create-feedback");
  // };

  return (
    <div className="w-full flex items-center justify-between px-3 gap-2 min-h-[5rem] max-h-[5rem] bg-american-blue-200 md:p-6 md:rounded-lg">
      <div className="flex gap-4 items-center">
        <BlubIcon className="hidden md:inline-block" />
        <h2 className="secondary-text text-white hidden md:inline-block">{`${6} Suggestions`}</h2>
        <div className="md:ml-[38px]">
          <MenuButton<string> options={sortBy} />
        </div>
      </div>
      <div>
        <StyledButton
          className="flex items-center gap-2 btn-primary"
          // onClick={handleCreateFeedback}
        >
          <PlusIcon />
          <span>Add Feedback</span>
        </StyledButton>
      </div>
    </div>
  );
};

export default CreateFeedbackBar;
