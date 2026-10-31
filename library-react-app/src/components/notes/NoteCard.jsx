
function NoteCard({ note, onView, onEdit, onDelete }) {
    const contentPreview = note.content?.length > 120
        ? `${note.content.substring(0, 120)}...`
        : note.content;

    return (
        <div className="card note-card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="note-icon">
                        <i className="bi bi-journal-text"></i>
                    </div>

                    <small className="text-muted">
                        {note.created_at
                            ? new Date(note.created_at).toLocaleDateString()
                            : ''}
                    </small>
                </div>

                <h5 className="card-title">
                    {note.title || 'Untitled Note'}
                </h5>

                <p className="text-muted small mb-2">
                    <i className="bi bi-book me-2"></i>
                    {note.book?.title || `Book ID: ${note.book_id}`}
                </p>

                <p className="card-text flex-grow-1">
                    {contentPreview || 'No content available.'}
                </p>

                <div className="d-flex gap-2 mt-3">
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        title="View Note"
                        onClick={() => onView(note)}
                    >
                        <i className="bi bi-eye"></i>
                    </button>

                    <button
                        className="btn btn-sm btn-outline-primary"
                        title="Edit Note"
                        onClick={() => onEdit(note)}
                    >
                        <i className="bi bi-pencil-square"></i>
                    </button>

                    <button
                        className="btn btn-sm btn-outline-danger"
                        title="Delete Note"
                        onClick={() => onDelete(note)}
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NoteCard;
