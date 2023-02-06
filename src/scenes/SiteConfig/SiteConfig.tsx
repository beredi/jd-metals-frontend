import { Box, Button, TextField, useTheme } from "@mui/material";
import { Header } from "../../components/Header";
import { useTranslation } from "react-i18next";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik, FormikValues } from "formik";
import { useSiteConfigContext } from "../../hooks/useSiteConfigContext";
import * as yup from "yup";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { tokens } from "../../theme";

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Required"),
  description: yup.string(),
});
export const SiteConfig = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { siteConfig, isLoading, updateSiteConfig } = useSiteConfigContext();
  const handleFormSubmit = (values: FormikValues) => {
    if (siteConfig) {
      updateSiteConfig({
        id: siteConfig.id,
        ...values,
      });
    }
  };
  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <Box m="20px">
      <Header title={t("siteConfig")} subtitle={t("siteConfigSub")} />
      {siteConfig && (
        <Formik
          initialValues={siteConfig}
          onSubmit={handleFormSubmit}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                width="50%"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label={t("name")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 2", paddingTop: 1 }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label={t("owner")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.owner}
                  name="owner"
                  error={!!touched.owner && !!errors.owner}
                  helperText={touched.owner && errors.owner}
                  sx={{ gridColumn: "span 2", paddingTop: 1 }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label={t("phone")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  name="phone"
                  error={!!touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
                  sx={{ gridColumn: "span 2", paddingTop: 1 }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label={t("address")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  name="address"
                  error={!!touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
                  sx={{ gridColumn: "span 2", paddingTop: 1 }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label={"PIB"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.pib}
                  name="pib"
                  error={!!touched.pib && !!errors.pib}
                  helperText={touched.pib && errors.pib}
                  sx={{ gridColumn: "span 2", paddingTop: 1 }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label={t("companyNumber")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.maticni_broj}
                  name="maticni_broj"
                  error={!!touched.maticni_broj && !!errors.maticni_broj}
                  helperText={touched.maticni_broj && errors.maticni_broj}
                  sx={{ gridColumn: "span 2", paddingTop: 1 }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label={t("description")}
                  multiline={true}
                  rows={3}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: "span 4", paddingTop: 1 }}
                />
                <Box
                  display="flex"
                  justifyContent="end"
                  mt="20px"
                  sx={{ gridColumn: "span 4", paddingTop: 1 }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: `${colors.greenAccent[400]}`,
                      color: "#ffffff",
                    }}
                  >
                    {t("update")}
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </Box>
  );
};
