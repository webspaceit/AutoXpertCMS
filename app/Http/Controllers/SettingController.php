<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::pluck('value', 'key');
        return Inertia::render('Admin/Settings', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $rules = [
            'hero_title_en' => 'sometimes|required|string|max:255',
            'hero_title_bn' => 'sometimes|required|string|max:255',
            'hero_subtitle_en' => 'sometimes|required|string',
            'hero_subtitle_bn' => 'sometimes|required|string',
            'hero_badge_en' => 'nullable|string|max:255',
            'hero_badge_bn' => 'nullable|string|max:255',
            'logo_url' => 'nullable|string|max:500',
            'contact_address_en' => 'sometimes|required|string|max:255',
            'contact_address_bn' => 'sometimes|required|string|max:255',
            'contact_phone' => 'sometimes|required|string|max:50',
            'contact_email' => 'sometimes|required|email|max:255',
            'contact_hours_en' => 'sometimes|required|string|max:255',
            'contact_hours_bn' => 'sometimes|required|string|max:255',
            'map_zoom' => 'nullable|integer|min:1|max:21',
            'footer_copyright' => 'nullable|string|max:500',
            'hero_mode' => 'nullable|in:static,slider',
            'hero_interval' => 'nullable|integer|min:2|max:15',
            // Mail settings
            'mail_host'         => 'nullable|string|max:255',
            'mail_port'         => 'nullable|integer',
            'mail_username'     => 'nullable|string|max:255',
            'mail_password'     => 'nullable|string|max:255',
            'mail_encryption'   => 'nullable|in:tls,ssl,starttls,',
            'mail_from_address' => 'nullable|email|max:255',
            'mail_from_name'    => 'nullable|string|max:255',
            'mail_admin_email'  => 'nullable|email|max:255',
        ];

        $typographyFields = ['hero_title_en', 'hero_title_bn', 'hero_badge_en', 'hero_badge_bn', 'hero_subtitle_en', 'hero_subtitle_bn', 'contact_address_en', 'contact_address_bn', 'contact_phone', 'contact_email', 'contact_hours_en', 'contact_hours_bn', 'menu_label_en', 'menu_label_bn', 'footer_copyright'];
        $typographyProps = ['font_family', 'font_size', 'font_weight', 'text_transform', 'font_style', 'text_decoration', 'line_height', 'letter_spacing', 'word_spacing'];
        foreach ($typographyFields as $field) {
            foreach ($typographyProps as $prop) {
                $rules["{$field}_{$prop}"] = 'nullable|string|max:255';
            }
        }

        $validated = $request->validate($rules);

        foreach ($validated as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        // Handle logo upload
        if ($request->hasFile('logo')) {
            $request->validate(['logo' => 'image|mimes:jpg,jpeg,png,webp,svg|max:2048']);
            $path = $request->file('logo')->store('logos', 'public');
            Setting::updateOrCreate(['key' => 'logo'], ['value' => 'storage/' . $path]);
        }

        // Handle logo removal
        if ($request->boolean('remove_logo')) {
            Setting::where('key', 'logo')->delete();
        }

        // Handle favicon upload
        if ($request->hasFile('favicon')) {
            $request->validate(['favicon' => 'image|mimes:jpg,jpeg,png,webp,svg,ico|max:1024']);
            $path = $request->file('favicon')->store('logos', 'public');
            Setting::updateOrCreate(['key' => 'favicon'], ['value' => 'storage/' . $path]);
        }

        // Handle favicon removal
        if ($request->boolean('remove_favicon')) {
            Setting::where('key', 'favicon')->delete();
        }

        return redirect()->back()->with('success', 'Settings updated successfully.');
    }
}
