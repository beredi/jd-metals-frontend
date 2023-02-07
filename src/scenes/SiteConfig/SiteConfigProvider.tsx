import { SiteConfigContext } from "../../data/siteConfigContext";
import { useEffect, useState } from "react";
import { SiteConfigPatch, SiteConfigType } from "./types/SiteConfigTypes";
import { useFetch } from "../../hooks/useFetch";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNotificationsContext } from "../../hooks/useNotificationsContext";
import { useTranslation } from "react-i18next";

interface Props {
  children: React.ReactNode;
}

export const SiteConfigProvider = ({ children }: Props) => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthContext();
  const [siteConfig, setSiteConfig] = useState<SiteConfigType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setNotification } = useNotificationsContext();
  const axiosInstance = useFetch();
  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      axiosInstance
        .get("api/getSiteConfig")
        .then((response) => {
          const siteConfig = response.data.data as SiteConfigType;
          setSiteConfig(siteConfig);
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    }
  }, [isAuthenticated]);

  const updateSiteConfig = (updateBody: SiteConfigPatch) => {
    setIsLoading(true);
    const body = {
      _method: "PUT",
      ...updateBody,
    };

    axiosInstance
      .post(`/api/site-configs/${updateBody.id}`, body)
      .then((response) => {
        const siteConfig = response.data.data as SiteConfigType;
        setSiteConfig(siteConfig);
      })
      .catch((error) => {
        console.log(error);
        setNotification("error", t("updateFailed"));
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <SiteConfigContext.Provider
      value={{ siteConfig, setSiteConfig, isLoading, updateSiteConfig }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
};
