import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "../api/httpClient";

export const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("Verifying email...");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setMessage("Invalid verification link");
      return;
    }

    const verifyEmail = async () => {
      try {
        await api.get(`/auth/verify-email?token=${token}`);

        setMessage("Email verified successfully");

        // после успеха кидаем на login (или users)
        setTimeout(() => {
          navigate("/login");
        }, 1500);

      } catch (error) {
        setMessage(
          error.response?.data?.message ||
          "Email verification failed"
        );
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card p-4 text-center" style={{ width: "420px" }}>
        <h2>Email Verification</h2>
        <p className="text-muted">{message}</p>
      </div>
    </div>
  );
};