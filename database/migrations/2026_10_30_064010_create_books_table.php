<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();

            // Basic book information
            $table->string('title');
            $table->string('author');
            $table->string('isbn', 20)->nullable();

            // Book classification
            $table->foreignId('category_id')
                ->nullable()
                ->constrained('categories')
                ->nullOnDelete();

            // Publication details
            $table->string('publisher')->nullable();
            $table->unsignedSmallInteger('publication_year')->nullable();

            // Additional information
            $table->text('description')->nullable();
            $table->string('cover_image')->nullable();

            // Reading progress
            $table->string('status')->default('Want to Read');
            $table->unsignedTinyInteger('rating')->nullable();
            $table->date('date_started')->nullable();
            $table->date('date_finished')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
