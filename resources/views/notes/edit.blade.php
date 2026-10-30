
@extends('layouts.app')

@section('title', 'Edit Note')
@section('heading', 'Edit Reading Note')

@section('content')

<div class="card border-0 shadow-sm">
    <div class="card-body">

        <form action="{{ route('notes.update', $note) }}" method="POST">
            @csrf
            @method('PUT')

            <div class="mb-3">
                <label class="form-label">Select Book *</label>

                <select name="book_id" class="form-select" required>
                    @foreach($books as $book)
                        <option value="{{ $book->id }}"
                            @selected(old('book_id', $note->book_id) == $book->id)>
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
                       value="{{ old('title', $note->title) }}">
            </div>

            <div class="mb-3">
                <label class="form-label">Note Content *</label>

                <textarea name="content"
                          class="form-control"
                          rows="8"
                          required>{{ old('content', $note->content) }}</textarea>
            </div>

            <button type="submit" class="btn btn-dark">Update Note</button>
            <a href="{{ route('notes.index') }}" class="btn btn-secondary">Cancel</a>

        </form>

    </div>
</div>

@endsection
