import Link from "next/link";
import PlusIcon from "../../../public/assets/shared/icon-plus.svg";
import { APP_ROUTES } from "../../constants/appRoutes";
import BackButton from "../Button/BackButton";
import StyledButton from "../Button/StyledButton";

const RoadmapNav = () => {
  return (
    <div className="w-full flex items-center justify-between px-3 gap-2 min-h-[5rem] max-h-[5rem] bg-american-blue-200 md:p-6 md:rounded-lg">
      <div className="flex flex-col items-start gap-1">
        <BackButton
          className="!text-ghost-white"
          iconClassName="[&>path]:stroke-white"
        />

        <h1 className="primary-text text-white">Roadmap</h1>
      </div>
      <div>
        <Link href={APP_ROUTES.CREATE_FEEDBACK}>
          <StyledButton className="flex items-center gap-2 btn-primary">
            <PlusIcon />
            <span>Add Feedback</span>
          </StyledButton>
        </Link>
      </div>
    </div>
  );
};

export default RoadmapNav;
