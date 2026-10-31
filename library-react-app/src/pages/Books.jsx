
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Books() {
    const navigate = useNavigate();

    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deletingId, setDeletingId] = useState(null);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            setError('');

            const [booksResponse, categoriesResponse] = await Promise.all([
                api.get('/books'),
                api.get('/categories'),
            ]);

            setBooks(booksResponse.data.data || []);
            setCategories(categoriesResponse.data.data || []);
        } catch (err) {
            console.error(err);
            setError('Unable to load books. Please check your API connection.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const getCategoryName = (categoryId) => {
        const category = categories.find(
            (category) => category.id === categoryId
        );

        return category ? category.name : 'Uncategorized';
    };

    const filteredBooks = books.filter((book) => {
        const keyword = search.toLowerCase();

        return (
            book.title?.toLowerCase().includes(keyword) ||
            book.author?.toLowerCase().includes(keyword) ||
            book.isbn?.toLowerCase().includes(keyword)
        );
    });

    const handleDelete = async (id, title) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${title}"?`
        );

        if (!confirmed) return;

        try {
            setDeletingId(id);
            await api.delete(`/books/${id}`);

            setBooks((previousBooks) =>
                previousBooks.filter((book) => book.id !== id)
            );
        } catch (err) {
            console.error(err);
            alert('Unable to delete this book. Please try again.');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                <div>
                    <h2>My Books</h2>
                    <p className="page-description mb-0">
                        Manage and keep track of your book collection.
                    </p>
                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/books/create')}
                >
                    <i className="bi bi-plus-lg me-2"></i>
                    Add New Book
                </button>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <div className="input-group">
                                <span className="input-group-text bg-white">
                                    <i className="bi bi-search"></i>
                                </span>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by title, author, or ISBN..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <p>Loading books...</p>
                    ) : error ? (
                        <div className="alert alert-danger">{error}</div>
                    ) : filteredBooks.length === 0 ? (
                        <p className="text-muted">
                            {search
                                ? 'No books match your search.'
                                : 'No books have been added yet.'}
                        </p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Category</th>
                                        <th>Status</th>
                                        <th>Rating</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredBooks.map((book) => (
                                        <tr key={book.id}>
                                            <td>
                                                <button
                                                    className="book-title-link"
                                                    onClick={() => navigate(`/books/${book.id}`)}
                                                >
                                                    {book.title}
                                                </button>
                                            </td>

                                            <td>{book.author}</td>

                                            <td>
                                                {getCategoryName(book.category_id)}
                                            </td>

                                            <td>
                                                <span className="badge bg-parchment text-wood">
                                                    {book.status}
                                                </span>
                                            </td>

                                            <td>
                                                {book.rating
                                                    ? `${book.rating}/5`
                                                    : '—'}
                                            </td>

                                            <td>
                                                <div className="d-flex gap-2">
                                                    <button
                                                        className="btn btn-sm btn-outline-secondary"
                                                        title="View Book"
                                                        onClick={() => navigate(`/books/${book.id}`)}
                                                    >
                                                        <i className="bi bi-eye"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        title="Edit Book"
                                                        onClick={() =>
                                                            navigate(`/books/${book.id}/edit`)
                                                        }
                                                    >
                                                        <i className="bi bi-pencil-square"></i>
                                                    </button>

                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        title="Delete Book"
                                                        disabled={deletingId === book.id}
                                                        onClick={() =>
                                                            handleDelete(book.id, book.title)
                                                        }
                                                    >
                                                        {deletingId === book.id ? (
                                                            <span className="spinner-border spinner-border-sm"></span>
                                                        ) : (
                                                            <i className="bi bi-trash"></i>
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {!loading && !error && (
                        <p className="text-muted small mb-0">
                            Showing {filteredBooks.length} of {books.length} books
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Books;
