<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Booking Confirmation</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f4f4f7; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
        .header { background: #e11d48; padding: 32px 40px; text-align: center; }
        .header h1 { color: #fff; margin: 0; font-size: 22px; letter-spacing: -0.5px; }
        .header p { color: #fecdd3; margin: 6px 0 0; font-size: 14px; }
        .body { padding: 32px 40px; }
        .body h2 { font-size: 18px; color: #1e293b; margin: 0 0 8px; }
        .body p { font-size: 14px; color: #475569; margin: 0 0 20px; line-height: 1.6; }
        .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .table th { text-align: left; font-size: 11px; text-transform: uppercase; color: #94a3b8; padding: 8px 12px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; }
        .table td { padding: 10px 12px; font-size: 14px; color: #334155; border-bottom: 1px solid #f1f5f9; }
        .badge { display: inline-block; padding: 4px 10px; background: #fef2f2; color: #e11d48; border-radius: 999px; font-size: 12px; font-weight: 700; }
        .footer { background: #f8fafc; padding: 20px 40px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
    </style>
</head>
<body>
<div class="wrapper">
    <div class="header">
        <h1>{{ \App\Models\Setting::where('key','app_name')->value('value') ?? config('app.name') }}</h1>
        <p>Booking Confirmation</p>
    </div>
    <div class="body">
        <h2>Hi {{ $booking->customer_name }},</h2>
        <p>Thank you for booking with us! Here's a summary of your appointment. We'll confirm it shortly.</p>

        <table class="table">
            <tr><th>Field</th><th>Details</th></tr>
            <tr><td>Service</td><td>{{ $booking->service?->name_en ?? 'N/A' }}</td></tr>
            <tr><td>Date</td><td>{{ \Carbon\Carbon::parse($booking->booking_date)->format('D, d M Y') }}</td></tr>
            <tr><td>Time</td><td>{{ $booking->booking_time }}</td></tr>
            <tr><td>Car</td><td>{{ $booking->car_make }} {{ $booking->car_model }}</td></tr>
            <tr><td>Phone</td><td>{{ $booking->customer_phone }}</td></tr>
            <tr><td>Status</td><td><span class="badge">{{ ucfirst($booking->status) }}</span></td></tr>
            @if($booking->notes)
            <tr><td>Notes</td><td>{{ $booking->notes }}</td></tr>
            @endif
        </table>

        <p>If you have any questions, contact us at <strong>{{ \App\Models\Setting::where('key','contact_phone')->value('value') }}</strong> or reply to this email.</p>
    </div>
    <div class="footer">
        &copy; {{ date('Y') }} {{ \App\Models\Setting::where('key','app_name')->value('value') ?? config('app.name') }}. All rights reserved.<br>
        {{ \App\Models\Setting::where('key','contact_address_en')->value('value') }}
    </div>
</div>
</body>
</html>
