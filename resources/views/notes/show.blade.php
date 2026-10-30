
@extends('layouts.app')

@section('title', 'View Note')
@section('heading', 'Reading Note Details')

@section('content')

<div class="card border-0 shadow-sm">
    <div class="card-body">

        <h3>{{ $note->title ?? 'Untitled Note' }}</h3>

        <p class="text-muted">
            Book:
            <a href="{{ route('books.show', $note->book) }}">
                {{ $note->book->title }}
            </a>
        </p>

        <hr>

        <div style="white-space: pre-wrap;">{{ $note->content }}</div>

        <hr>

        <p class="text-muted">
            Created: {{ $note->created_at->format('M d, Y h:i A') }}
        </p>

        <a href="{{ route('notes.edit', $note) }}"
           class="btn btn-warning">Edit Note</a>

        <a href="{{ route('notes.index') }}"
           class="btn btn-secondary">Back</a>

    </div>
</div>

@endsection
