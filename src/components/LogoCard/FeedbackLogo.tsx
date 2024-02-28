import { logoutAction } from "@/actions/auth.action";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsPopover from "../SettingsPopover/SettingsPopover";
import CustomCard from "../UI/CustomCard";
import CustomMenuItem from "../UI/CustomMenuItem";

const FeedbackLogo: React.FC = () => {
  return (
    <CustomCard className="bg-gradient-to-r from-purple-500 to-pink-500 w-[15.9375rem] max-w-[15.9375rem] !px-6 !pt-14 !pb-6 relative">
      <div className="absolute right-2 top-2 ">
        <SettingsPopover>
          <CustomMenuItem className="flex justify-between gap-1 items-center">
            <SettingsIcon />
            <span>Settings</span>
          </CustomMenuItem>
          <CustomMenuItem className="flex justify-between gap-1 items-center">
            <LogoutIcon />
            <form action={logoutAction}>
              <button type="submit">Logout</button>
            </form>
          </CustomMenuItem>
        </SettingsPopover>
      </div>

      <div className="absolute right-2 top-2 "></div>
      <h2 className="secondary-text text-white">Frontend Mentor</h2>
      <span className="body-two-text text-white">Feedback board</span>
    </CustomCard>
  );
};

export default FeedbackLogo;
