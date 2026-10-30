
@extends('layouts.app')

@section('title', $category->name)
@section('heading', 'Category Details')

@section('content')

<div class="card border-0 shadow-sm mb-4">
    <div class="card-body">
        <h3>{{ $category->name }}</h3>

        <p class="text-muted">
            {{ $category->description ?? 'No description available.' }}
        </p>

        <p>
            <strong>Total Books:</strong> {{ $books->total() }}
        </p>

        <a href="{{ route('categories.edit', $category) }}"
           class="btn btn-warning">Edit Category</a>

        <a href="{{ route('categories.index') }}"
           class="btn btn-secondary">Back</a>
    </div>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-header bg-white py-3">
        <h5 class="mb-0">Books in this Category</h5>
    </div>

    <div class="card-body">
        @if($books->count())
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        @foreach($books as $book)
                            <tr>
                                <td>{{ $book->title }}</td>
                                <td>{{ $book->author }}</td>
                                <td>{{ $book->status }}</td>
                                <td>
                                    <a href="{{ route('books.show', $book) }}"
                                       class="btn btn-sm btn-info">View Book</a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            {{ $books->links() }}
        @else
            <p class="text-muted mb-0">
                There are no books assigned to this category yet.
            </p>
        @endif
    </div>
</div>

@endsection
