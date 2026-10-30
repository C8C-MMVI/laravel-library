<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Note extends Model
{
    protected $fillable = [
        'book_id',
        'title',
        'content',
    ];

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }
}
