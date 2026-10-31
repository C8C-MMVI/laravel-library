
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import api from '../services/api';

import CategoryList from '../components/categories/CategoryList';
import CategoryForm from '../components/categories/CategoryForm';
import CategoryDetails from '../components/categories/CategoryDetails';
import DeleteCategoryModal from '../components/categories/DeleteCategoryModal';

function Categories() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [saving, setSaving] = useState(false);

    const [deletingCategory, setDeletingCategory] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError('');

            const [categoryResponse, bookResponse] = await Promise.all([
                api.get('/categories'),
                api.get('/books'),
            ]);

            setCategories(categoryResponse.data.data || []);
            setBooks(bookResponse.data.data || []);
        } catch (err) {
            console.error(err);
            setError('Unable to load categories. Please check your API connection.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const selectedCategory = categories.find(
        (category) => category.id === Number(id)
    );

    const handleAdd = () => {
        setEditingCategory(null);
        setShowForm(true);
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setShowForm(true);
    };

    const handleSave = async (formData) => {
        try {
            setSaving(true);

            if (editingCategory) {
                await api.put(`/categories/${editingCategory.id}`, formData);
            } else {
                await api.post('/categories', formData);
            }

            setShowForm(false);
            setEditingCategory(null);
            await fetchData();
        } catch (err) {
            console.error(err);
            alert('Unable to save category. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingCategory) return;

        try {
            setDeleting(true);

            await api.delete(`/categories/${deletingCategory.id}`);

            if (Number(id) === deletingCategory.id) {
                navigate('/categories');
            }

            setDeletingCategory(null);
            await fetchData();
        } catch (err) {
            console.error(err);
            alert('Unable to delete category. Please try again.');
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return <p>Loading categories...</p>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div>
            {id ? (
                selectedCategory ? (
                    <CategoryDetails
                        category={selectedCategory}
                        books={books}
                        onBack={() => navigate('/categories')}
                        onEdit={handleEdit}
                    />
                ) : (
                    <div>
                        <div className="alert alert-warning">
                            Category not found.
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/categories')}
                        >
                            Back to Categories
                        </button>
                    </div>
                )
            ) : (
                <>
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                        <div>
                            <h2>My Categories</h2>
                            <p className="page-description mb-0">
                                Organize your books into categories.
                            </p>
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={handleAdd}
                        >
                            <i className="bi bi-plus-lg me-2"></i>
                            Add Category
                        </button>
                    </div>

                    <CategoryList
                        categories={categories}
                        onView={(category) =>
                            navigate(`/categories/${category.id}`)
                        }
                        onEdit={handleEdit}
                        onDelete={setDeletingCategory}
                    />
                </>
            )}

            {showForm && (
                <div
                    className="modal d-block"
                    tabIndex="-1"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {editingCategory
                                        ? 'Edit Category'
                                        : 'Add New Category'}
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowForm(false)}
                                    disabled={saving}
                                ></button>
                            </div>

                            <div className="modal-body">
                                <CategoryForm
                                    category={editingCategory}
                                    onSubmit={handleSave}
                                    onCancel={() => setShowForm(false)}
                                    saving={saving}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <DeleteCategoryModal
                category={deletingCategory}
                onConfirm={handleDelete}
                onCancel={() => setDeletingCategory(null)}
                deleting={deleting}
            />
        </div>
    );
}

export default Categories;
