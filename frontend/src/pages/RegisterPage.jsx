import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/authApi";
import { StatusToast } from "../components/common/StatusToast";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [verificationLink, setVerificationLink] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [isLoading, setIsLoading] = useState(false);

  const showSuccess = (message) => {
    setToastType("success");
    setToastMessage(message);
  };

  const showError = (message) => {
    setToastType("error");
    setToastMessage(message);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setVerificationLink("");
    setToastMessage("");

    try {
       const data = await register({ name, email, password });

       localStorage.setItem("token", data.token);
       localStorage.setItem("userId", data.user.id);
       localStorage.setItem("verificationLink", data.verificationLink);
       
       navigate("/users");
    } catch (error) {
      showError(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <StatusToast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage("")}
      />

      <div className="container min-vh-100 d-flex align-items-center justify-content-center">
        <div className="card shadow-sm p-4" style={{ width: "420px" }}>
          <h2 className="mb-1 text-center">THE APP</h2>
          <p className="text-muted text-center mb-4">Create account</p>

          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">E-mail</label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <button
              className="btn btn-primary w-100"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Register"}
            </button>
          </form>

          {verificationLink && (
            <div className="alert alert-info mt-3 mb-0">
              <p className="mb-2">Email confirmation link:</p>

              <a
                href={verificationLink}
                target="_blank"
                rel="noreferrer"
              >
                Confirm email
              </a>
            </div>
          )}

          <div className="text-center mt-3">
            <span className="text-muted">Already have an account? </span>
            <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </>
  );
};