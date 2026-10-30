
@extends('layouts.app')

@section('title', 'Reading Notes')
@section('heading', 'Reading Notes')

@section('content')

<div class="d-flex justify-content-between align-items-center mb-4">
    <p class="text-muted mb-0">Your thoughts and reading reflections.</p>

    <a href="{{ route('notes.create') }}" class="btn btn-dark">
        + Add Note
    </a>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-body">

        <div class="table-responsive">
            <table class="table table-hover align-middle">
                <thead>
                    <tr>
                        <th>Note Title</th>
                        <th>Book</th>
                        <th>Content Preview</th>
                        <th>Date Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    @forelse($notes as $note)
                        <tr>
                            <td>{{ $note->title ?? 'Untitled Note' }}</td>
                            <td>{{ $note->book->title }}</td>
                            <td>{{ \Illuminate\Support\Str::limit($note->content, 60) }}</td>
                            <td>{{ $note->created_at->format('M d, Y') }}</td>
                            <td>
                                <a href="{{ route('notes.show', $note) }}"
                                   class="btn btn-sm btn-info">View</a>

                                <a href="{{ route('notes.edit', $note) }}"
                                   class="btn btn-sm btn-warning">Edit</a>

                                <form action="{{ route('notes.destroy', $note) }}"
                                      method="POST" class="d-inline"
                                      onsubmit="return confirm('Delete this note?')">
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
                            <td colspan="5" class="text-center text-muted py-4">
                                No reading notes available yet.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        {{ $notes->links() }}

    </div>
</div>

@endsection
