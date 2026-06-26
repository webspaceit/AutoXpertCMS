<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void {}

    public function boot(): void
    {
        \Illuminate\Support\Facades\Schema::defaultStringLength(191);
        $this->configureDefaults();
        $this->configureMailFromSettings();
    }

    /**
     * Override Laravel mail config from DB settings at runtime.
     */
    protected function configureMailFromSettings(): void
    {
        try {
            if (!\Illuminate\Support\Facades\Schema::hasTable('settings')) return;

            $settings = \App\Models\Setting::whereIn('key', [
                'mail_host', 'mail_port', 'mail_username', 'mail_password',
                'mail_encryption', 'mail_from_address', 'mail_from_name',
            ])->pluck('value', 'key');

            if ($settings->isEmpty()) return;

            config([
                'mail.mailers.smtp.host'       => $settings->get('mail_host', config('mail.mailers.smtp.host')),
                'mail.mailers.smtp.port'       => $settings->get('mail_port', config('mail.mailers.smtp.port')),
                'mail.mailers.smtp.username'   => $settings->get('mail_username', config('mail.mailers.smtp.username')),
                'mail.mailers.smtp.password'   => $settings->get('mail_password', config('mail.mailers.smtp.password')),
                'mail.mailers.smtp.encryption' => $settings->get('mail_encryption', config('mail.mailers.smtp.encryption')),
                'mail.from.address'            => $settings->get('mail_from_address', config('mail.from.address')),
                'mail.from.name'               => $settings->get('mail_from_name', config('mail.from.name')),
                'mail.default'                 => 'smtp',
            ]);
        } catch (\Exception $e) {
            // Silently fail during migrations/install
        }
    }

    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(app()->isProduction());

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)->mixedCase()->letters()->numbers()->symbols()->uncompromised()
            : null,
        );
    }
}
