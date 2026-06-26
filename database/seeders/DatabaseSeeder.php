<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin User
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@autoxperts.com',
            'password' => bcrypt('password'),
        ]);

        // Seed Services
        \App\Models\Service::create([
            'name_en' => 'Engine Diagnostic & Tuning',
            'name_bn' => 'ইঞ্জিন ডায়াগনস্টিক ও টিউনিং',
            'description_en' => 'Complete health checkup of your engine using advanced OBD scanners followed by precision spark plugs and filter replacement.',
            'description_bn' => 'অ্যাডভান্সড ওবিডি স্ক্যানার ব্যবহার করে আপনার ইঞ্জিনের সম্পূর্ণ হেলথ চেকআপ এবং স্পার্ক প্লাগ ও ফিল্টার পরিবর্তন।',
            'price' => 2500.00,
            'icon' => 'Wrench',
        ]);

        \App\Models\Service::create([
            'name_en' => 'Brake Diagnostics & Repair',
            'name_bn' => 'ব্রেক ডায়াগনস্টিক ও মেরামত',
            'description_en' => 'Brake pad replacement, brake fluid flushing, and rotor resurfacing to ensure maximum safety on the road.',
            'description_bn' => 'রাস্তায় সর্বোচ্চ নিরাপত্তা নিশ্চিত করতে ব্রেক প্যাড পরিবর্তন, ব্রেক ফ্লুইড ফ্লাশিং এবং রটার পুনর্গঠন।',
            'price' => 1500.00,
            'icon' => 'ShieldAlert',
        ]);

        \App\Models\Service::create([
            'name_en' => 'AC Maintenance & Gas Refill',
            'name_bn' => 'এসি রক্ষণাবেক্ষণ ও গ্যাস রিফিল',
            'description_en' => 'Detailed cleaning of AC vents and cooling coils along with high-grade refrigerant refill for absolute cooling.',
            'description_bn' => 'পরম শীতলতা পাওয়ার জন্য এসি ভেন্ট এবং কুলিং কয়েলের বিস্তারিত ক্লিনিং সহ হাই-গ্রেড রেফ্রিজারেন্ট রিফিল।',
            'price' => 3000.00,
            'icon' => 'Wind',
        ]);

        \App\Models\Service::create([
            'name_en' => 'Wheel Alignment & Balancing',
            'name_bn' => 'হুইল অ্যালাইনমেন্ট ও ব্যালেন্সিং',
            'description_en' => 'Laser-guided wheel alignment and precision balancing to extend tire life and improve fuel efficiency.',
            'description_bn' => 'টায়ারের আয়ু বাড়াতে এবং জ্বালানি দক্ষতা উন্নত করতে লেজার-গাইডেড হুইল অ্যালাইনমেন্ট এবং প্রিসিশন ব্যালেন্সিং।',
            'price' => 1200.00,
            'icon' => 'Disc',
        ]);

        // Seed Testimonials
        \App\Models\Testimonial::create([
            'customer_name' => 'Rakib Hasan',
            'rating' => 5,
            'comment_en' => 'Excellent service! They diagnosed my engine issue in minutes and fixed it at a very reasonable cost.',
            'comment_bn' => 'চমৎকার সার্ভিস! তারা কয়েক মিনিটের মধ্যে আমার ইঞ্জিনের সমস্যা সনাক্ত করেছিল এবং খুব কম খরচে এটি সমাধান করেছে।',
        ]);

        \App\Models\Testimonial::create([
            'customer_name' => 'Sarah Rahman',
            'rating' => 4,
            'comment_en' => 'Very professional team and clean workshop. Highly recommended for AC servicing.',
            'comment_bn' => 'খুবই পেশাদার টিম এবং পরিষ্কার ওয়ার্কশপ। এসি সার্ভিসের জন্য অত্যন্ত প্রস্তাবিত।',
        ]);

        // Seed Menus
        \App\Models\Menu::create([
            'label_en' => 'Home',
            'label_bn' => 'হোম',
            'url' => '#',
            'order' => 1,
        ]);

        \App\Models\Menu::create([
            'label_en' => 'Services',
            'label_bn' => 'সেবাসমূহ',
            'url' => '#services',
            'order' => 2,
        ]);

        \App\Models\Menu::create([
            'label_en' => 'About Us',
            'label_bn' => 'আমাদের সম্পর্কে',
            'url' => '#about-us',
            'order' => 3,
        ]);

        \App\Models\Menu::create([
            'label_en' => 'Testimonials',
            'label_bn' => 'গ্রাহকদের মতামত',
            'url' => '#testimonials',
            'order' => 4,
        ]);

        \App\Models\Menu::create([
            'label_en' => 'Contact Us',
            'label_bn' => 'যোগাযোগ',
            'url' => '#contact',
            'order' => 5,
        ]);

        // Seed settings
        $settings = [
            'hero_title_en' => 'Professional Car Servicing & Diagnostics',
            'hero_title_bn' => 'পেশাদার গাড়ি সার্ভিসিং এবং ডায়াগনস্টিকস',
            'hero_subtitle_en' => 'Your trusted partner for engine tuning, brake repairs, AC checkups, and precision wheel alignment in Dhaka.',
            'hero_subtitle_bn' => 'ঢাকাতে ইঞ্জিন টিউনিং, ব্রেক মেরামত, এসি চেকআপ এবং প্রিসিশন হুইল অ্যালাইনমেন্টের জন্য আপনার বিশ্বস্ত অংশীদার।',
            'contact_address_en' => 'Tejgaon Industrial Area, Dhaka, Bangladesh',
            'contact_address_bn' => 'তেজগাঁও শিল্প এলাকা, ঢাকা, বাংলাদেশ',
            'contact_phone' => '+880 1711-223344',
            'contact_email' => 'info@autoxperts.com',
            'contact_hours_en' => 'Sat - Thu: 9:00 AM - 6:00 PM (Friday Closed)',
            'contact_hours_bn' => 'শনি - বৃহস্পতি: সকাল ৯:০০ - সন্ধ্যা ৬:০০ (শুক্রবার বন্ধ)',
        ];

        foreach ($settings as $key => $value) {
            \App\Models\Setting::create([
                'key' => $key,
                'value' => $value,
            ]);
        }

        // Seed Homepage Sections
        \App\Models\HomepageSection::create([
            'title_en' => 'Our Services',
            'title_bn' => 'আমাদের সেবাসমূহ',
            'slug' => 'services',
            'content_en' => '[System Block]',
            'content_bn' => '[সিস্টেম ব্লক]',
            'order' => 1,
        ]);

        \App\Models\HomepageSection::create([
            'title_en' => 'About Our Workshop',
            'title_bn' => 'আমাদের ওয়ার্কশপ সম্পর্কে',
            'slug' => 'about-us',
            'content_en' => '<p>At Auto Xperts, we are dedicated to providing the highest quality automotive services. Our state-of-the-art facility is equipped with modern diagnostics tools and run by certified mechanics who specialize in handling all vehicle makes and models.</p><p>We pride ourselves on offering transparent pricing, reliable repairs, and unmatched customer service. Your safety and satisfaction are our primary goals.</p>',
            'content_bn' => '<p>অটোএক্সপার্টে আমরা সর্বোচ্চ মানের মোটরগাড়ি সেবা প্রদানে প্রতিশ্রুতিবদ্ধ। আমাদের অত্যাধুনিক ওয়ার্কশপটি আধুনিক ডায়াগনস্টিক সরঞ্জাম দ্বারা সুসজ্জিত এবং আমাদের সার্টিফাইড মেকানিক্সরা যেকোনো ব্র্যান্ড ও মডেলের গাড়ি মেরামতে বিশেষভাবে পারদর্শী।</p><p>আমরা আমাদের স্বচ্ছ মূল্য নির্ধারণ, নির্ভরযোগ্য মেরামত কাজ এবং অতুলনীয় গ্রাহক সেবা নিয়ে গর্বিত। আপনার নিরাপত্তা এবং সন্তুষ্টিই আমাদের প্রধান লক্ষ্য।</p>',
            'order' => 2,
        ]);

        \App\Models\HomepageSection::create([
            'title_en' => 'Customer Testimonials',
            'title_bn' => 'গ্রাহকদের মতামত',
            'slug' => 'testimonials',
            'content_en' => '[System Block]',
            'content_bn' => '[সিস্টেম ব্লক]',
            'order' => 3,
        ]);

        \App\Models\HomepageSection::create([
            'title_en' => 'Contact Us',
            'title_bn' => 'যোগাযোগ',
            'slug' => 'contact',
            'content_en' => '[System Block]',
            'content_bn' => '[সিস্টেম ব্লক]',
            'order' => 4,
        ]);
    }
}
