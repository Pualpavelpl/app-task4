export const UsersToolbar = ({
  selectedIds,
  filterText,
  onFilterChange,
  onBlock,
  onUnblock,
  onDelete,
  onDeleteUnverified,
}) => {
  const hasSelectedUsers = selectedIds.length > 0;

  return (
    <div className="d-flex gap-2 mb-3">
      <button className="btn btn-outline-primary btn-sm" disabled={!hasSelectedUsers} onClick={onBlock}>
        Block
      </button>

      <button className="btn btn-outline-secondary btn-sm" disabled={!hasSelectedUsers} onClick={onUnblock}>
        Unblock
      </button>

      <button className="btn btn-outline-danger btn-sm" disabled={!hasSelectedUsers} onClick={onDelete}>
        Delete
      </button>

      <button className="btn btn-outline-danger btn-sm" onClick={onDeleteUnverified}>
        Delete unverified
      </button>

      <input
        className="form-control form-control-sm ms-auto"
        style={{ maxWidth: "220px" }}
        placeholder="Filter"
        value={filterText}
        onChange={(event) => onFilterChange(event.target.value)}
      />
    </div>
  );
};