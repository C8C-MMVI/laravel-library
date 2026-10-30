
@extends('layouts.app')

@section('title', 'My Books')
@section('heading', 'Book Collection')

@section('content')

<div class="d-flex justify-content-between align-items-center mb-4">
    <p class="text-muted mb-0">Manage your personal book collection.</p>

    <a href="{{ route('books.create') }}" class="btn btn-dark">
        + Add New Book
    </a>
</div>


<form action="{{ route('books.index') }}" method="GET" class="card card-body border-0 shadow-sm mb-4">
    <div class="row g-3">

        <div class="col-md-4">
            <input
                type="text"
                name="search"
                class="form-control"
                placeholder="Search title, author, ISBN..."
                value="{{ request('search') }}"
            >
        </div>

        <div class="col-md-3">
            <select name="status" class="form-select">
                <option value="">All Statuses</option>

                @foreach(['Want to Read', 'Currently Reading', 'Completed', 'On Hold', 'Abandoned'] as $status)
                    <option value="{{ $status }}"
                        @selected(request('status') == $status)>
                        {{ $status }}
                    </option>
                @endforeach
            </select>
        </div>

        <div class="col-md-3">
            <select name="category_id" class="form-select">
                <option value="">All Categories</option>

                @foreach($categories as $category)
                    <option value="{{ $category->id }}"
                        @selected(request('category_id') == $category->id)>
                        {{ $category->name }}
                    </option>
                @endforeach
            </select>
        </div>

        <div class="col-md-2 d-flex gap-2">
            <button type="submit" class="btn btn-dark">Search</button>
            <a href="{{ route('books.index') }}" class="btn btn-secondary">Reset</a>
        </div>

    </div>
</form>

<div class="card border-0 shadow-sm">
    <div class="card-body">

        <div class="table-responsive">
            <table class="table table-hover align-middle">
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
                    @forelse($books as $book)
                        <tr>
                            <td>{{ $book->title }}</td>
                            <td>{{ $book->author }}</td>
                            <td>{{ $book->category?->name ?? 'Uncategorized' }}</td>
                            <td>
                                <span class="badge bg-primary">
                                    {{ $book->status }}
                                </span>
                            </td>
                            <td>{{ $book->rating ? $book->rating . '/5' : 'Not rated' }}</td>
                            <td>
                                <a href="{{ route('books.show', $book) }}"
                                   class="btn btn-sm btn-info">View</a>

                                <a href="{{ route('books.edit', $book) }}"
                                   class="btn btn-sm btn-warning">Edit</a>

                                <form action="{{ route('books.destroy', $book) }}"
                                      method="POST" class="d-inline"
                                      onsubmit="return confirm('Are you sure you want to delete this book?')">
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
                            <td colspan="6" class="text-center text-muted py-4">
                                No books found. Add your first book!
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        {{ $books->links() }}

    </div>
</div>

@endsection
