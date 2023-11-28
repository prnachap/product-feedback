import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Overlay from "../Overlay/Overlay";

type BackdropProps = {
  showBackdrop: boolean;
};
const Backdrop: React.FC<BackdropProps> = ({ showBackdrop }) => {
  if (!showBackdrop) return null;
  return (
    <Overlay className="md:!block">
      <Box className="flex h-2/3 justify-center items-center">
        <CircularProgress />
      </Box>
    </Overlay>
  );
};

export default Backdrop;
