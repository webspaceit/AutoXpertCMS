<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Service;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard', [
            'stats' => [
                'total_bookings' => Booking::count(),
                'pending_bookings' => Booking::where('status', 'pending')->count(),
                'confirmed_bookings' => Booking::where('status', 'confirmed')->count(),
                'completed_bookings' => Booking::where('status', 'completed')->count(),
                'total_services' => Service::count(),
                'total_testimonials' => Testimonial::count(),
            ],
            'recent_bookings' => Booking::with('service')
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get(),
        ]);
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'file' => 'required|image|mimes:jpg,jpeg,png,webp,gif|max:5120',
        ]);

        $path = public_path('uploads/content-images');
        if (!is_dir($path)) {
            mkdir($path, 0755, true);
        }

        $file = $request->file('file');
        $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        $file->move($path, $filename);

        return response()->json([
            'location' => '/uploads/content-images/' . $filename,
        ]);
    }
}
