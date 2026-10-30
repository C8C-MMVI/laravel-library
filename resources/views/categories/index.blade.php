
@extends('layouts.app')

@section('title', 'Categories')
@section('heading', 'Book Categories')

@section('content')

<div class="d-flex justify-content-between align-items-center mb-4">
    <p class="text-muted mb-0">Organize your books by category.</p>

    <a href="{{ route('categories.create') }}" class="btn btn-dark">
        + Add Category
    </a>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-body">

        <div class="table-responsive">
            <table class="table table-hover align-middle">
                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Description</th>
                        <th>Total Books</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    @forelse($categories as $category)
                        <tr>
                            <td>{{ $category->name }}</td>
                            <td>{{ $category->description ?? 'No description' }}</td>
                            <td>
                                <span class="badge bg-primary">
                                    {{ $category->books_count }}
                                </span>
                            </td>
                            <td>
                                <a href="{{ route('categories.show', $category) }}"
                                   class="btn btn-sm btn-info">View</a>

                                <a href="{{ route('categories.edit', $category) }}"
                                   class="btn btn-sm btn-warning">Edit</a>

                                <form action="{{ route('categories.destroy', $category) }}"
                                      method="POST" class="d-inline"
                                      onsubmit="return confirm('Delete this category?')">
                                    @csrf
                                    @method('DELETE')

                                    <button type="submit" class="btn btn-sm btn-danger">
                                        Delete
                                    </button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="4" class="text-center text-muted py-4">
                                No categories created yet.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        {{ $categories->links() }}

    </div>
</div>

@endsection
