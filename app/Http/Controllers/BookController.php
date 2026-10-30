<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;

class BookController extends Controller
{
    
public function index(Request $request)
    {
        $query = Book::with('category');

        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                ->orWhere('author', 'like', "%{$search}%")
                ->orWhere('isbn', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        $books = $query->latest()
            ->paginate(10)
            ->withQueryString();

        $categories = Category::orderBy('name')->get();

        return view('books.index', compact(
            'books',
            'categories'
        ));
    }


    public function create()
    {
        $categories = Category::orderBy('name')->get();

        return view('books.create', compact('categories'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'isbn' => 'nullable|string|max:20',
            'category_id' => 'nullable|exists:categories,id',
            'publisher' => 'nullable|string|max:255',
            'publication_year' => 'nullable|integer|min:1|max:2100',
            'description' => 'nullable|string',
            'cover_image' => 'nullable|string|max:255',
            'status' => 'required|in:Want to Read,Currently Reading,Completed,On Hold,Abandoned',
            'rating' => 'nullable|integer|min:1|max:5',
            'date_started' => 'nullable|date',
            'date_finished' => 'nullable|date|after_or_equal:date_started',
        ]);

        Book::create($validated);

        return redirect()->route('books.index')
            ->with('success', 'Book added successfully!');
    }

    public function show(Book $book)
    {
        $book->load(['category', 'notes']);

        return view('books.show', compact('book'));
    }

    public function edit(Book $book)
    {
        $categories = Category::orderBy('name')->get();

        return view('books.edit', compact('book', 'categories'));
    }

    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'isbn' => 'nullable|string|max:20',
            'category_id' => 'nullable|exists:categories,id',
            'publisher' => 'nullable|string|max:255',
            'publication_year' => 'nullable|integer|min:1|max:2100',
            'description' => 'nullable|string',
            'cover_image' => 'nullable|string|max:255',
            'status' => 'required|in:Want to Read,Currently Reading,Completed,On Hold,Abandoned',
            'rating' => 'nullable|integer|min:1|max:5',
            'date_started' => 'nullable|date',
            'date_finished' => 'nullable|date|after_or_equal:date_started',
        ]);

        $book->update($validated);

        return redirect()->route('books.index')
            ->with('success', 'Book updated successfully!');
    }

    public function destroy(Book $book)
    {
        $book->delete();

        return redirect()->route('books.index')
            ->with('success', 'Book deleted successfully!');
    }
}
