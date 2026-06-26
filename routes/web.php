<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\HomepageSectionController;
use App\Http\Controllers\FooterColumnController;
use App\Http\Controllers\HeroSlideController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Admin Bookings
    Route::get('/dashboard/bookings', [BookingController::class, 'index'])->name('admin.bookings.index');
    Route::patch('/dashboard/bookings/{booking}/status', [BookingController::class, 'updateStatus'])->name('admin.bookings.update-status');
    Route::delete('/dashboard/bookings/{booking}', [BookingController::class, 'destroy'])->name('admin.bookings.destroy');

    // Admin Services
    Route::get('/dashboard/services', [ServiceController::class, 'index'])->name('admin.services.index');
    Route::post('/dashboard/services', [ServiceController::class, 'store'])->name('admin.services.store');
    Route::post('/dashboard/services/reorder', [ServiceController::class, 'reorder'])->name('admin.services.reorder');
    Route::put('/dashboard/services/{service}', [ServiceController::class, 'update'])->name('admin.services.update');
    Route::delete('/dashboard/services/{service}', [ServiceController::class, 'destroy'])->name('admin.services.destroy');

    // Admin Testimonials
    Route::get('/dashboard/testimonials', [TestimonialController::class, 'index'])->name('admin.testimonials.index');
    Route::post('/dashboard/testimonials', [TestimonialController::class, 'store'])->name('admin.testimonials.store');
    Route::post('/dashboard/testimonials/reorder', [TestimonialController::class, 'reorder'])->name('admin.testimonials.reorder');
    Route::put('/dashboard/testimonials/{testimonial}', [TestimonialController::class, 'update'])->name('admin.testimonials.update');
    Route::delete('/dashboard/testimonials/{testimonial}', [TestimonialController::class, 'destroy'])->name('admin.testimonials.destroy');

    // Admin Menus
    Route::get('/dashboard/menus', [MenuController::class, 'index'])->name('admin.menus.index');
    Route::post('/dashboard/menus', [MenuController::class, 'store'])->name('admin.menus.store');
    Route::post('/dashboard/menus/reorder', [MenuController::class, 'reorder'])->name('admin.menus.reorder');
    Route::put('/dashboard/menus/{menu}', [MenuController::class, 'update'])->name('admin.menus.update');
    Route::delete('/dashboard/menus/{menu}', [MenuController::class, 'destroy'])->name('admin.menus.destroy');

    // Admin Settings
    Route::get('/dashboard/settings', [SettingController::class, 'index'])->name('admin.settings.index');
    Route::post('/dashboard/settings', [SettingController::class, 'update'])->name('admin.settings.update');

    // Image upload for TinyMCE
    Route::post('/dashboard/upload-image', [DashboardController::class, 'uploadImage'])->name('admin.upload-image');

    // Admin Homepage Sections
    Route::get('/dashboard/sections', [HomepageSectionController::class, 'index'])->name('admin.sections.index');
    Route::post('/dashboard/sections', [HomepageSectionController::class, 'store'])->name('admin.sections.store');
    Route::post('/dashboard/sections/reorder', [HomepageSectionController::class, 'reorder'])->name('admin.sections.reorder');
    Route::put('/dashboard/sections/{section}', [HomepageSectionController::class, 'update'])->name('admin.sections.update');
    Route::delete('/dashboard/sections/{section}', [HomepageSectionController::class, 'destroy'])->name('admin.sections.destroy');

    // Admin Footer Columns
    Route::get('/dashboard/footer-columns', [FooterColumnController::class, 'index'])->name('admin.footer-columns.index');
    Route::post('/dashboard/footer-columns', [FooterColumnController::class, 'store'])->name('admin.footer-columns.store');
    Route::post('/dashboard/footer-columns/reorder', [FooterColumnController::class, 'reorder'])->name('admin.footer-columns.reorder');
    Route::put('/dashboard/footer-columns/{footerColumn}', [FooterColumnController::class, 'update'])->name('admin.footer-columns.update');
    Route::delete('/dashboard/footer-columns/{footerColumn}', [FooterColumnController::class, 'destroy'])->name('admin.footer-columns.destroy');

    // Admin Hero Slides
    Route::get('/dashboard/hero-slides', [HeroSlideController::class, 'index'])->name('admin.hero-slides.index');
    Route::post('/dashboard/hero-slides', [HeroSlideController::class, 'store'])->name('admin.hero-slides.store');
    Route::post('/dashboard/hero-slides/reorder', [HeroSlideController::class, 'reorder'])->name('admin.hero-slides.reorder');
    Route::put('/dashboard/hero-slides/{heroSlide}', [HeroSlideController::class, 'update'])->name('admin.hero-slides.update');
    Route::delete('/dashboard/hero-slides/{heroSlide}', [HeroSlideController::class, 'destroy'])->name('admin.hero-slides.destroy');
});

require __DIR__.'/settings.php';
