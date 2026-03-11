function ModalForm({ id, title, children, onConfirm, confirmText = "Aceptar" }) {

    return (
        <div className="modal fade" id={id} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    {/* Header */}
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>

                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    {/* Body */}
                    <div className="modal-body">
                        {children}
                    </div>
                    {/* Footer */}

                    <div className="modal-footer">
                        {onConfirm && (
                            <button className="btn btn-danger" onClick={onConfirm} data-bs-dismiss="modal">{confirmText}</button>
                        )}
                        <button className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ModalForm;