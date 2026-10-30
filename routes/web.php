<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NoteController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $totalBooks = \App\Models\Book::count();

    $completedBooks = \App\Models\Book::where('status', 'Completed')->count();

    $currentlyReading = \App\Models\Book::where('status', 'Currently Reading')->count();

    $totalCategories = \App\Models\Category::count();

    $recentBooks = \App\Models\Book::latest()->take(5)->get();

    return view('dashboard.index', compact(
        'totalBooks',
        'completedBooks',
        'currentlyReading',
        'totalCategories',
        'recentBooks'
    ));
});

Route::resource('books', BookController::class);
Route::resource('categories', CategoryController::class);
Route::resource('notes', NoteController::class);
