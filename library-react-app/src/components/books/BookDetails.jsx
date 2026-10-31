
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

function BookDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState(null);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const [bookResponse, categoryResponse] = await Promise.all([
                    api.get(`/books/${id}`),
                    api.get('/categories'),
                ]);

                const bookData = bookResponse.data.data;
                const categoryData = categoryResponse.data.data || [];

                setBook(bookData);

                const matchedCategory = categoryData.find(
                    (item) => String(item.id) === String(bookData.category_id)
                );

                setCategory(matchedCategory || null);
            } catch (err) {
                console.error(err);
                setError('Unable to load book details.');
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (loading) {
        return <p>Loading book details...</p>;
    }

    if (error || !book) {
        return (
            <div>
                <div className="alert alert-danger">
                    {error || 'Book not found.'}
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/books')}
                >
                    Back to Books
                </button>
            </div>
        );
    }

    const formatDate = (date) => {
        if (!date) return 'Not specified';

        return new Date(`${date}T00:00:00`).toLocaleDateString();
    };

    const getStatusClass = (status) => {
        const statusClasses = {
            'Want to Read': 'bg-parchment text-wood',
            'Currently Reading': 'bg-primary',
            'Completed': 'bg-success',
            'On Hold': 'bg-warning text-dark',
            'Abandoned': 'bg-secondary',
        };

        return statusClasses[status] || 'bg-parchment text-wood';
    };

    return (
        <div>
            <button
                className="btn btn-outline-secondary mb-3"
                onClick={() => navigate('/books')}
            >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Books
            </button>

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                <div>
                    <h2>Book Details</h2>
                    <p className="page-description mb-0">
                        Explore the details of a book in your personal library.
                    </p>
                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/books/${book.id}/edit`)}
                >
                    <i className="bi bi-pencil-square me-2"></i>
                    Edit Book
                </button>
            </div>

            {/* Main Book Profile */}
            <div className="card shadow-sm mb-4">
                <div className="card-body p-4">
                    <div className="row g-4 align-items-start">

                        {/* Book Cover */}
                        <div className="col-md-3 text-center">
                            {book.cover_image && !imageError ? (
                                <img
                                    src={book.cover_image}
                                    alt={`Cover of ${book.title}`}
                                    onError={() => setImageError(true)}
                                    className="img-fluid shadow-sm"
                                    style={{
                                        width: '100%',
                                        maxWidth: '220px',
                                        height: '310px',
                                        objectFit: 'contain',
                                        borderRadius: '8px',
                                        backgroundColor: '#F8F4EC',
                                        padding: '5px',
                                    }}
                                />
                            ) : (
                                <div
                                    className="d-flex flex-column justify-content-center align-items-center mx-auto"
                                    style={{
                                        width: '100%',
                                        maxWidth: '220px',
                                        height: '310px',
                                        backgroundColor: '#E9DDC9',
                                        color: '#76513C',
                                        borderRadius: '8px',
                                        border: '1px solid #DFD1BE',
                                    }}
                                >
                                    <i className="bi bi-book-half fs-1 mb-3"></i>
                                    <strong>No Cover Available</strong>
                                    <small className="mt-1">
                                        Add an image URL
                                    </small>
                                </div>
                            )}
                        </div>

                        {/* Book Information */}
                        <div className="col-md-9">
                            <h2 className="mb-2">{book.title}</h2>

                            <h5 className="text-wood mb-3">
                                by {book.author}
                            </h5>

                            <div className="d-flex flex-wrap gap-2 mb-4">
                                <span className={`badge fs-6 ${getStatusClass(book.status)}`}>
                                    {book.status}
                                </span>

                                {category && (
                                    <span className="badge bg-parchment text-wood fs-6">
                                        {category.name}
                                    </span>
                                )}
                            </div>

                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <strong>Rating</strong>
                                    <p className="mb-0">
                                        {book.rating
                                            ? (
                                                <>
                                                    <i className="bi bi-star-fill text-warning me-1"></i>
                                                    {book.rating}/5
                                                </>
                                            )
                                            : 'Not rated'}
                                    </p>
                                </div>

                                <div className="col-sm-6">
                                    <strong>Publisher</strong>
                                    <p className="mb-0">
                                        {book.publisher || 'Not specified'}
                                    </p>
                                </div>

                                <div className="col-sm-6">
                                    <strong>Publication Year</strong>
                                    <p className="mb-0">
                                        {book.publication_year || 'Not specified'}
                                    </p>
                                </div>

                                <div className="col-sm-6">
                                    <strong>ISBN</strong>
                                    <p className="mb-0">
                                        {book.isbn || 'Not specified'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Book Description */}
            <div className="card shadow-sm mb-4">
                <div className="card-body p-4">
                    <h4 className="mb-3">
                        <i className="bi bi-journal-text me-2"></i>
                        Book Description
                    </h4>

                    <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                        {book.description || 'No description provided.'}
                    </p>
                </div>
            </div>

            {/* Reading Information */}
            <div className="card shadow-sm mb-4">
                <div className="card-body p-4">
                    <h4 className="mb-3">
                        <i className="bi bi-bookmark-check me-2"></i>
                        Reading Information
                    </h4>

                    <div className="row g-3">
                        <div className="col-md-4">
                            <strong>Date Started</strong>
                            <p className="mb-0">
                                {formatDate(book.date_started)}
                            </p>
                        </div>

                        <div className="col-md-4">
                            <strong>Date Finished</strong>
                            <p className="mb-0">
                                {formatDate(book.date_finished)}
                            </p>
                        </div>

                        <div className="col-md-4">
                            <strong>Date Added</strong>
                            <p className="mb-0">
                                {book.created_at
                                    ? new Date(book.created_at).toLocaleDateString()
                                    : 'Not available'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default BookDetails;
