import React from "react";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PastApplications from "./pages/student/pastApplications/PastApplications";
import PendingApplications from "./pages/admin/internship/pendingApplications/PendingApplications";
import Authorize from "./pages/admin/administration/authorize/Authorize";
import ApplicationDetail from "./pages/student/pastApplications/pastApplicationsDetail/ApplicationDetail";
import MyLayout from "./components/Layout";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import Home from "./pages/home/Home";
import EmailApprove from "./pages/email-approve/EmailApprove";
import RequireAuth from "./components/RequireAuth";
import Companies from "./pages/admin/companies/Companies";
import NotFound from "./pages/notfound/NotFound";
import Holidays from "./pages/admin/administration/holidays/Holidays";
import AllApplications from "./pages/admin/internship/pastApplications/PastApplications";
import Students from "./pages/admin/companies/students/Students";
import ActiveInternships from "./pages/admin/internship/activeInternships/ActiveInternships";
import CompanyAdd from "./pages/admin/companies/companyAdd/CompanyAdd";
import ForgotMyPasswordPage from "./pages/forgotMyPassword/forgotMyPasswordPage";
import PastInternships from "./pages/admin/internship/pendingApplications/pendingApplicationsEvaluate/pastInternships/PastInternships";

const ROLES = {
  ogrenci: "2000",
  akademisyen: "3000",
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/ogrenci/login" />} />
      <Route path="onayla" element={<EmailApprove />} />
      <Route path="login" element={<Navigate to="/ogrenci/login" />} />
      <Route index path="ogrenci/login" element={<LoginPage />} />
      <Route path="akademisyen/login" element={<LoginPage />} />
      <Route
        path="ogrenci/forgot-my-password"
        element={<ForgotMyPasswordPage />}
      />
      <Route
        path="akademisyen/forgot-my-password"
        element={<ForgotMyPasswordPage />}
      />
      <Route path="ogrenci/register" element={<RegisterPage />} />
      <Route path="akademisyen/register" element={<RegisterPage />} />
      // student routes
      <Route element={<RequireAuth allowedRoles={[ROLES.ogrenci]} />}>
        <Route element={<MyLayout />}>
          <Route path="ogrenci" element={<Home />} />
          <Route path="ogrenci/past" element={<PastApplications />} />
          <Route path="ogrenci/companies" element={<Companies />} />
          <Route path="ogrenci/companies/new" element={<CompanyAdd />} />
          <Route path="ogrenci/past/:id" element={<ApplicationDetail />} />
        </Route>
      </Route>
      // academician routes
      <Route element={<RequireAuth allowedRoles={[ROLES.akademisyen]} />}>
        <Route element={<MyLayout />}>
          <Route path="akademisyen" element={<Home />} />
          <Route
            path="akademisyen/internships/pending"
            element={<PendingApplications />}
          />
          <Route
            path="akademisyen/:id/internships"
            element={<PastInternships />}
          />
          <Route
            path="akademisyen/:id/internships/:id"
            element={<ApplicationDetail />}
          />
          <Route
            path="akademisyen/internships/past"
            element={<AllApplications />}
          />
          <Route
            path="akademisyen/internships/active"
            element={<ActiveInternships />}
          />
          <Route path="akademisyen/admin/authorize" element={<Authorize />} />
          <Route path="akademisyen/admin/holidays" element={<Holidays />} />
          <Route path="akademisyen/companies" element={<Companies />} />
          <Route
            path="akademisyen/companies/:id/internships"
            element={<Students />}
          />
          <Route
            path="akademisyen/companies/:id/internships/:id"
            element={<Students />}
          />
          <Route
            path="akademisyen/internships/pending/evaluate/:id"
            element={<ApplicationDetail />}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
