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
        Schema::table('services', function (Blueprint $table) {
            $table->integer('order')->default(0)->after('icon');
        });

        Schema::table('testimonials', function (Blueprint $table) {
            $table->integer('order')->default(0)->after('comment_bn');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn('order');
        });

        Schema::table('testimonials', function (Blueprint $table) {
            $table->dropColumn('order');
        });
    }
};
