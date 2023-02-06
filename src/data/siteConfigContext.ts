import {
  SiteConfigPatch,
  SiteConfigType,
} from "../scenes/SiteConfig/types/SiteConfigTypes";
import { createContext } from "react";

interface SiteConfigContextProps {
  siteConfig: SiteConfigType | null;
  setSiteConfig: (siteConfig: SiteConfigType) => void;
  isLoading: boolean;
  updateSiteConfig: (body: SiteConfigPatch) => void;
}

export const SiteConfigContext = createContext<SiteConfigContextProps>({
  siteConfig: null,
  setSiteConfig: () => {},
  isLoading: false,
  updateSiteConfig: () => {},
});
