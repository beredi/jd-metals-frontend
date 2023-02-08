import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { CustomDialog } from "../../../components/CustomDialog";
import { Formik, FormikValues } from "formik";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useCustomersFetch } from "../hooks/useCustomersFetch";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import { useNotificationsContext } from "../../../hooks/useNotificationsContext";
import * as yup from "yup";
import { Customer } from "../types/Customer";
import { SubmitSuccessButton } from "../../../components/SubmitSuccessButton";
import { Add, Edit } from "@mui/icons-material";

interface Props {
  title: string;
  open: boolean;
  onClose: (refresh: boolean) => void;
  customerData: Customer;
}

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email."),
  name: yup.string().required("Required"),
  lastname: yup.string().required("Required"),
  pib: yup.number(),
  maticni_broj: yup.number(),
});

export const AddNewCustomerDialog = ({
  onClose,
  customerData,
  ...props
}: Props) => {
  const { t } = useTranslation();
  const [isCompany, setIsCompany] = useState<boolean>(
    !!customerData.is_company
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setNotification } = useNotificationsContext();
  const { createCustomer, editCustomer } = useCustomersFetch();
  const handleAddNewCustomer = (customer: Customer) => {
    setIsLoading(true);
    createCustomer(customer)
      .then((response) => {
        if (response.status === 201) {
          setNotification("success", t("createSuccess"));
          setIsCompany(false);
          onClose(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsCompany(customerData.is_company === 1);
        setNotification("error", t("createFailed"));
      })
      .finally(() => setIsLoading(false));
  };
  const handleEditCustomer = (customer: Customer) => {
    setIsLoading(true);
    editCustomer(customer)
      .then((response) => {
        if (response.status === 200) {
          setIsCompany(false);
          setNotification("success", t("updateSuccess"));
          onClose(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsCompany(customerData.is_company === 1);
        setNotification("error", t("updateFailed"));
      })
      .finally(() => setIsLoading(false));
  };
  const handleFormSubmit = (values: FormikValues) => {
    const valuesCustomer = values as Customer;
    const customer: Customer = {
      ...valuesCustomer,
      is_company: parseInt(values.is_company),
    };
    customerData.id
      ? handleEditCustomer(customer)
      : handleAddNewCustomer(customer);
  };
  return (
    <CustomDialog
      onClose={() => {
        onClose(false);
        setIsCompany(!!customerData.is_company);
      }}
      {...props}
    >
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <Formik
          initialValues={customerData}
          onSubmit={handleFormSubmit}
          validationSchema={validationSchema}
        >
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
                <FormControl
                  sx={{
                    gridColumn: "span 2",
                  }}
                >
                  <RadioGroup
                    name="is_company"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("is_company", e.target.value);
                      setIsCompany(e.target.value === "1");
                      if (e.target.value === "1") {
                        setFieldValue("pib", customerData.pib);
                        setFieldValue(
                          "maticni_broj",
                          customerData.maticni_broj
                        );
                      }
                    }}
                    onBlur={handleBlur}
                    value={values.is_company.toString()}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <FormControlLabel
                      value={"0"}
                      control={<Radio />}
                      label={t("person")}
                    />
                    <FormControlLabel
                      value={"1"}
                      control={<Radio />}
                      label={t("company")}
                    />
                  </RadioGroup>
                </FormControl>
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
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label={t("lastname")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastname}
                  name="lastname"
                  error={!!touched.lastname && !!errors.lastname}
                  helperText={touched.lastname && errors.lastname}
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label={t("email")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label={t("phone")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  name="phone"
                  error={!!touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  label={t("address")}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  name="address"
                  error={!!touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
                  sx={{ gridColumn: "span 2" }}
                />
                {isCompany && (
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label={t("companyName")}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.company_name}
                    name="company_name"
                    error={!!touched.company_name && !!errors.company_name}
                    helperText={touched.company_name && errors.company_name}
                    sx={{ gridColumn: "span 2" }}
                  />
                )}
                {isCompany && (
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label={"PIB"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.pib}
                    name="pib"
                    error={!!touched.pib && !!errors.pib}
                    helperText={touched.pib && errors.pib}
                    sx={{ gridColumn: "span 1" }}
                  />
                )}
                {isCompany && (
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label={t("maticniBroj")}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.maticni_broj}
                    name="maticni_broj"
                    error={!!touched.maticni_broj && !!errors.maticni_broj}
                    helperText={touched.maticni_broj && errors.maticni_broj}
                    sx={{ gridColumn: "span 1" }}
                  />
                )}
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
                  title={customerData.id ? t("edit") : t("addNew")}
                  icon={customerData.id ? <Edit /> : <Add />}
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
