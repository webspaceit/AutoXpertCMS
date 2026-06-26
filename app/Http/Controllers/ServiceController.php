<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    /**
     * Display service management panel (Admin Dashboard).
     */
    public function index()
    {
        return Inertia::render('Admin/Services', [
            'services' => Service::orderBy('order', 'asc')->get(),
        ]);
    }

    /**
     * Store new service.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name_en' => 'required|string|max:191',
            'name_bn' => 'required|string|max:191',
            'description_en' => 'required|string',
            'description_bn' => 'required|string',
            'price' => 'required|numeric|min:0',
            'icon' => 'required|string|max:50',
            'order' => 'nullable|integer',
        ]);

        Service::create($validated);

        return back()->with('success', 'Service created successfully!');
    }

    /**
     * Update existing service.
     */
    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'name_en' => 'required|string|max:191',
            'name_bn' => 'required|string|max:191',
            'description_en' => 'required|string',
            'description_bn' => 'required|string',
            'price' => 'required|numeric|min:0',
            'icon' => 'required|string|max:50',
            'order' => 'nullable|integer',
        ]);

        $service->update($validated);

        return back()->with('success', 'Service updated successfully!');
    }

    /**
     * Delete service.
     */
    public function destroy(Service $service)
    {
        $service->delete();

        return back()->with('success', 'Service deleted successfully!');
    }

    /**
     * Reorder services.
     */
    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'orders' => 'required|array',
            'orders.*.id' => 'required|exists:services,id',
            'orders.*.order' => 'required|integer',
        ]);

        foreach ($validated['orders'] as $item) {
            Service::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return back()->with('success', 'Services order updated successfully!');
    }
}
