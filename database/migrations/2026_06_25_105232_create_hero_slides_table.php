<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hero_slides', function (Blueprint $table) {
            $table->id();
            $table->string('image');
            $table->string('title_en');
            $table->string('title_bn');
            $table->text('subtitle_en')->nullable();
            $table->text('subtitle_bn')->nullable();
            $table->string('button_text_en')->nullable();
            $table->string('button_text_bn')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hero_slides');
    }
};
