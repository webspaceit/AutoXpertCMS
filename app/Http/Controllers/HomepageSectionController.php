<?php

namespace App\Http\Controllers;

use App\Models\HomepageSection;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class HomepageSectionController extends Controller
{
    // Admin CRUD Listing
    public function index()
    {
        $sections = HomepageSection::orderBy('order', 'asc')->get();
        return Inertia::render('Admin/HomepageSections', [
            'sections' => $sections
        ]);
    }

    private function extractTypography(array &$validated): void
    {
        $prefixes = ['title_en', 'title_bn'];
        $props = ['font_family', 'font_size', 'font_weight', 'text_transform', 'font_style', 'text_decoration', 'line_height', 'letter_spacing', 'word_spacing'];
        $typography = [];
        foreach ($prefixes as $pref) {
            $entry = [];
            foreach ($props as $prop) {
                $key = "{$pref}_{$prop}";
                if (!empty($validated[$key])) {
                    $entry[$prop] = $validated[$key];
                }
                unset($validated[$key]);
            }
            if (!empty($entry)) {
                $typography[$pref] = $entry;
            }
        }
        $validated['typography'] = !empty($typography) ? $typography : null;
    }

    private function typographyRules(): array
    {
        $rules = [];
        $prefixes = ['title_en', 'title_bn'];
        $props = ['font_family', 'font_size', 'font_weight', 'text_transform', 'font_style', 'text_decoration', 'line_height', 'letter_spacing', 'word_spacing'];
        foreach ($prefixes as $pref) {
            foreach ($props as $prop) {
                $rules["{$pref}_{$prop}"] = 'nullable|string|max:255';
            }
        }
        return $rules;
    }

    public function store(Request $request)
    {
        $rules = array_merge([
            'title_en' => 'required|string|max:255',
            'title_bn' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:homepage_sections,slug',
            'content_en' => 'required|string',
            'content_bn' => 'required|string',
            'order' => 'required|integer',
        ], $this->typographyRules());

        $validated = $request->validate($rules);
        $this->extractTypography($validated);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title_en']);
        } else {
            $validated['slug'] = Str::slug($validated['slug']);
        }

        $count = HomepageSection::where('slug', $validated['slug'])->count();
        if ($count > 0) {
            $validated['slug'] .= '-' . time();
        }

        HomepageSection::create($validated);

        return redirect()->back()->with('success', 'Homepage section created successfully.');
    }

    public function update(Request $request, HomepageSection $section)
    {
        $rules = array_merge([
            'title_en' => 'required|string|max:255',
            'title_bn' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:homepage_sections,slug,' . $section->id,
            'content_en' => 'required|string',
            'content_bn' => 'required|string',
            'order' => 'required|integer',
        ], $this->typographyRules());

        $validated = $request->validate($rules);
        $this->extractTypography($validated);

        $validated['slug'] = Str::slug($validated['slug']);

        $section->update($validated);

        return redirect()->back()->with('success', 'Homepage section updated successfully.');
    }

    // Destroy a section
    public function destroy(HomepageSection $section)
    {
        $section->delete();
        return redirect()->back()->with('success', 'Homepage section deleted successfully.');
    }

    /**
     * Reorder homepage sections.
     */
    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'orders' => 'required|array',
            'orders.*.id' => 'required|exists:homepage_sections,id',
            'orders.*.order' => 'required|integer',
        ]);

        foreach ($validated['orders'] as $item) {
            HomepageSection::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return redirect()->back()->with('success', 'Homepage sections order updated successfully.');
    }
}
