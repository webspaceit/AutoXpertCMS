import { usePage } from '@inertiajs/react';

export function useTranslation() {
    const { props } = usePage();
    const translations = (props.translations as Record<string, string>) || {};
    const locale = (props.locale as string) || 'en';

    const t = (key: string, fallback?: string): string => {
        return translations[key] || fallback || key;
    };

    return { t, locale };
}
