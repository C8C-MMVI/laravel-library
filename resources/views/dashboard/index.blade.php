
@extends('layouts.app')

@section('title', 'Dashboard - My Library')
@section('heading', 'Dashboard')

@section('content')

<div class="row g-4 mb-4">

    <div class="col-md-3">
        <div class="card stat-card shadow-sm p-3">
            <h6 class="text-muted">Total Books</h6>
            <h2>{{ $totalBooks }}</h2>
        </div>
    </div>

    <div class="col-md-3">
        <div class="card stat-card shadow-sm p-3">
            <h6 class="text-muted">Completed Books</h6>
            <h2>{{ $completedBooks }}</h2>
        </div>
    </div>

    <div class="col-md-3">
        <div class="card stat-card shadow-sm p-3">
            <h6 class="text-muted">Currently Reading</h6>
            <h2>{{ $currentlyReading }}</h2>
        </div>
    </div>

    <div class="col-md-3">
        <div class="card stat-card shadow-sm p-3">
            <h6 class="text-muted">Categories</h6>
            <h2>{{ $totalCategories }}</h2>
        </div>
    </div>

</div>

<div class="card shadow-sm border-0">
    <div class="card-header bg-white py-3">
        <h5 class="mb-0">Recently Added Books</h5>
    </div>

    <div class="card-body">

        @if($recentBooks->count() > 0)

            <div class="table-responsive">
                <table class="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Status</th>
                            <th>Date Added</th>
                        </tr>
                    </thead>

                    <tbody>
                        @foreach($recentBooks as $book)
                            <tr>
                                <td>{{ $book->title }}</td>
                                <td>{{ $book->author }}</td>
                                <td>
                                    <span class="badge bg-primary">
                                        {{ $book->status }}
                                    </span>
                                </td>
                                <td>{{ $book->created_at->format('M d, Y') }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

        @else

            <p class="text-muted mb-0">
                No books added yet. Start building your library!
            </p>

        @endif

        <a href="{{ route('books.index') }}" class="btn btn-dark mt-3">
            View All Books
        </a>

    </div>
</div>

@endsection
