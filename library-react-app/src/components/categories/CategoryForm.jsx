
import { useEffect, useState } from 'react';

function CategoryForm({ category, onSubmit, onCancel, saving }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setName(category?.name || '');
        setDescription(category?.description || '');
        setError('');
    }, [category]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setError('Category name is required.');
            return;
        }

        setError('');

        onSubmit({
            name: name.trim(),
            description: description.trim() || null,
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
                <label className="form-label">Category Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter category name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Describe this category (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                    disabled={saving}
                >
                    {saving ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Saving...
                        </>
                    ) : (
                        category ? 'Update Category' : 'Save Category'
                    )}
                </button>
            </div>
        </form>
    );
}

export default CategoryForm;
