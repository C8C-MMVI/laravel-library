
import NoteCard from './NoteCard';

function NoteList({ notes, onView, onEdit, onDelete }) {
    if (notes.length === 0) {
        return (
            <div className="text-center py-5">
                <i className="bi bi-journal-text empty-icon"></i>
                <h5 className="mt-3">No Notes Yet</h5>
                <p className="text-muted">
                    Start keeping track of your thoughts and notes about your books.
                </p>
            </div>
        );
    }

    return (
        <div className="row g-4">
            {notes.map((note) => (
                <div className="col-md-6 col-lg-4" key={note.id}>
                    <NoteCard
                        note={note}
                        onView={onView}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </div>
            ))}
        </div>
    );
}

export default NoteList;
