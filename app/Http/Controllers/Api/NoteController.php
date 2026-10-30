<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\NoteResource;
use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    // Display all notes
    public function index()
    {
        return NoteResource::collection(
            Note::with('book')->latest()->get()
        );
    }

    // Store a new note
    public function store(Request $request)
    {
        $validated = $request->validate([
            'book_id' => 'required|exists:books,id',
            'title' => 'nullable|string|max:255',
            'content' => 'required|string',
        ]);

        $note = Note::create($validated);

        return (new NoteResource($note))
            ->response()
            ->setStatusCode(201);
    }

    // Display one note
    public function show(Note $note)
    {
        return new NoteResource(
            $note->load('book')
        );
    }

    // Update a note
    public function update(Request $request, Note $note)
    {
        $validated = $request->validate([
            'book_id' => 'sometimes|required|exists:books,id',
            'title' => 'nullable|string|max:255',
            'content' => 'sometimes|required|string',
        ]);

        $note->update($validated);

        return new NoteResource(
            $note->load('book')
        );
    }

    // Delete a note
    public function destroy(Note $note)
    {
        $note->delete();

        return response()->json([
            'message' => 'Note deleted successfully.'
        ]);
    }
}
