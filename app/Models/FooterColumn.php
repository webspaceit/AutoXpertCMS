<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FooterColumn extends Model
{
    protected $fillable = [
        'title_en',
        'title_bn',
        'type',
        'content_en',
        'content_bn',
        'order',
    ];
}
