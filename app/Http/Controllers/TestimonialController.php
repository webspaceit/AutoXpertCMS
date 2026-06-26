<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    /**
     * Display testimonials listing (Admin Dashboard).
     */
    public function index()
    {
        return Inertia::render('Admin/Testimonials', [
            'testimonials' => Testimonial::orderBy('order', 'asc')->get(),
        ]);
    }

    /**
     * Store feedback.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:191',
            'rating' => 'required|integer|min:1|max:5',
            'comment_en' => 'required|string',
            'comment_bn' => 'required|string',
            'order' => 'nullable|integer',
        ]);

        Testimonial::create($validated);

        return back()->with('success', 'Testimonial created successfully!');
    }

    /**
     * Update feedback.
     */
    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:191',
            'rating' => 'required|integer|min:1|max:5',
            'comment_en' => 'required|string',
            'comment_bn' => 'required|string',
            'order' => 'nullable|integer',
        ]);

        $testimonial->update($validated);

        return back()->with('success', 'Testimonial updated successfully!');
    }

    /**
     * Delete feedback.
     */
    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();

        return back()->with('success', 'Testimonial deleted successfully!');
    }

    /**
     * Reorder testimonials.
     */
    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'orders' => 'required|array',
            'orders.*.id' => 'required|exists:testimonials,id',
            'orders.*.order' => 'required|integer',
        ]);

        foreach ($validated['orders'] as $item) {
            Testimonial::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return back()->with('success', 'Testimonials order updated successfully!');
    }
}
