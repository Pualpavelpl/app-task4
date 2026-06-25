import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { UsersPage } from "../pages/UsersPage";
import { VerifyEmailPage } from "../pages/VerifyEmailPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
    </Routes>
  );
};