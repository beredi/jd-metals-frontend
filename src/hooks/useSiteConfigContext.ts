import { useContext } from "react";
import { SiteConfigContext } from "../data/siteConfigContext";
export const useSiteConfigContext = () => {
  return useContext(SiteConfigContext);
};
