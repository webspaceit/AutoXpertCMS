<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_en',
        'name_bn',
        'description_en',
        'description_bn',
        'price',
        'icon',
        'order',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
