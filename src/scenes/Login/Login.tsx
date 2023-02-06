import { AccountCircle, LoginOutlined, Password } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { Formik, FormikValues } from "formik";
import { tokens } from "../../theme";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { LoginForm } from "../../types/Login";
import { useAuthContext } from "../../hooks/useAuthContext";
import { LoadingIndicator } from "../../components/LoadingIndicator";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invaild email.").required("Required"),
  password: yup.string().required("Required").min(5, "Min. 5 characters"),
});
const initialValues: LoginForm = {
  email: "",
  password: "",
  remember: false,
};
export const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  const { logIn, loginError, isLoading } = useAuthContext();

  const CssTextField = styled(TextField)({
    "& label.MuiFormLabel-root": {
      color: `${colors.greenAccent[400]}`,
      fontSize: "20px",
      marginBottom: 3,
    },
    "& label.Mui-focused": {
      color: `${colors.greenAccent[800]}`,
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: `${colors.greenAccent[400]}`,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: `${colors.greenAccent[800]}`,
    },
    "& .MuiSvgIcon-root": {
      color: `${colors.greenAccent[500]}`,
    },
    "& .MuiInputBase-root": {
      color: `${colors.greenAccent[800]}`,
      fontSize: "20px",
    },
    "& .Mui-error": {
      color: `${colors.redAccent[600]}`,
    },
  });

  const handleFormSubmit = (values: FormikValues) => {
    logIn(values as unknown as LoginForm);
  };

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: `${colors.greenAccent[100]}`,
          padding: "50px 100px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h2" color={colors.greenAccent[600]}>
          {t("welcomeMessage")}
        </Typography>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "column",
                  marginTop: 5,
                  marginBottom: 5,
                }}
                key="input-fields"
              >
                <CssTextField
                  id="email"
                  name="email"
                  label={t("email")}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  variant="standard"
                  placeholder={t("enterEmail")!}
                  sx={{
                    marginTop: 2,
                    marginBottom: 2,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
                <CssTextField
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  label={t("password")}
                  variant="standard"
                  type="password"
                  placeholder={t("enterPassword")!}
                  sx={{
                    marginTop: 2,
                    marginBottom: 2,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Password />
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      id="remember"
                      name="remember"
                      value={values.remember}
                      onChange={handleChange}
                    />
                  }
                  label={t("stayLogin")}
                  sx={{
                    marginTop: 2,
                    padding: 1,
                    "& .MuiTypography-root": {
                      fontSize: "17px",
                      color: colors.greenAccent[600],
                      marginLeft: 1,
                    },
                    "& .MuiTypography-root:hover": {
                      color: colors.greenAccent[800],
                    },
                    "& .MuiSvgIcon-root": {
                      color: colors.greenAccent[600],
                    },
                  }}
                />
              </Box>
              {loginError && (
                <Typography variant="h5" color={colors.redAccent[500]}>
                  {t("invalidCredentials")}
                </Typography>
              )}
              <Button
                endIcon={<LoginOutlined />}
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: `${colors.greenAccent[500]}`,
                  padding: "1 2 1 2",
                }}
                type="submit"
              >
                <Typography variant="h5">{t("login")}</Typography>
              </Button>
            </form>
          )}
        </Formik>
        <Box>
          <Typography
            variant="h6"
            sx={{
              marginTop: 3,
              color: `${colors.greenAccent[600]}`,
            }}
          >
            Developed by: Jaroslav Beredi
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
