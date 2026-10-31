
function CategoryCard({ category, onView, onEdit, onDelete }) {
    return (
        <div className="card category-card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="category-icon">
                        <i className="bi bi-bookmarks"></i>
                    </div>

                    <span className="badge bg-parchment text-wood">
                        {category.books_count ?? 0} Books
                    </span>
                </div>

                <h5 className="card-title">
                    {category.name}
                </h5>

                <p className="card-text text-muted flex-grow-1">
                    {category.description || 'No description provided.'}
                </p>

                <div className="d-flex gap-2 mt-3">
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        title="View Category"
                        onClick={() => onView(category)}
                    >
                        <i className="bi bi-eye"></i>
                    </button>

                    <button
                        className="btn btn-sm btn-outline-primary"
                        title="Edit Category"
                        onClick={() => onEdit(category)}
                    >
                        <i className="bi bi-pencil-square"></i>
                    </button>

                    <button
                        className="btn btn-sm btn-outline-danger"
                        title="Delete Category"
                        onClick={() => onDelete(category)}
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CategoryCard;
