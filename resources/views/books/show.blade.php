
@extends('layouts.app')

@section('title', $book->title)
@section('heading', 'Book Details')

@section('content')

<div class="card border-0 shadow-sm">
    <div class="card-body">

        <h3>{{ $book->title }}</h3>
        <p class="text-muted">By {{ $book->author }}</p>

        <hr>

        <p><strong>ISBN:</strong> {{ $book->isbn ?? 'Not provided' }}</p>
        <p><strong>Category:</strong> {{ $book->category?->name ?? 'Uncategorized' }}</p>
        <p><strong>Publisher:</strong> {{ $book->publisher ?? 'Not provided' }}</p>
        <p><strong>Publication Year:</strong> {{ $book->publication_year ?? 'Not provided' }}</p>
        <p><strong>Status:</strong> {{ $book->status }}</p>
        <p><strong>Rating:</strong> {{ $book->rating ? $book->rating . '/5' : 'Not rated' }}</p>
        <p><strong>Date Started:</strong> {{ $book->date_started?->format('M d, Y') ?? 'Not recorded' }}</p>
        <p><strong>Date Finished:</strong> {{ $book->date_finished?->format('M d, Y') ?? 'Not recorded' }}</p>

        <hr>

        <h5>Description</h5>
        <p>{{ $book->description ?? 'No description available.' }}</p>

        <hr>

        <h5>Reading Notes</h5>

        @forelse($book->notes as $note)
            <div class="border rounded p-3 mb-2">
                <strong>{{ $note->title ?? 'Untitled Note' }}</strong>
                <p class="mb-0">{{ $note->content }}</p>
            </div>
        @empty
            <p class="text-muted">No notes for this book yet.</p>
        @endforelse

        <a href="{{ route('books.edit', $book) }}" class="btn btn-warning mt-3">Edit Book</a>
        <a href="{{ route('books.index') }}" class="btn btn-secondary mt-3">Back</a>

    </div>
</div>

@endsection
