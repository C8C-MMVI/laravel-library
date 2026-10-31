
import { useEffect, useState } from 'react';
import api from '../services/api';

function Dashboard() {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [booksResponse, categoriesResponse, notesResponse] =
                    await Promise.all([
                        api.get('/books'),
                        api.get('/categories'),
                        api.get('/notes'),
                    ]);

                setBooks(booksResponse.data.data || []);
                setCategories(categoriesResponse.data.data || []);
                setNotes(notesResponse.data.data || []);
            } catch (err) {
                console.error('Dashboard loading error:', err);
                setError('Unable to load dashboard data. Please check your Laravel server and API.');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const statistics = [
        {
            title: 'Total Books',
            count: books.length,
            icon: 'bi-book-half',
        },
        {
            title: 'Categories',
            count: categories.length,
            icon: 'bi-collection',
        },
        {
            title: 'My Notes',
            count: notes.length,
            icon: 'bi-journal-text',
        },
    ];

    const recentBooks = [...books]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);

    return (
        <div>
            <h2>Welcome to Your Reading Nook</h2>

            <p className="page-description">
                Your little corner of books, stories, and discoveries.
            </p>

            {loading ? (
                <p>Loading your library...</p>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <>
                    <div className="row g-4 mb-4">
                        {statistics.map((item) => (
                            <div className="col-md-4" key={item.title}>
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body d-flex align-items-center gap-3">
                                        <div className="stat-icon">
                                            <i className={`bi ${item.icon}`}></i>
                                        </div>

                                        <div>
                                            <p className="text-muted mb-1">
                                                {item.title}
                                            </p>
                                            <h3 className="mb-0">
                                                {item.count}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h4 className="mb-3">Recently Added Books</h4>

                            {recentBooks.length === 0 ? (
                                <p className="text-muted mb-0">
                                    Your library is still empty. Add your first
                                    book to get started!
                                </p>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table align-middle">
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Author</th>
                                                <th>Status</th>
                                                <th>Date Added</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {recentBooks.map((book) => (
                                                <tr key={book.id}>
                                                    <td>{book.title}</td>
                                                    <td>{book.author}</td>
                                                    <td>
                                                        <span className="badge bg-parchment text-wood">
                                                            {book.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {book.created_at
                                                            ? new Date(book.created_at).toLocaleDateString()
                                                            : '—'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Dashboard;
