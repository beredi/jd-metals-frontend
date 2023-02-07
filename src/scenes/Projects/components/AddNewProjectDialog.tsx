import { Box, TextField, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { CustomDialog } from "../../../components/CustomDialog";
import { Formik, FormikValues } from "formik";
import { ProjectCreate } from "../types/Project";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  open: boolean;
  setOpen: (newOpen: boolean) => void;
}

const initialProject: ProjectCreate = {
  name: "",
  description: "",
  customer_id: undefined,
};
export const AddNewProjectDialog = (props: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  const handleFormSubmit = (values: FormikValues) => {
    console.log(values);
  };

  return (
    <CustomDialog {...props}>
      <Formik initialValues={initialProject} onSubmit={handleFormSubmit}>
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
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            >
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label={t("name")}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label={t("description")}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 2" }}
              />
              {/*TODO: DatePickers*/}
            </Box>
          </form>
        )}
      </Formik>
    </CustomDialog>
  );
};
