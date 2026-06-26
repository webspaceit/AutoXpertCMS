<?php

namespace App\Mail;

use App\Models\Booking;
use App\Models\Setting;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Booking $booking) {}

    public function envelope(): Envelope
    {
        $appName = Setting::where('key', 'app_name')->value('value') ?? config('app.name');
        return new Envelope(
            subject: 'Booking Confirmation — ' . $appName,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mail.booking-confirmation',
        );
    }
}
