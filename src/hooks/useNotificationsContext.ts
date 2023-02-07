import { useContext } from "react";
import { NotificationsContext } from "../data/notificationsContext";

export const useNotificationsContext = () => {
  return useContext(NotificationsContext);
};
