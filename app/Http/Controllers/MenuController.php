<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    /**
     * Display menu list (Admin Dashboard).
     */
    public function index()
    {
        return Inertia::render('Admin/Menus', [
            'menus' => Menu::orderBy('order', 'asc')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'label_en' => 'required|string|max:191',
            'label_bn' => 'required|string|max:191',
            'url' => 'required|string|max:191',
            'order' => 'required|integer',
        ]);

        Menu::create($validated);

        return back()->with('success', 'Menu item created successfully!');
    }

    public function update(Request $request, Menu $menu)
    {
        $validated = $request->validate([
            'label_en' => 'required|string|max:191',
            'label_bn' => 'required|string|max:191',
            'url' => 'required|string|max:191',
            'order' => 'required|integer',
        ]);

        $menu->update($validated);

        return back()->with('success', 'Menu item updated successfully!');
    }

    /**
     * Delete menu item.
     */
    public function destroy(Menu $menu)
    {
        $menu->delete();

        return back()->with('success', 'Menu item deleted successfully!');
    }

    /**
     * Reorder menu items.
     */
    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'orders' => 'required|array',
            'orders.*.id' => 'required|exists:menus,id',
            'orders.*.order' => 'required|integer',
        ]);

        foreach ($validated['orders'] as $item) {
            Menu::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return back()->with('success', 'Menu order updated successfully!');
    }
}
