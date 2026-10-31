
function DeleteNoteModal({
    note,
    onConfirm,
    onCancel,
    deleting,
}) {
    if (!note) return null;

    return (
        <div
            className="modal d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Confirm Note Deletion
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onCancel}
                            disabled={deleting}
                            aria-label="Close"
                        ></button>
                    </div>

                    <div className="modal-body">
                        <p>
                            Are you sure you want to delete{' '}
                            <strong>
                                {note.title || 'Untitled Note'}
                            </strong>
                            ?
                        </p>

                        <div className="alert alert-warning mb-0">
                            This note will be permanently deleted.
                            The associated book will remain in your library.
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={onCancel}
                            disabled={deleting}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={onConfirm}
                            disabled={deleting}
                        >
                            {deleting ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                    Deleting...
                                </>
                            ) : (
                                'Delete Note'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteNoteModal;
