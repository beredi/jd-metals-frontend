import { Autocomplete, Box, TextField } from "@mui/material";
import { CustomDialog } from "../../../components/CustomDialog";
import { Formik, FormikValues } from "formik";
import { ProjectCreate, ProjectType } from "../types/Project";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { useProjectFetch } from "../hooks/useProjectFetch";
import { useCustomersFetch } from "../../Customers/hooks/useCustomersFetch";
import {
  Customer,
  getCustomerTitleLabel,
} from "../../Customers/types/Customer";
import { useNotificationsContext } from "../../../hooks/useNotificationsContext";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { SubmitSuccessButton } from "../../../components/SubmitSuccessButton";
import { Add, Edit } from "@mui/icons-material";
import moment, { MomentInput } from "moment";

interface Props {
  title: string;
  open: boolean;
  onClose: (refresh: boolean) => void;
  projectData: ProjectCreate;
}

export const AddNewProjectDialog = ({
  onClose,
  projectData,
  ...props
}: Props) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { createProject, updateProject, getAllProjectTypes } =
    useProjectFetch();
  const { getAllCustomers } = useCustomersFetch();
  const [customers, setCustomers] = useState<Customer[] | null>(null);
  const { setNotification } = useNotificationsContext();
  const [projectTypes, setProjectTypes] = useState<ProjectType[] | null>(null);

  const loadProjectTypes = useCallback(() => {
    setIsLoading(true);
    getAllProjectTypes()
      .then((response) => {
        if (response.status === 200) {
          setProjectTypes(response.data.data);
        }
      })

      .catch((error) => {
        console.log(error);
        setNotification("error", t("loadFailed"));
      })
      .finally(() => setIsLoading(false));
  }, []);

  const loadCustomers = useCallback(() => {
    setIsLoading(true);
    getAllCustomers()
      .then((response) => {
        if (response.status === 200) {
          setCustomers(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
        setNotification("error", t("loadFailed"));
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    loadCustomers();
    loadProjectTypes();
  }, [loadCustomers, loadProjectTypes]);

  const handleCreateProject = (project: ProjectCreate) => {
    setIsLoading(true);
    createProject(project)
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

  const handleUpdateProject = (project: ProjectCreate) => {
    setIsLoading(true);
    updateProject(project)
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

  const formatDate = (date: object) => {
    return "$d" in date
      ? moment(date.$d as MomentInput).format("YYYY-MM-DD")
      : date;
  };

  const setDate = (date: object | string) => {
    return typeof date === "object" ? formatDate(date) : date;
  };
  const handleFormSubmit = (values: FormikValues) => {
    const project = {
      ...values,
      real_start: setDate(values.real_start),
      real_end: setDate(values.real_end),
      planned_start: setDate(values.planned_start),
      planned_end: setDate(values.planned_end),
    };
    projectData.id
      ? handleUpdateProject(project as ProjectCreate)
      : handleCreateProject(project as ProjectCreate);
  };

  return (
    <CustomDialog
      onClose={() => {
        onClose(false);
      }}
      {...props}
    >
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <Formik initialValues={projectData} onSubmit={handleFormSubmit}>
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            submitForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
              >
                <Autocomplete
                  disablePortal
                  id="project_type_id"
                  options={projectTypes ?? []}
                  getOptionLabel={(option) => option.name}
                  onChange={(event: any, newValue: any) => {
                    newValue && setFieldValue("project_type_id", newValue.id);
                  }}
                  value={
                    projectTypes?.filter(
                      (projectType) => projectType.id === values.project_type_id
                    )[0] ?? null
                  }
                  sx={{ gridColumn: "span 2" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Project type" />
                  )}
                />
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
                <DesktopDatePicker
                  label={t("plannedStart")}
                  inputFormat="DD. MM. YYYY"
                  value={values.planned_start ?? null}
                  onChange={(value) => {
                    setFieldValue("planned_start", value, true);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                  label={t("plannedEnd")}
                  inputFormat="DD. MM. YYYY"
                  value={values.planned_end ?? null}
                  onChange={(value) =>
                    setFieldValue("planned_end", value, true)
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                  label={t("realStart")}
                  inputFormat="DD. MM. YYYY"
                  value={values.real_start ?? null}
                  onChange={(value) => setFieldValue("real_start", value, true)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                  label={t("realEnd")}
                  inputFormat="DD. MM. YYYY"
                  value={values.real_end ?? null}
                  onChange={(value) => setFieldValue("real_end", value, true)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <Autocomplete
                  disablePortal
                  id="customer_id"
                  options={customers ?? []}
                  getOptionLabel={(customer) => getCustomerTitleLabel(customer)}
                  onChange={(event: any, newValue: any) => {
                    setFieldValue("customer_id", newValue.id);
                  }}
                  value={
                    customers?.filter(
                      (customer) => customer.id === values.customer_id
                    )[0] ?? null
                  }
                  sx={{ gridColumn: "span 2" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Customers" />
                  )}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gridColumn: "span 2",
                  marginTop: 2,
                }}
              >
                <SubmitSuccessButton
                  title={projectData.id ? t("update") : t("addNew")}
                  icon={projectData.id ? <Edit /> : <Add />}
                  onClick={submitForm}
                />
              </Box>
            </form>
          )}
        </Formik>
      )}
    </CustomDialog>
  );
};
