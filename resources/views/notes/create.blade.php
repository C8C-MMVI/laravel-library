
@extends('layouts.app')

@section('title', 'Add Note')
@section('heading', 'Create Reading Note')

@section('content')

<div class="card border-0 shadow-sm">
    <div class="card-body">

        <form action="{{ route('notes.store') }}" method="POST">
            @csrf

            <div class="mb-3">
                <label class="form-label">Select Book *</label>

                <select name="book_id" class="form-select" required>
                    <option value="">Choose a book</option>

                    @foreach($books as $book)
                        <option value="{{ $book->id }}"
                            @selected(old('book_id') == $book->id)>
                            {{ $book->title }} — {{ $book->author }}
                        </option>
                    @endforeach
                </select>
            </div>

            <div class="mb-3">
                <label class="form-label">Note Title</label>

                <input type="text"
                       name="title"
                       class="form-control"
                       value="{{ old('title') }}"
                       placeholder="Example: Important Lessons">
            </div>

            <div class="mb-3">
                <label class="form-label">Note Content *</label>

                <textarea name="content"
                          class="form-control"
                          rows="8"
                          placeholder="Write your thoughts here..."
                          required>{{ old('content') }}</textarea>
            </div>

            <button type="submit" class="btn btn-dark">Save Note</button>
            <a href="{{ route('notes.index') }}" class="btn btn-secondary">Cancel</a>

        </form>

    </div>
</div>

@endsection
