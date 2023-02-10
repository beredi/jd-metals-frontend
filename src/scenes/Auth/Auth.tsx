import { useAuthContext } from "../../hooks/useAuthContext";
import { Alert, CssBaseline, SlideProps, Snackbar } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Sidebar } from "../Global/Sidebar";
import { Topbar } from "../Global/Topbar";
import { Dashboard } from "../Dashboard/Dashboard";
import { Form } from "../Form/Form";
import { Calendar } from "../Calendar/Calendar";
import { FAQ } from "../FAQ/FAQ";
import { Login } from "../Login/Login";
import { Projects } from "../Projects/Projects";
import { Users } from "../Users/Users";
import { SiteConfig } from "../SiteConfig/SiteConfig";
import { ProjectConfig } from "../Projects/ProjectConfig";
import { Customers } from "../Customers/Customers";
import { useNotificationsContext } from "../../hooks/useNotificationsContext";
import Slide from "@mui/material/Slide";
import { CustomerDetail } from "../Customers/components/CustomerDetail";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ProjectDetail } from "../Projects/components/ProjectDetail";

const SlideTransition = ({ children, ...props }: SlideProps) => {
  return <Slide children={children} {...props} direction="left" />;
};
export const Auth = () => {
  const { isAuthenticated } = useAuthContext();
  const { open, message, severity, handleClose } = useNotificationsContext();

  return isAuthenticated ? (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className={"content"}>
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/form" element={<Form />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/project-config" element={<ProjectConfig />} />
              <Route path="/customers" element={<Customers />} />
              <Route
                path="/customers/:customerId"
                element={<CustomerDetail />}
              />
              <Route path="/projects/:projectId" element={<ProjectDetail />} />
              <Route path="/users" element={<Users />} />
              <Route path="/site-config" element={<SiteConfig />} />
            </Routes>
          </main>
        </div>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          TransitionComponent={SlideTransition}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{
            "& .MuiAlert-message": {
              fontSize: "15px",
            },
          }}
        >
          <Alert severity={severity}>{message}</Alert>
        </Snackbar>
      </LocalizationProvider>
    </>
  ) : (
    <Login />
  );
};
