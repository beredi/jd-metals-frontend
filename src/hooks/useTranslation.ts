import { useState, useEffect } from "react";
import i18n from "i18next";

export const useTranslation = () => {
  const [translation, setTranslation] = useState(i18n.t("key"));

  useEffect(() => {
    i18n.on("languageChanged", () => setTranslation(i18n.t("key")));
    return () =>
      i18n.off("languageChanged", () => setTranslation(i18n.t("key")));
  }, []);

  return translation;
};
