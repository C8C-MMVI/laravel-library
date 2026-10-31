
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

function BookForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEditing);
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [imageError, setImageError] = useState(false);

    const [form, setForm] = useState({
        title: '',
        author: '',
        isbn: '',
        category_id: '',
        publisher: '',
        publication_year: '',
        description: '',
        status: 'Want to Read',
        rating: '',
        date_started: '',
        date_finished: '',
        cover_image: '',
    });

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                const categoriesResponse = await api.get('/categories');
                setCategories(categoriesResponse.data.data || []);

                if (isEditing) {
                    const bookResponse = await api.get(`/books/${id}`);
                    const book = bookResponse.data.data;

                    setForm({
                        title: book.title || '',
                        author: book.author || '',
                        isbn: book.isbn || '',
                        category_id: book.category_id || '',
                        publisher: book.publisher || '',
                        publication_year: book.publication_year || '',
                        description: book.description || '',
                        status: book.status || 'Want to Read',
                        rating: book.rating || '',
                        date_started: book.date_started || '',
                        date_finished: book.date_finished || '',
                        cover_image: book.cover_image || '',
                    });
                }
            } catch (err) {
                console.error(err);
                setError('Unable to load book information. Please try again.');
            } finally {
                setFetching(false);
            }
        };

        fetchFormData();
    }, [id, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        if (name === 'cover_image') {
            setImageError(false);
        }

        setValidationErrors((previous) => ({
            ...previous,
            [name]: null,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError('');
        setValidationErrors({});

        const payload = {
            ...form,
            category_id: form.category_id || null,
            publication_year: form.publication_year || null,
            rating: form.rating || null,
            date_started: form.date_started || null,
            date_finished: form.date_finished || null,
            isbn: form.isbn || null,
            publisher: form.publisher || null,
            description: form.description || null,
            cover_image: form.cover_image.trim() || null,
        };

        try {
            if (isEditing) {
                await api.put(`/books/${id}`, payload);
            } else {
                await api.post('/books', payload);
            }

            navigate('/books');
        } catch (err) {
            console.error(err);

            if (err.response?.data?.errors) {
                setValidationErrors(err.response.data.errors);
                setError('Please check the highlighted fields.');
            } else {
                setError(
                    err.response?.data?.message ||
                    'Unable to save the book. Please try again.'
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const fieldError = (field) => validationErrors[field]?.[0];

    if (fetching) {
        return <p>Loading book information...</p>;
    }

    return (
        <div>
            <div className="mb-4">
                <button
                    type="button"
                    className="btn btn-outline-secondary mb-3"
                    onClick={() => navigate('/books')}
                >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Books
                </button>

                <h2>{isEditing ? 'Edit Book' : 'Add New Book'}</h2>

                <p className="page-description">
                    {isEditing
                        ? 'Update the information about your book.'
                        : 'Add a new story to your personal library.'}
                </p>
            </div>

            {error && (
                <div className="alert alert-danger">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="card shadow-sm mb-4">
                    <div className="card-body p-4">
                        <h4 className="mb-4">Book Information</h4>

                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">
                                    Book Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    className={`form-control ${fieldError('title') ? 'is-invalid' : ''}`}
                                    value={form.title}
                                    onChange={handleChange}
                                    required
                                />
                                {fieldError('title') && (
                                    <div className="invalid-feedback">
                                        {fieldError('title')}
                                    </div>
                                )}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Author *</label>
                                <input
                                    type="text"
                                    name="author"
                                    className={`form-control ${fieldError('author') ? 'is-invalid' : ''}`}
                                    value={form.author}
                                    onChange={handleChange}
                                    required
                                />
                                {fieldError('author') && (
                                    <div className="invalid-feedback">
                                        {fieldError('author')}
                                    </div>
                                )}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">ISBN</label>
                                <input
                                    type="text"
                                    name="isbn"
                                    className="form-control"
                                    value={form.isbn}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Category</label>
                                <select
                                    name="category_id"
                                    className="form-select"
                                    value={form.category_id}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Publisher</label>
                                <input
                                    type="text"
                                    name="publisher"
                                    className="form-control"
                                    value={form.publisher}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">
                                    Publication Year
                                </label>
                                <input
                                    type="number"
                                    name="publication_year"
                                    className="form-control"
                                    value={form.publication_year}
                                    onChange={handleChange}
                                    min="1"
                                    max="9999"
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    className="form-control"
                                    rows="4"
                                    value={form.description}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card shadow-sm mb-4">
                    <div className="card-body p-4">
                        <h4 className="mb-4">Reading Information</h4>

                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">
                                    Reading Status
                                </label>
                                <select
                                    name="status"
                                    className="form-select"
                                    value={form.status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Want to Read">Want to Read</option>
                                    <option value="Currently Reading">Currently Reading</option>
                                    <option value="Completed">Completed</option>
                                    <option value="On Hold">On Hold</option>
                                    <option value="Abandoned">Abandoned</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Rating</label>
                                <select
                                    name="rating"
                                    className="form-select"
                                    value={form.rating}
                                    onChange={handleChange}
                                >
                                    <option value="">No Rating</option>
                                    <option value="1">1 - Poor</option>
                                    <option value="2">2 - Fair</option>
                                    <option value="3">3 - Good</option>
                                    <option value="4">4 - Very Good</option>
                                    <option value="5">5 - Excellent</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Date Started</label>
                                <input
                                    type="date"
                                    name="date_started"
                                    className="form-control"
                                    value={form.date_started}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Date Finished</label>
                                <input
                                    type="date"
                                    name="date_finished"
                                    className="form-control"
                                    value={form.date_finished}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card shadow-sm mb-4">
                    <div className="card-body p-4">
                        <h4 className="mb-3">Book Cover</h4>

                        <label className="form-label">
                            Cover Image URL
                        </label>

                        <input
                            type="url"
                            name="cover_image"
                            className={`form-control ${fieldError('cover_image') ? 'is-invalid' : ''}`}
                            placeholder="https://example.com/book-cover.jpg"
                            value={form.cover_image}
                            onChange={handleChange}
                        />

                        {fieldError('cover_image') && (
                            <div className="invalid-feedback">
                                {fieldError('cover_image')}
                            </div>
                        )}

                        <div className="form-text mb-3">
                            Paste a direct link to your book's cover image.
                            Leave this field empty if you don't have one.
                        </div>

                        {form.cover_image && (
                            <div className="mt-3">
                                <p className="fw-semibold mb-2">
                                    Cover Preview
                                </p>

                                {!imageError ? (
                                    <img
                                        src={form.cover_image}
                                        alt="Book cover preview"
                                        onError={() => setImageError(true)}
                                        style={{
                                            width: '150px',
                                            height: '210px',
                                            objectFit: 'contain',
                                            borderRadius: '8px',
                                            border: '1px solid #DFD1BE',
                                            padding: '5px',
                                            backgroundColor: '#F8F4EC',
                                        }}
                                    />
                                ) : (
                                    <p className="text-danger small mb-0">
                                        <i className="bi bi-exclamation-circle me-2"></i>
                                        Unable to load this image. Please check the URL.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mb-4">
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => navigate('/books')}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading
                            ? 'Saving...'
                            : isEditing
                                ? 'Update Book'
                                : 'Save Book'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BookForm;
