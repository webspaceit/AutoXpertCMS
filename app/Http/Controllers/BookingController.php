<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    /**
     * Display a listing of the bookings (Admin Dashboard).
     */
    public function index()
    {
        return Inertia::render('Admin/Bookings', [
            'bookings' => Booking::with('service')->orderBy('booking_date', 'desc')->get(),
        ]);
    }

    /**
     * Store a newly created booking (Public Form).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'customer_name' => 'required|string|max:191',
            'customer_email' => 'required|email|max:191',
            'customer_phone' => 'required|string|max:50',
            'car_make' => 'required|string|max:100',
            'car_model' => 'required|string|max:100',
            'booking_date' => 'required|date|after_or_equal:today',
            'booking_time' => 'required|string|max:50',
            'notes' => 'nullable|string|max:1000',
        ]);

        Booking::create($validated);

        return back()->with('success', 'Booking created successfully!');
    }

    /**
     * Update the status of a booking (Admin Dashboard).
     */
    public function updateStatus(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,completed,cancelled',
        ]);

        $booking->update($validated);

        return back()->with('success', 'Booking status updated successfully!');
    }

    /**
     * Delete a booking.
     */
    public function destroy(Booking $booking)
    {
        $booking->delete();

        return back()->with('success', 'Booking deleted successfully!');
    }
}
