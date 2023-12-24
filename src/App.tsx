import React from "react";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ActiveApplication from "./pages/student/activeApplication/ActiveApplication";
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
import RequireAuth from "./components/RequireAuth";
import Companies from "./pages/admin/companies/Companies";
import NotFound from "./pages/notfound/NotFound";
import Holidays from "./pages/admin/administration/holidays/Holidays";
import AllApplications from "./pages/admin/internship/pastApplications/PastApplications";
import Students from "./pages/admin/companies/students/Students";
import ActiveInternships from "./pages/admin/internship/activeInternships/ActiveInternships";
import CompanyAdd from "./pages/admin/companies/companyAdd/CompanyAdd";

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
      <Route path="ogrenci/register" element={<RegisterPage />} />
      <Route path="akademisyen/register" element={<RegisterPage />} />
      // student routes
      <Route element={<RequireAuth allowedRoles={[ROLES.ogrenci]} />}>
        <Route element={<MyLayout />}>
          <Route path="ogrenci" element={<Home />} />
          <Route path="ogrenci/active" element={<ActiveApplication />} />
          <Route path="ogrenci/past" element={<PastApplications />} />
          <Route path="ogrenci/companies" element={<Companies />} />
          <Route path="ogrenci/companies/new" element={<CompanyAdd />} />
          <Route path="ogrenci/past/:id" element={<PastApplicationDetail />} />
        </Route>
      </Route>
      // academician routes
      <Route element={<RequireAuth allowedRoles={[ROLES.akademisyen]} />}>
        <Route element={<MyLayout />}>
          <Route path="akademisyen" element={<Home />} />
          <Route
            path="akademisyen/internship/pending"
            element={<PendingApplications />}
          />
          <Route
            path="akademisyen/internship/past"
            element={<AllApplications />}
          />
          <Route
            path="akademisyen/internship/active"
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
            path="akademisyen/internship/pending/evaluate/:id"
            element={<PastApplicationDetail />}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
