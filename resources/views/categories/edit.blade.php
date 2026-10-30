
@extends('layouts.app')

@section('title', 'Edit Category')
@section('heading', 'Edit Category')

@section('content')

<div class="card border-0 shadow-sm">
    <div class="card-body">

        <form action="{{ route('categories.update', $category) }}" method="POST">
            @csrf
            @method('PUT')

            <div class="mb-3">
                <label class="form-label">Category Name *</label>
                <input
                    type="text"
                    name="name"
                    class="form-control"
                    value="{{ old('name', $category->name) }}"
                    required
                >
            </div>

            <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea
                    name="description"
                    class="form-control"
                    rows="4"
                >{{ old('description', $category->description) }}</textarea>
            </div>

            <button type="submit" class="btn btn-dark">Update Category</button>
            <a href="{{ route('categories.index') }}" class="btn btn-secondary">Cancel</a>

        </form>

    </div>
</div>

@endsection
