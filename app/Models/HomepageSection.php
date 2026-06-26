<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomepageSection extends Model
{
    protected $fillable = ['title_en', 'title_bn', 'slug', 'content_en', 'content_bn', 'order', 'typography'];

    protected function casts(): array
    {
        return [
            'typography' => 'array',
        ];
    }
}
