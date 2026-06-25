import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/authApi";
import { StatusToast } from "../components/common/StatusToast";

export const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [isLoading, setIsLoading] = useState(false);

  const showError = (message) => {
    setToastType("error");
    setToastMessage(message);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    setToastMessage("");
    setIsLoading(true);

    try {
      const data = await login({ email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);

      navigate("/users");
    } catch (error) {
      showError(error.response?.data?.message || "Login failed");
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
        <div className="card shadow-sm p-4" style={{ width: "380px" }}>
          <h2 className="mb-1 text-center">THE APP</h2>
          <p className="text-muted text-center mb-4">Sign In to The App</p>

          <form onSubmit={handleLogin}>
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
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="text-center mt-3">
            <span className="text-muted">Don't have an account? </span>
            <Link to="/register">Sign up</Link>
          </div>
        </div>
      </div>
    </>
  );
};