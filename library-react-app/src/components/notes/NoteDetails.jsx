
function NoteDetails({ note, onBack, onEdit }) {
    return (
        <div>
            <button
                className="btn btn-outline-secondary mb-3"
                onClick={onBack}
            >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Notes
            </button>

            <div className="card shadow-sm">
                <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
                        <div>
                            <div className="note-icon mb-3">
                                <i className="bi bi-journal-text"></i>
                            </div>

                            <h2>{note.title || 'Untitled Note'}</h2>

                            <p className="text-muted mb-1">
                                <i className="bi bi-book me-2"></i>
                                {note.book?.title || `Book ID: ${note.book_id}`}
                            </p>

                            <small className="text-muted">
                                Created:{' '}
                                {note.created_at
                                    ? new Date(note.created_at).toLocaleDateString()
                                    : 'Unknown date'}
                            </small>
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={() => onEdit(note)}
                        >
                            <i className="bi bi-pencil-square me-2"></i>
                            Edit Note
                        </button>
                    </div>

                    <hr />

                    <div className="note-content">
                        <h5 className="mb-3">Note Content</h5>

                        <p style={{ whiteSpace: 'pre-wrap' }}>
                            {note.content || 'No content available.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoteDetails;
