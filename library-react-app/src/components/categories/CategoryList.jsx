
import CategoryCard from './CategoryCard';

function CategoryList({ categories, onView, onEdit, onDelete }) {
    if (categories.length === 0) {
        return (
            <div className="text-center py-5">
                <i className="bi bi-bookmarks empty-icon"></i>
                <h5 className="mt-3">No Categories Yet</h5>
                <p className="text-muted">
                    Start organizing your library by creating your first category.
                </p>
            </div>
        );
    }

    return (
        <div className="row g-4">
            {categories.map((category) => (
                <div className="col-md-6 col-lg-4" key={category.id}>
                    <CategoryCard
                        category={category}
                        onView={onView}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </div>
            ))}
        </div>
    );
}

export default CategoryList;
