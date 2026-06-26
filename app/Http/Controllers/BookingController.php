<?php

namespace App\Http\Controllers;

use App\Mail\BookingConfirmation;
use App\Mail\BookingNotification;
use App\Models\Booking;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Bookings', [
            'bookings' => Booking::with('service')->orderBy('booking_date', 'desc')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_id'    => 'required|exists:services,id',
            'customer_name'  => 'required|string|max:191',
            'customer_email' => 'required|email|max:191',
            'customer_phone' => 'required|string|max:50',
            'car_make'       => 'required|string|max:100',
            'car_model'      => 'required|string|max:100',
            'booking_date'   => 'required|date|after_or_equal:today',
            'booking_time'   => 'required|string|max:50',
            'notes'          => 'nullable|string|max:1000',
        ]);

        $booking = Booking::create($validated);
        $booking->load('service');

        // Send emails if mail is configured
        $mailHost = Setting::where('key', 'mail_host')->value('value');
        if ($mailHost) {
            try {
                // Confirmation to customer
                Mail::to($booking->customer_email)
                    ->send(new BookingConfirmation($booking));

                // Notification to admin
                $adminEmail = Setting::where('key', 'mail_admin_email')->value('value')
                    ?? Setting::where('key', 'contact_email')->value('value');
                if ($adminEmail) {
                    Mail::to($adminEmail)
                        ->send(new BookingNotification($booking));
                }
            } catch (\Exception $e) {
                // Don't block booking creation if mail fails
                \Illuminate\Support\Facades\Log::error('Booking email failed: ' . $e->getMessage());
            }
        }

        return back()->with('success', 'Booking created successfully!');
    }

    public function updateStatus(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,completed,cancelled',
        ]);

        $booking->update($validated);

        return back()->with('success', 'Booking status updated successfully!');
    }

    public function destroy(Booking $booking)
    {
        $booking->delete();

        return back()->with('success', 'Booking deleted successfully!');
    }
}
