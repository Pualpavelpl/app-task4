import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsersTable } from "../components/table/UsersTable";
import { UsersToolbar } from "../components/toolbar/UsersToolbar";
import { StatusToast } from "../components/common/StatusToast";
import { EmailVerificationBanner } from "../components/common/EmailVerificationBanner";
import {
  getUsers,
  blockUsers,
  unblockUsers,
  deleteUsers,
  deleteUnverifiedUsers,
} from "../api/userApi";

export const UsersPage = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = useState("");
  const verificationLink = localStorage.getItem("verificationLink");
  const currentUserId = Number(localStorage.getItem("userId"));
  const currentUser = users.find((user) => user.id === currentUserId);
  const shouldShowVerificationBanner =
  currentUser?.email_status === "unverified";
  const [selectedIds, setSelectedIds] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const showSuccess = (message) => {
    setToastType("success");
    setToastMessage(message);
  };

  const showError = (message) => {
    setToastType("error");
    setToastMessage(message);
  };

  const logoutToLogin = (message) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    showError(message);

    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  const isCurrentUserSelected = () => {
    const currentUserId = Number(localStorage.getItem("userId"));

    return selectedIds.includes(currentUserId);
  };

  const loadUsers = async () => {
    try {
      const users = await getUsers();

      setUsers(users);
    } catch (error) {
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        logoutToLogin(
          error.response?.data?.message ||
            "Your session is no longer valid. Please sign in again."
        );

        return;
      }

      showError(
        error.response?.data?.message || "Failed to load users"
      );
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const toggleUserSelection = (userId) => {
    setSelectedIds((currentIds) =>
      currentIds.includes(userId)
        ? currentIds.filter((id) => id !== userId)
        : [...currentIds, userId]
    );
  };

  const toggleAllUsers = () => {
    const allUserIds = users.map((user) => user.id);

    setSelectedIds((currentIds) =>
      currentIds.length === users.length ? [] : allUserIds
    );
  };

  const handleBlockUsers = async () => {
    try {
      const shouldLogout = isCurrentUserSelected();

      await blockUsers(selectedIds);

      if (shouldLogout) {
        logoutToLogin(
          "Your account has been blocked. Please sign in again."
        );

        return;
      }

      setSelectedIds([]);
      await loadUsers();

      showSuccess("Users blocked successfully");
    } catch (error) {
      showError(
        error.response?.data?.message || "Failed to block users"
      );
    }
  };

  const handleUnblockUsers = async () => {
    try {
      await unblockUsers(selectedIds);

      setSelectedIds([]);
      await loadUsers();

      showSuccess("Users unblocked successfully");
    } catch (error) {
      showError(
        error.response?.data?.message || "Failed to unblock users"
      );
    }
  };

  const handleDeleteUsers = async () => {
    try {
      const shouldLogout = isCurrentUserSelected();

      await deleteUsers(selectedIds);

      if (shouldLogout) {
        logoutToLogin(
          "Your account has been deleted. Please sign in again."
        );

        return;
      }

      setSelectedIds([]);
      await loadUsers();

      showSuccess("Users deleted successfully");
    } catch (error) {
      showError(
        error.response?.data?.message || "Failed to delete users"
      );
    }
  };

  const handleDeleteUnverifiedUsers = async () => {
    try {
      const currentUserId = Number(localStorage.getItem("userId"));
      const currentUser = users.find((user) => user.id === currentUserId);
      const shouldLogout =
        currentUser?.email_status === "unverified";

      await deleteUnverifiedUsers();

      if (shouldLogout) {
        logoutToLogin(
          "Your account has been deleted. Please sign in again."
        );

        return;
      }

      setSelectedIds([]);
      await loadUsers();

      showSuccess("Unverified users deleted successfully");
    } catch (error) {
      showError(
        error.response?.data?.message ||
          "Failed to delete unverified users"
      );
    }
  };
  const filteredUsers = users.filter((user) => {
    const search = filterText.trim().toLowerCase();
  
    const status = user.is_blocked
      ? "blocked"
      : user.email_status === "unverified"
        ? "unverified"
        : "active";
  
    return (
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      status.includes(search)
    );
  });
  
  console.log("FILTER:", filterText);
  console.log("FILTERED USERS:", filteredUsers);

  
  return (
    <div className="container py-4">
      <StatusToast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage("")}
      />

      <h1 className="mb-4 text-center">Users</h1>

      {shouldShowVerificationBanner && (
        <EmailVerificationBanner
          verificationLink={verificationLink}
        />
      )}

      <UsersToolbar
      selectedIds={selectedIds}
      filterText={filterText}
      onFilterChange={setFilterText}
      onBlock={handleBlockUsers}
      onUnblock={handleUnblockUsers}
      onDelete={handleDeleteUsers}
      onDeleteUnverified={handleDeleteUnverifiedUsers}
      />

      <UsersTable
        users={filteredUsers}
        selectedIds={selectedIds}
        onToggleUser={toggleUserSelection}
        onToggleAll={toggleAllUsers}
      />
    </div>
  );
};