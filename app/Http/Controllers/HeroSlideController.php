<?php

namespace App\Http\Controllers;

use App\Models\HeroSlide;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HeroSlideController extends Controller
{
    public function index()
    {
        $slides = HeroSlide::orderBy('order', 'asc')->get();
        return Inertia::render('Admin/HeroSlides', [
            'slides' => $slides,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'image' => 'required|string|max:500',
            'title_en' => 'required|string|max:255',
            'title_bn' => 'required|string|max:255',
            'subtitle_en' => 'nullable|string',
            'subtitle_bn' => 'nullable|string',
            'button_text_en' => 'nullable|string|max:255',
            'button_text_bn' => 'nullable|string|max:255',
            'order' => 'required|integer|min:0',
        ]);

        HeroSlide::create($validated);

        return redirect()->back()->with('success', 'Hero slide created successfully.');
    }

    public function update(Request $request, HeroSlide $heroSlide)
    {
        $validated = $request->validate([
            'image' => 'required|string|max:500',
            'title_en' => 'required|string|max:255',
            'title_bn' => 'required|string|max:255',
            'subtitle_en' => 'nullable|string',
            'subtitle_bn' => 'nullable|string',
            'button_text_en' => 'nullable|string|max:255',
            'button_text_bn' => 'nullable|string|max:255',
            'order' => 'required|integer|min:0',
        ]);

        // If the image is being replaced, delete the old file from disk
        if ($heroSlide->image !== $validated['image']) {
            $this->deleteImageFile($heroSlide->image);
        }

        $heroSlide->update($validated);

        return redirect()->back()->with('success', 'Hero slide updated successfully.');
    }

    public function destroy(HeroSlide $heroSlide)
    {
        // Delete the physical image file from the server
        $this->deleteImageFile($heroSlide->image);

        $heroSlide->delete();

        return redirect()->back()->with('success', 'Hero slide deleted successfully.');
    }

    /**
     * Delete only the image file for a slide (keeps the slide record).
     */
    public function destroyImage(HeroSlide $heroSlide)
    {
        $this->deleteImageFile($heroSlide->image);

        $heroSlide->update(['image' => '']);

        return redirect()->back()->with('success', 'Image deleted from server.');
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'orders' => 'required|array',
            'orders.*.id' => 'required|integer|exists:hero_slides,id',
            'orders.*.order' => 'required|integer|min:0',
        ]);

        foreach ($request->orders as $item) {
            HeroSlide::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return redirect()->back()->with('success', 'Hero slides reordered successfully.');
    }

    /**
     * Delete the physical image file from the server.
     * Handles both /uploads/content-images/ and storage/ paths.
     */
    private function deleteImageFile(string $imagePath): void
    {
        if (empty($imagePath)) return;

        // Strip leading slash
        $relativePath = ltrim($imagePath, '/');

        $fullPath = public_path($relativePath);

        if (file_exists($fullPath)) {
            unlink($fullPath);
        }
    }
}
