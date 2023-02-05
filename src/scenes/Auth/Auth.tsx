import { useAuthContext } from "../../hooks/useAuthContext";
import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Sidebar } from "../Global/Sidebar";
import { Topbar } from "../Global/Topbar";
import { Dashboard } from "../Dashboard/Dashboard";
import { Team } from "../Team/Team";
import { Contacts } from "../Contacts/Contacts";
import { Invoices } from "../Invoices/Invoices";
import { Form } from "../Form/Form";
import { Calendar } from "../Calendar/Calendar";
import { FAQ } from "../FAQ/FAQ";
import { Login } from "../Login/Login";

export const Auth = () => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? (
    <>
      <CssBaseline />
      <div className="app">
        <Sidebar />
        <main className={"content"}>
          <Topbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/form" element={<Form />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </main>
      </div>
    </>
  ) : (
    <Login />
  );
};
