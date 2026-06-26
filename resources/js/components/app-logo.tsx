import { usePage } from '@inertiajs/react';
import { Wrench } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    const { settings } = usePage().props as { settings?: Record<string, string> };
    const logoUrl = settings?.logo;

    if (logoUrl) {
        return (
            <div className="flex items-center gap-2">
                <img src={`/${logoUrl}`} alt="Logo" className="h-8 w-auto object-contain" />
            </div>
        );
    }

    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-rose-500 text-white">
                <Wrench className="size-5" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    WSIT Dashboard
                </span>
            </div>
        </>
    );
}
