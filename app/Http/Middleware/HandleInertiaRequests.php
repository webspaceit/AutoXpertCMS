<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $locale = app()->getLocale();
        $langPath = base_path("lang/{$locale}.json");
        $translations = file_exists($langPath) ? json_decode(file_get_contents($langPath), true) : [];

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'locale' => $locale,
            'translations' => $translations,
        'menus' => \App\Models\Menu::orderBy('order', 'asc')->get(),
        'footer_columns' => \App\Models\FooterColumn::orderBy('order', 'asc')->get(),
        'hero_slides' => \App\Models\HeroSlide::orderBy('order', 'asc')->get(),
        'settings' => \App\Models\Setting::pluck('value', 'key'),
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
