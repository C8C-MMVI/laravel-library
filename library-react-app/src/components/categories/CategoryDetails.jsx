
function CategoryDetails({ category, books, onBack, onEdit }) {
    const categoryBooks = books.filter(
        (book) => book.category_id === category.id
    );

    return (
        <div>
            <button
                className="btn btn-outline-secondary mb-3"
                onClick={onBack}
            >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Categories
            </button>

            <div className="card shadow-sm mb-4">
                <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
                        <div>
                            <div className="category-icon mb-3">
                                <i className="bi bi-bookmarks"></i>
                            </div>

                            <h2>{category.name}</h2>

                            <p className="text-muted mb-2">
                                {category.description || 'No description provided.'}
                            </p>

                            <span className="badge bg-parchment text-wood">
                                {categoryBooks.length} Books
                            </span>
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={() => onEdit(category)}
                        >
                            <i className="bi bi-pencil-square me-2"></i>
                            Edit Category
                        </button>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-body p-4">
                    <h4 className="mb-3">Books in This Category</h4>

                    {categoryBooks.length === 0 ? (
                        <div className="text-center py-4">
                            <i className="bi bi-book empty-icon"></i>
                            <p className="text-muted mt-2 mb-0">
                                No books have been assigned to this category yet.
                            </p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Status</th>
                                        <th>Rating</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {categoryBooks.map((book) => (
                                        <tr key={book.id}>
                                            <td className="fw-semibold">
                                                {book.title}
                                            </td>
                                            <td>{book.author}</td>
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
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CategoryDetails;
