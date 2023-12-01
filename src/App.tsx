import React from "react";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ActiveApplication from "./pages/student/activeApplication/ActiveApplication";
import CreateApplication from "./pages/student/createApplication/CreateApplication";
import PastApplications from "./pages/student/pastApplications/PastApplications";
import PendingApplications from "./pages/admin/internship/pendingApplications/PendingApplications";
import PendingApplicationsEvaluate from "./pages/admin/internship/pendingApplications/pendingApplicationsEvaluate/PendingApplicationsEvaluate";
import Authorize from "./pages/admin/administration/authorize/Authorize";
import PastApplicationDetail from "./pages/student/pastApplications/pastApplicationsDetail/PastApplicationDetail";
import MyLayout from "./components/Layout";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import Home from "./pages/home/Home";
import EmailApprove from "./pages/email-approve/EmailApprove";
import Profile from "./pages/student/profile/Profile";
import RequireAuth from "./components/RequireAuth";
import Companies from "./pages/admin/companies/Companies";
import NotFound from "./pages/notfound/NotFound";
import Holidays from "./pages/admin/administration/holidays/Holidays";
import AllApplications from "./pages/admin/internship/pastApplications/PastApplications";
import Students from "./pages/admin/companies/students/Students";

const ROLES = {
  ogrenci: 2000,
  akademisyen: 3000,
};
const App: React.FC = () => {
  const [token, setToken] = useState({});
  const loggedIn = window.localStorage.getItem("isLoggedIn");
  // You can track the login state here and conditionally render the Navigate component
  /*  useEffect(() => {
    const loggedInUser = localStorage.getItem("token");
    if (loggedInUser) {
      setToken(token);
    }
  }, []); */
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/ogrenci/login" />} />
      <Route path="onayla" element={<EmailApprove />} />
      <Route path="login" element={<Navigate to="/ogrenci/login" />} />
      <Route index path="ogrenci/login" element={<LoginPage />} />
      <Route path="akademisyen/login" element={<LoginPage />} />
      <Route path="ogrenci/register" element={<RegisterPage />} />
      <Route path="akademisyen/register" element={<RegisterPage />} />
      {/*       <Route path="/" element={<PersistLogin token={token} />}>
       */}{" "}
      {loggedIn ? (
        <Route element={<MyLayout />}>
          <Route
            element={
              <RequireAuth allowedRoles={[ROLES.ogrenci]} loggedIn={loggedIn} />
            }
          >
            <Route path="ogrenci" element={<Home />} />
            <Route path="ogrenci/active" element={<ActiveApplication />} />
            <Route path="ogrenci/create" element={<CreateApplication />} />
            <Route path="ogrenci/past" element={<PastApplications />} />
            <Route path="ogrenci/profile" element={<Profile />} />
            <Route
              path="ogrenci/past/:id"
              element={<PastApplicationDetail />}
            />
          </Route>
          <Route
            element={
              <RequireAuth
                allowedRoles={[ROLES.akademisyen]}
                loggedIn={loggedIn}
              />
            }
          >
            <Route path="akademisyen" element={<Home />} />
            <Route
              path="akademisyen/internship/pending"
              element={<PendingApplications />}
            />
            <Route
              path="akademisyen/internship/past"
              element={<AllApplications />}
            />
            <Route path="akademisyen/admin/authorize" element={<Authorize />} />
            <Route path="akademisyen/admin/holidays" element={<Holidays />} />
            <Route path="akademisyen/companies" element={<Companies />} />
            <Route
              path="akademisyen/companies/:id/internships"
              element={<Students />}
            />
            <Route
              path="akademisyen/internship/pending/evaluate/:id"
              element={<PendingApplicationsEvaluate />}
            />
          </Route>
          {/*         </Route>
           */}
        </Route>
      ) : (
        <Route path="/" element={<Navigate to="/ogrenci/login" />} />
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
