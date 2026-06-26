<?php

namespace App\Http\Controllers;

use App\Models\FooterColumn;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FooterColumnController extends Controller
{
    public function index()
    {
        $columns = FooterColumn::orderBy('order', 'asc')->get();
        return Inertia::render('Admin/FooterColumns', [
            'columns' => $columns,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title_en' => 'required|string|max:255',
            'title_bn' => 'required|string|max:255',
            'type' => 'required|in:menu,content',
            'content_en' => 'nullable|string',
            'content_bn' => 'nullable|string',
            'order' => 'required|integer|min:0',
        ]);

        FooterColumn::create($validated);

        return redirect()->back()->with('success', 'Footer column created successfully.');
    }

    public function update(Request $request, FooterColumn $footerColumn)
    {
        $validated = $request->validate([
            'title_en' => 'required|string|max:255',
            'title_bn' => 'required|string|max:255',
            'type' => 'required|in:menu,content',
            'content_en' => 'nullable|string',
            'content_bn' => 'nullable|string',
            'order' => 'required|integer|min:0',
        ]);

        $footerColumn->update($validated);

        return redirect()->back()->with('success', 'Footer column updated successfully.');
    }

    public function destroy(FooterColumn $footerColumn)
    {
        $footerColumn->delete();

        return redirect()->back()->with('success', 'Footer column deleted successfully.');
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'orders' => 'required|array',
            'orders.*.id' => 'required|integer|exists:footer_columns,id',
            'orders.*.order' => 'required|integer|min:0',
        ]);

        foreach ($request->orders as $item) {
            FooterColumn::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return redirect()->back()->with('success', 'Footer columns reordered successfully.');
    }
}
