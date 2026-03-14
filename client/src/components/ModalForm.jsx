import { useEffect } from "react";

function ModalForm({ isOpen, onClose, title, children, btnConfirmText, btnCancelText, onConfirm }) {
  // Bloquear scroll mientras el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal modal-backdrop" style={backdropStyle}>
      <div className="modal-dialog" style={dialogStyle}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            {btnCancelText && (
              <button className="btn btn-secondary" onClick={onClose}>
                {btnCancelText}
              </button>
            )}
            {btnConfirmText && onConfirm && (
              <button className="btn btn-primary" onClick={onConfirm}>
                {btnConfirmText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Estilos inline mínimos
const backdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1050,
};

const dialogStyle = {
  maxWidth: "500px",
  width: "100%",
};

export default ModalForm;