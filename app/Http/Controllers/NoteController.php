<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index()
    {
        $notes = Note::with('book')
            ->latest()
            ->paginate(10);

        return view('notes.index', compact('notes'));
    }

    public function create()
    {
        $books = Book::orderBy('title')->get();

        return view('notes.create', compact('books'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'book_id' => 'required|exists:books,id',
            'title' => 'nullable|string|max:255',
            'content' => 'required|string',
        ]);

        Note::create($validated);

        return redirect()->route('notes.index')
            ->with('success', 'Note added successfully!');
    }

    public function show(Note $note)
    {
        $note->load('book');

        return view('notes.show', compact('note'));
    }

    public function edit(Note $note)
    {
        $books = Book::orderBy('title')->get();

        return view('notes.edit', compact('note', 'books'));
    }

    public function update(Request $request, Note $note)
    {
        $validated = $request->validate([
            'book_id' => 'required|exists:books,id',
            'title' => 'nullable|string|max:255',
            'content' => 'required|string',
        ]);

        $note->update($validated);

        return redirect()->route('notes.index')
            ->with('success', 'Note updated successfully!');
    }

    public function destroy(Note $note)
    {
        $note->delete();

        return redirect()->route('notes.index')
            ->with('success', 'Note deleted successfully!');
    }
}
