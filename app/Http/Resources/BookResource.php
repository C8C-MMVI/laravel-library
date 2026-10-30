<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'author' => $this->author,
            'isbn' => $this->isbn,
            'category_id' => $this->category_id,
            'publisher' => $this->publisher,
            'publication_year' => $this->publication_year,
            'description' => $this->description,
            'status' => $this->status,
            'rating' => $this->rating,
            'date_started' => $this->date_started,
            'date_finished' => $this->date_finished,
        ];
    }
}
