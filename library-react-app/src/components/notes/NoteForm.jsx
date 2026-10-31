
import { useEffect, useState } from 'react';

function NoteForm({ note, books, onSubmit, onCancel, saving }) {
    const [bookId, setBookId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setBookId(note?.book_id ? String(note.book_id) : '');
        setTitle(note?.title || '');
        setContent(note?.content || '');
        setError('');
    }, [note]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!bookId) {
            setError('Please select a book.');
            return;
        }

        if (!content.trim()) {
            setError('Note content is required.');
            return;
        }

        setError('');

        onSubmit({
            book_id: Number(bookId),
            title: title.trim() || null,
            content: content.trim(),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="mb-3">
                <label className="form-label">Related Book</label>
                <select
                    className="form-select"
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                    required
                >
                    <option value="">Select a book</option>
                    {books.map((book) => (
                        <option key={book.id} value={book.id}>
                            {book.title}
                        </option>
                    ))}
                </select>
                {books.length === 0 && (
                    <small className="text-muted">
                        Add a book to your library before creating a note.
                    </small>
                )}
            </div>

            <div className="mb-3">
                <label className="form-label">Note Title (Optional)</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a note title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={255}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Note Content</label>
                <textarea
                    className="form-control"
                    rows="7"
                    placeholder="Write your thoughts, important points, or favorite passages..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>

            <div className="d-flex justify-content-end gap-2">
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={onCancel}
                    disabled={saving}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saving || books.length === 0}
                >
                    {saving ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Saving...
                        </>
                    ) : (
                        note ? 'Update Note' : 'Save Note'
                    )}
                </button>
            </div>
        </form>
    );
}

export default NoteForm;
