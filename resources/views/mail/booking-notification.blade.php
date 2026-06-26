<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>New Booking</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f4f4f7; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
        .header { background: #1e293b; padding: 32px 40px; text-align: center; }
        .header h1 { color: #fff; margin: 0; font-size: 22px; }
        .header p { color: #94a3b8; margin: 6px 0 0; font-size: 14px; }
        .body { padding: 32px 40px; }
        .body h2 { font-size: 18px; color: #1e293b; margin: 0 0 8px; }
        .body p { font-size: 14px; color: #475569; margin: 0 0 20px; line-height: 1.6; }
        .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .table th { text-align: left; font-size: 11px; text-transform: uppercase; color: #94a3b8; padding: 8px 12px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; }
        .table td { padding: 10px 12px; font-size: 14px; color: #334155; border-bottom: 1px solid #f1f5f9; }
        .cta { display: inline-block; margin-top: 16px; padding: 12px 24px; background: #e11d48; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px; }
        .footer { background: #f8fafc; padding: 20px 40px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
    </style>
</head>
<body>
<div class="wrapper">
    <div class="header">
        <h1>New Booking Received</h1>
        <p>{{ \App\Models\Setting::where('key','app_name')->value('value') ?? config('app.name') }} — Admin Notification</p>
    </div>
    <div class="body">
        <h2>A new appointment has been submitted.</h2>
        <p>Review the details below and confirm or contact the customer.</p>

        <table class="table">
            <tr><th>Field</th><th>Details</th></tr>
            <tr><td>Customer</td><td>{{ $booking->customer_name }}</td></tr>
            <tr><td>Email</td><td>{{ $booking->customer_email }}</td></tr>
            <tr><td>Phone</td><td>{{ $booking->customer_phone }}</td></tr>
            <tr><td>Service</td><td>{{ $booking->service?->name_en ?? 'N/A' }}</td></tr>
            <tr><td>Date</td><td>{{ \Carbon\Carbon::parse($booking->booking_date)->format('D, d M Y') }}</td></tr>
            <tr><td>Time</td><td>{{ $booking->booking_time }}</td></tr>
            <tr><td>Car</td><td>{{ $booking->car_make }} {{ $booking->car_model }}</td></tr>
            @if($booking->notes)
            <tr><td>Notes</td><td>{{ $booking->notes }}</td></tr>
            @endif
        </table>

        <a href="{{ config('app.url') }}/dashboard/bookings" class="cta">View in Dashboard →</a>
    </div>
    <div class="footer">
        &copy; {{ date('Y') }} {{ \App\Models\Setting::where('key','app_name')->value('value') ?? config('app.name') }}. Admin notification — do not share.
    </div>
</div>
</body>
</html>
