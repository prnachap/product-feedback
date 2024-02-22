import { Alert } from "@mui/material";

const AlertCard = ({
  severity,
  message,
}: {
  severity: "error" | "warning" | "info" | "success";
  message: string | null;
}) => {
  return <Alert severity={severity}>{message}</Alert>;
};

export default AlertCard;
