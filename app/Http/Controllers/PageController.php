<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PageController extends Controller
{
    // Admin CRUD Listing
    public function index()
    {
        $pages = Page::orderBy('id', 'desc')->get();
        return Inertia::render('Admin/Pages', [
            'pages' => $pages
        ]);
    }

    // Store a new Page
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title_en' => 'required|string|max:255',
            'title_bn' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:pages,slug',
            'content_en' => 'required|string',
            'content_bn' => 'required|string',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title_en']);
        } else {
            $validated['slug'] = Str::slug($validated['slug']);
        }

        // Double check uniqueness after slugification
        $count = Page::where('slug', $validated['slug'])->count();
        if ($count > 0) {
            $validated['slug'] .= '-' . time();
        }

        Page::create($validated);

        return redirect()->back()->with('success', 'Page created successfully.');
    }

    // Update an existing Page
    public function update(Request $request, Page $page)
    {
        $validated = $request->validate([
            'title_en' => 'required|string|max:255',
            'title_bn' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:pages,slug,' . $page->id,
            'content_en' => 'required|string',
            'content_bn' => 'required|string',
        ]);

        $validated['slug'] = Str::slug($validated['slug']);

        $page->update($validated);

        return redirect()->back()->with('success', 'Page updated successfully.');
    }

    // Destroy a page
    public function destroy(Page $page)
    {
        $page->delete();
        return redirect()->back()->with('success', 'Page deleted successfully.');
    }

    // Public Viewer Page
    public function show($slug)
    {
        $page = Page::where('slug', $slug)->firstOrFail();
        return Inertia::render('page', [
            'page' => $page
        ]);
    }
}
