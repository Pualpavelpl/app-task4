import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../api/httpClient";

export const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Confirming email...");

  useEffect(() => {
    const token = searchParams.get("token");

    api
      .get(`/auth/verify-email?token=${token}`)
      .then(() => {
        setMessage("Email verified successfully.");
      })
      .catch((error) => {
        setMessage(
          error.response?.data?.message ||
            "Failed to verify email."
        );
      });
  }, [searchParams]);

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-sm p-4 text-center" style={{ width: "420px" }}>
        <h2>Email confirmation</h2>
        <p className="text-muted">{message}</p>

        <Link className="btn btn-primary" to="/users">
          Go to users
        </Link>
      </div>
    </div>
  );
};