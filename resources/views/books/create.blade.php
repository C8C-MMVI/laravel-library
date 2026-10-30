
@extends('layouts.app')

@section('title', 'Add Book')
@section('heading', 'Add a New Book')

@section('content')

<div class="card border-0 shadow-sm">
    <div class="card-body">

        <form action="{{ route('books.store') }}" method="POST">
            @csrf

            <div class="row g-3">

                <div class="col-md-6">
                    <label class="form-label">Book Title *</label>
                    <input type="text" name="title" class="form-control"
                           value="{{ old('title') }}" required>
                </div>

                <div class="col-md-6">
                    <label class="form-label">Author *</label>
                    <input type="text" name="author" class="form-control"
                           value="{{ old('author') }}" required>
                </div>

                <div class="col-md-6">
                    <label class="form-label">ISBN</label>
                    <input type="text" name="isbn" class="form-control"
                           value="{{ old('isbn') }}">
                </div>

                <div class="col-md-6">
                    <label class="form-label">Category</label>
                    <select name="category_id" class="form-select">
                        <option value="">Select Category</option>
                        @foreach($categories as $category)
                            <option value="{{ $category->id }}"
                                @selected(old('category_id') == $category->id)>
                                {{ $category->name }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="col-md-6">
                    <label class="form-label">Publisher</label>
                    <input type="text" name="publisher" class="form-control"
                           value="{{ old('publisher') }}">
                </div>

                <div class="col-md-6">
                    <label class="form-label">Publication Year</label>
                    <input type="number" name="publication_year" class="form-control"
                           value="{{ old('publication_year') }}">
                </div>

                <div class="col-md-6">
                    <label class="form-label">Status *</label>
                    <select name="status" class="form-select" required>
                        @foreach(['Want to Read', 'Currently Reading', 'Completed', 'On Hold', 'Abandoned'] as $status)
                            <option value="{{ $status }}"
                                @selected(old('status', 'Want to Read') == $status)>
                                {{ $status }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="col-md-6">
                    <label class="form-label">Rating (1–5)</label>
                    <select name="rating" class="form-select">
                        <option value="">Not rated</option>
                        @for($i = 1; $i <= 5; $i++)
                            <option value="{{ $i }}" @selected(old('rating') == $i)>
                                {{ $i }} / 5
                            </option>
                        @endfor
                    </select>
                </div>

                <div class="col-md-6">
                    <label class="form-label">Date Started</label>
                    <input type="date" name="date_started" class="form-control"
                           value="{{ old('date_started') }}">
                </div>

                <div class="col-md-6">
                    <label class="form-label">Date Finished</label>
                    <input type="date" name="date_finished" class="form-control"
                           value="{{ old('date_finished') }}">
                </div>

                <div class="col-12">
                    <label class="form-label">Description</label>
                    <textarea name="description" class="form-control" rows="4">{{ old('description') }}</textarea>
                </div>

                <div class="mb-3">
                    <label class="form-label">Book Cover Image</label>

                    <div class="alert alert-light border d-flex align-items-start gap-3">
                        <i class="bi bi-image fs-3 text-secondary"></i>

                        <div>
                            <strong>Coming Soon!</strong>
                            <p class="text-muted mb-0 small">
                                Book cover uploads will be available in a future update.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <div class="mt-4">
                <button type="submit" class="btn btn-dark">Save Book</button>
                <a href="{{ route('books.index') }}" class="btn btn-secondary">Cancel</a>
            </div>

        </form>

    </div>
</div>

@endsection
