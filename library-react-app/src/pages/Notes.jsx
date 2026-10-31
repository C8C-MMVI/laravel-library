
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import api from '../services/api';

import NoteList from '../components/notes/NoteList';
import NoteForm from '../components/notes/NoteForm';
import NoteDetails from '../components/notes/NoteDetails';
import DeleteNoteModal from '../components/notes/DeleteNoteModal';

function Notes() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [notes, setNotes] = useState([]);
    const [books, setBooks] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [showForm, setShowForm] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const [saving, setSaving] = useState(false);

    const [deletingNote, setDeletingNote] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError('');

            const [noteResponse, bookResponse] = await Promise.all([
                api.get('/notes'),
                api.get('/books'),
            ]);

            setNotes(noteResponse.data.data || []);
            setBooks(bookResponse.data.data || []);
        } catch (err) {
            console.error(err);
            setError(
                'Unable to load notes. Please check your API connection.'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const selectedNote = notes.find(
        (note) => note.id === Number(id)
    );

    const handleAdd = () => {
        setEditingNote(null);
        setShowForm(true);
    };

    const handleEdit = (note) => {
        setEditingNote(note);
        setShowForm(true);
    };

    const handleSave = async (formData) => {
        try {
            setSaving(true);

            if (editingNote) {
                await api.put(`/notes/${editingNote.id}`, formData);
            } else {
                await api.post('/notes', formData);
            }

            setShowForm(false);
            setEditingNote(null);

            await fetchData();
        } catch (err) {
            console.error(err);
            alert('Unable to save note. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingNote) return;

        try {
            setDeleting(true);

            await api.delete(`/notes/${deletingNote.id}`);

            if (Number(id) === deletingNote.id) {
                navigate('/notes');
            }

            setDeletingNote(null);
            await fetchData();
        } catch (err) {
            console.error(err);
            alert('Unable to delete note. Please try again.');
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return <p>Loading notes...</p>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div>
            {id ? (
                selectedNote ? (
                    <NoteDetails
                        note={selectedNote}
                        onBack={() => navigate('/notes')}
                        onEdit={handleEdit}
                    />
                ) : (
                    <div>
                        <div className="alert alert-warning">
                            Note not found.
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/notes')}
                        >
                            Back to Notes
                        </button>
                    </div>
                )
            ) : (
                <>
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                        <div>
                            <h2>My Notes</h2>
                            <p className="page-description mb-0">
                                Keep your thoughts and important book notes organized.
                            </p>
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={handleAdd}
                        >
                            <i className="bi bi-plus-lg me-2"></i>
                            Add Note
                        </button>
                    </div>

                    <NoteList
                        notes={notes}
                        onView={(note) => navigate(`/notes/${note.id}`)}
                        onEdit={handleEdit}
                        onDelete={setDeletingNote}
                    />
                </>
            )}

            {showForm && (
                <div
                    className="modal d-block"
                    tabIndex="-1"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {editingNote
                                        ? 'Edit Note'
                                        : 'Add New Note'}
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowForm(false)}
                                    disabled={saving}
                                ></button>
                            </div>

                            <div className="modal-body">
                                <NoteForm
                                    note={editingNote}
                                    books={books}
                                    onSubmit={handleSave}
                                    onCancel={() => setShowForm(false)}
                                    saving={saving}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <DeleteNoteModal
                note={deletingNote}
                onConfirm={handleDelete}
                onCancel={() => setDeletingNote(null)}
                deleting={deleting}
            />
        </div>
    );
}

export default Notes;
