<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    // Display all books
    public function index()
    {
        return BookResource::collection(
            Book::with('category')->latest()->get()
        );
    }

    // Store a new book
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'isbn' => 'nullable|string|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'publisher' => 'nullable|string|max:255',
            'publication_year' => 'nullable|integer|min:1000|max:2100',
            'description' => 'nullable|string',
            'status' => 'required|in:Want to Read,Currently Reading,Completed,On Hold,Abandoned',
            'rating' => 'nullable|integer|min:1|max:5',
            'date_started' => 'nullable|date',
            'date_finished' => 'nullable|date|after_or_equal:date_started',
        ]);

        $book = Book::create($validated);

        return (new BookResource($book))
            ->response()
            ->setStatusCode(201);
    }

    // Display a specific book
    public function show(Book $book)
    {
        return new BookResource(
            $book->load('category', 'notes')
        );
    }

    // Update a book
    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'author' => 'sometimes|required|string|max:255',
            'isbn' => 'nullable|string|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'publisher' => 'nullable|string|max:255',
            'publication_year' => 'nullable|integer|min:1000|max:2100',
            'description' => 'nullable|string',
            'status' => 'sometimes|required|in:Want to Read,Currently Reading,Completed,On Hold,Abandoned',
            'rating' => 'nullable|integer|min:1|max:5',
            'date_started' => 'nullable|date',
            'date_finished' => 'nullable|date|after_or_equal:date_started',
        ]);

        $book->update($validated);

        return new BookResource($book);
    }

    // Delete a book
    public function destroy(Book $book)
    {
        $book->delete();

        return response()->json([
            'message' => 'Book deleted successfully.'
        ]);
    }
}
