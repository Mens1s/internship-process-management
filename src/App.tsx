import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ActiveApplication from "./pages/student/activeApplication/ActiveApplication";
import CreateApplication from "./pages/student/createApplication/CreateApplication";
import PastApplications from "./pages/student/pastApplications/PastApplications";
import PendingApplications from "./pages/admin/pendingApplications/PendingApplications";
import PendingApplicationsEvaluate from "./pages/admin/pendingApplications/pendingApplicationsEvaluate/PendingApplicationsEvaluate";
import Authorize from "./pages/admin/authorize/Authorize";
import PastApplicationDetail from "./pages/student/pastApplications/pastApplicationsDetail/PastApplicationDetail";
import MyLayout from "./components/Layout";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/login/RegisterForm";
import Home from "./pages/home/Home";
import EmailApprove from "./pages/email-approve/EmailApprove";

const App: React.FC = () => {
  // You can track the login state here and conditionally render the Navigate component
  const isAuthenticated = true;

  return (
    <Routes>
      <Route path="onayla" element={<EmailApprove />} />
      <Route path="login" element={<Navigate to="/ogrenci/login" />} />
      <Route path="ogrenci/login" element={<LoginPage />} />
      <Route path="akademisyen/login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route
        path="/"
        element={isAuthenticated ? <MyLayout /> : <Navigate to="/login" />}
      >
        <Route path="ogrenci" element={<Home />} />
        <Route path="akademisyen" element={<Home />} />

        <Route path="ogrenci/active" element={<ActiveApplication />} />
        <Route path="ogrenci/create" element={<CreateApplication />} />
        <Route path="ogrenci/past" element={<PastApplications />} />
        <Route path="ogrenci/past/:id" element={<PastApplicationDetail />} />

        <Route path="akademisyen/pending" element={<PendingApplications />} />
        <Route path="akademisyen/authorize" element={<Authorize />} />
        <Route
          path="akademisyen/pending/evaluate/:id"
          element={<PendingApplicationsEvaluate />}
        />
      </Route>{" "}
    </Routes>
  );
};

export default App;
