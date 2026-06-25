export const StatusToast = ({ message, type, onClose }) => {
    if (!message) {
      return null;
    }
  
    const className =
      type === "error" ? "text-bg-danger" : "text-bg-success";
  
    return (
      <div
        className={`toast show position-fixed top-0 end-0 m-3 ${className}`}
        style={{ zIndex: 1055 }}
        role="alert"
      >
        <div className="d-flex">
          <div className="toast-body">{message}</div>
  
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={onClose}
          />
        </div>
      </div>
    );
  };