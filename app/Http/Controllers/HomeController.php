<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Testimonial;
use App\Models\HomepageSection;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('welcome', [
            'services' => Service::orderBy('order', 'asc')->get(),
            'testimonials' => Testimonial::orderBy('order', 'asc')->get(),
            'sections' => HomepageSection::orderBy('order', 'asc')->get(),
        ]);
    }
}
