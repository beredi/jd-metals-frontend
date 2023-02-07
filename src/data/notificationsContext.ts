import { createContext } from "react";
import { AlertColor } from "@mui/material";

interface NotificationsContextProps {
  message: string;
  open: boolean;
  severity: AlertColor;
  setNotification: (customSeverity: AlertColor, customMessage: string) => void;
  handleClose: () => void;
}
export const NotificationsContext = createContext<NotificationsContextProps>({
  message: "",
  open: false,
  severity: "info",
  setNotification: () => {},
  handleClose: () => {},
});
