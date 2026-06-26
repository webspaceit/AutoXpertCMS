<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LocaleMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $locale = $request->input('locale');

        if ($locale && in_array($locale, ['en', 'bn'])) {
            session(['locale' => $locale]);
        }

        $activeLocale = session('locale', config('app.locale', 'en'));
        app()->setLocale($activeLocale);

        return $next($request);
    }
}
