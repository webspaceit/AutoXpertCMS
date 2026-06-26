<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSlide extends Model
{
    protected $fillable = [
        'image',
        'title_en',
        'title_bn',
        'subtitle_en',
        'subtitle_bn',
        'button_text_en',
        'button_text_bn',
        'order',
    ];
}
