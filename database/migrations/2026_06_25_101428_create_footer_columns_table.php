<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('footer_columns', function (Blueprint $table) {
            $table->id();
            $table->string('title_en');
            $table->string('title_bn');
            $table->string('type')->default('menu');
            $table->longText('content_en')->nullable();
            $table->longText('content_bn')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('footer_columns');
    }
};
