
@extends('layouts.app')

@section('title', 'Add Category')
@section('heading', 'Add New Category')

@section('content')

<div class="card border-0 shadow-sm">
    <div class="card-body">

        <form action="{{ route('categories.store') }}" method="POST">
            @csrf

            <div class="mb-3">
                <label class="form-label">Category Name *</label>
                <input
                    type="text"
                    name="name"
                    class="form-control"
                    value="{{ old('name') }}"
                    placeholder="Example: Fiction"
                    required
                >
            </div>

            <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea
                    name="description"
                    class="form-control"
                    rows="4"
                    placeholder="Describe this category..."
                >{{ old('description') }}</textarea>
            </div>

            <button type="submit" class="btn btn-dark">Save Category</button>
            <a href="{{ route('categories.index') }}" class="btn btn-secondary">Cancel</a>

        </form>

    </div>
</div>

@endsection
