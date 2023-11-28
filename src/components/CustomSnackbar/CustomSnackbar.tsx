import CloseIcon from "@mui/icons-material/Close";
import Alert, { AlertColor } from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import * as React from "react";

type CustomSnackbarProps = {
  message: string;
  severity?: AlertColor;
};
const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  message,
  severity = "success",
}) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  if (!message) return null;

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
      action={action}
    >
      <Alert onClose={handleClose} severity={severity}>
        <Typography className="first-letter:capitalize body-one-text">
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
