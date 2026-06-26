<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $fillable = ['title_en', 'title_bn', 'slug', 'content_en', 'content_bn'];
}
