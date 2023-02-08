import { CustomDialog } from "../../../components/CustomDialog";
import { ProjectType } from "../types/Project";
import { Formik, FormikValues } from "formik";
import { TextField, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SubmitSuccessButton } from "../../../components/SubmitSuccessButton";
import { Add, Edit } from "@mui/icons-material";
import { useProjectFetch } from "../hooks/useProjectFetch";
import { useNotificationsContext } from "../../../hooks/useNotificationsContext";
import { useState } from "react";
import { LoadingIndicator } from "../../../components/LoadingIndicator";

interface Props {
  title: string;
  open: boolean;
  onClose: (refresh: boolean) => void;
  projectTypeData: ProjectType;
}

export const ProjectTypeDialog = ({
  onClose,
  projectTypeData,
  ...props
}: Props) => {
  const { t } = useTranslation();
  const { createProjectType, updateProjectType } = useProjectFetch();
  const { setNotification } = useNotificationsContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddNew = (projectType: ProjectType) => {
    setIsLoading(true);
    createProjectType(projectType)
      .then((response) => {
        if (response.status === 201) {
          setNotification("success", t("createSuccess"));
          onClose(true);
        } else {
          setNotification("error", t("createFailed"));
        }
      })
      .catch((error) => {
        console.log(error);
        setNotification("error", t("createFailed"));
      })
      .finally(() => setIsLoading(false));
  };
  const handleEdit = (projectType: ProjectType) => {
    setIsLoading(true);
    updateProjectType(projectType)
      .then((response) => {
        if (response.status === 200) {
          setNotification("success", t("updateSuccess"));
          onClose(true);
        } else {
          setNotification("error", t("updateFailed"));
        }
      })
      .catch((error) => {
        console.log(error);
        setNotification("error", t("updateFailed"));
      })
      .finally(() => setIsLoading(false));
  };
  const handleSubmit = (values: FormikValues) => {
    projectTypeData.id
      ? handleEdit(values as ProjectType)
      : handleAddNew(values as ProjectType);
  };

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <CustomDialog
      onClose={() => {
        onClose(false);
      }}
      {...props}
    >
      <Formik initialValues={projectTypeData} onSubmit={handleSubmit}>
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          submitForm,
        }) => (
          <form onSubmit={handleSubmit}>
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
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gridColumn: "span 2",
                marginTop: 2,
              }}
            >
              <SubmitSuccessButton
                title={projectTypeData.id ? t("update") : t("addNew")}
                icon={projectTypeData.id ? <Edit /> : <Add />}
                onClick={submitForm}
              />
            </Box>
          </form>
        )}
      </Formik>
    </CustomDialog>
  );
};
