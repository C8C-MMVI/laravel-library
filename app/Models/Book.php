<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Book extends Model
{
    protected $fillable = [
        'title',
        'author',
        'isbn',
        'category_id',
        'publisher',
        'publication_year',
        'description',
        'cover_image',
        'status',
        'rating',
        'date_started',
        'date_finished',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function notes(): HasMany
    {
        return $this->hasMany(Note::class);
    }
    
    protected function casts(): array
    {
        return [
            'date_started' => 'date',
            'date_finished' => 'date',
        ];
    }
}
