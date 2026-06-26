import { getUserStatus } from "../../utils/getUserStatus";

const formatDate = (date) => {
  if (!date) {
    return "Never";
  }

  return new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const UsersTable = ({
  users,
  selectedIds,
  onToggleUser,
  onToggleAll,
}) => {
  const isAllSelected =
    users.length > 0 && selectedIds.length === users.length;

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th style={{ width: "40px" }}>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={onToggleAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Last login</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => {
            const status = getUserStatus(user);
            const isBlocked = user.is_blocked;

            return (
              <tr
                key={user.id}
                className={isBlocked ? "text-muted" : ""}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(user.id)}
                    onChange={() => onToggleUser(user.id)}
                  />
                </td>

                <td
                  className={
                    isBlocked ? "text-decoration-line-through" : ""
                  }
                >
                  {user.name}
                </td>

                <td
                  className={
                    isBlocked ? "text-decoration-line-through" : ""
                  }
                >
                  {user.email}
                </td>

                <td>{status}</td>

                <td>{formatDate(user.last_login_at)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};