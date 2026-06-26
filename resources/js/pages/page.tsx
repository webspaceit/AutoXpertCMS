import { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import { 
    Wrench, 
    Globe, 
    ChevronRight,
    MapPin,
    Phone,
    Mail,
    Clock,
    CheckCircle2,
    Loader2,
    X
} from 'lucide-react';

interface MenuItem {
    id: number;
    label_en: string;
    label_bn: string;
    url: string;
    order: number;
}

interface DynamicPage {
    id: number;
    title_en: string;
    title_bn: string;
    slug: string;
    content_en: string;
    content_bn: string;
}

interface FooterColumnItem {
    id: number;
    title_en: string;
    title_bn: string;
    type: 'menu' | 'content';
    content_en: string | null;
    content_bn: string | null;
    order: number;
}

interface Props {
    page: DynamicPage;
    menus?: MenuItem[];
    footer_columns?: FooterColumnItem[];
    settings?: Record<string, string>;
    auth: {
        user: any;
    };
}

export default function PageViewer({ page, menus = [], footer_columns = [], settings = {}, auth }: Props) {
    const { t, locale } = useTranslation();
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const { data, setData, post, processing, errors, reset } = useForm({
        service_id: '' as number | '',
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        car_make: '',
        car_model: '',
        booking_date: '',
        booking_time: '',
        notes: '',
    });

    const switchLanguage = (newLocale: 'en' | 'bn') => {
        router.get(`/page/${page.slug}`, { locale: newLocale }, { preserveState: true });
    };

    const handleBookNow = () => {
        setIsBookingOpen(true);
    };

    const submitBooking = (e: React.FormEvent) => {
        e.preventDefault();
        post('/bookings', {
            onSuccess: () => {
                reset();
                setIsBookingOpen(false);
                setSuccessMessage(t('booking.success'));
                setTimeout(() => setSuccessMessage(''), 5000);
            },
        });
    };

    const title = locale === 'bn' ? page.title_bn : page.title_en;
    const content = locale === 'bn' ? page.content_bn : page.content_en;

    const needsPx = (v: string) => /^-?\d+(\.\d+)?$/.test(v);

    const typographyStyle = (prefix: string, s: Record<string, string>) => {
        const val = (suffix: string) => s[`${prefix}_${suffix}`] || undefined;
        const css: Record<string, string | undefined> = {};
        const keys: [string, string][] = [
            ['fontFamily', 'font_family'],
            ['fontSize', 'font_size'],
            ['fontWeight', 'font_weight'],
            ['textTransform', 'text_transform'],
            ['fontStyle', 'font_style'],
            ['textDecoration', 'text_decoration'],
            ['lineHeight', 'line_height'],
            ['letterSpacing', 'letter_spacing'],
            ['wordSpacing', 'word_spacing'],
        ];
        for (const [cssKey, settingKey] of keys) {
            const v = val(settingKey);
            if (v) css[cssKey] = needsPx(v) && cssKey !== 'lineHeight' ? `${v}px` : v;
        }
        return css;
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-rose-500 selection:text-white dark:bg-slate-950 dark:text-slate-100 flex flex-col justify-between">
            <Head title={`${title} - Auto Xperts`} />

            <div>
                {/* Navigation Header */}
                <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
                    <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                        <Link href="/" className="flex items-center gap-2">
                            <Wrench className="h-6 w-6 text-rose-500" />
                            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Auto <span className="text-rose-500">Xperts</span></span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-6">
                            {menus.map((menu) => (
                                <a
                                    key={menu.id}
                                    href={menu.url.startsWith('#') ? `/${menu.url}` : menu.url}
                                    className="text-sm font-medium text-slate-600 hover:text-rose-500 dark:text-slate-300 dark:hover:text-rose-400"
                                >
                                    {locale === 'bn' ? menu.label_bn : menu.label_en}
                                </a>
                            ))}
                            {auth.user ? (
                                <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-rose-500 dark:text-slate-300 dark:hover:text-rose-400">{t('nav.dashboard')}</Link>
                            ) : (
                                <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-rose-500 dark:text-slate-300 dark:hover:text-rose-400">{t('nav.login')}</Link>
                            )}
                        </nav>

                        <div className="flex items-center gap-4">
                            {/* Language Switcher Button */}
                            <button
                                onClick={() => switchLanguage(locale === 'en' ? 'bn' : 'en')}
                                className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold shadow-sm hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
                            >
                                <Globe className="h-3.5 w-3.5 text-slate-500" />
                                <span>{locale === 'en' ? 'বাংলা' : 'English'}</span>
                            </button>

                            <button
                                onClick={handleBookNow}
                                className="rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-600 transition"
                            >
                                {t('hero.book_now')}
                            </button>
                        </div>
                    </div>
                </header>

                {/* Success Toast Banner */}
                {successMessage && (
                    <div className="fixed bottom-4 right-4 z-50 max-w-md bg-emerald-600 text-white rounded-lg p-4 shadow-xl flex items-start gap-3 border border-emerald-500 transition-all duration-300">
                        <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-semibold">{successMessage}</p>
                        </div>
                    </div>
                )}

                {/* Hero Banner Header for Page */}
                <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-900/20 via-slate-900 to-slate-900 z-0"></div>
                    <div className="container mx-auto px-4 relative z-10 max-w-5xl">
                        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-2">
                            {title}
                        </h1>
                        <div className="h-1 w-12 bg-rose-500 rounded-full mb-4"></div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                            <Link href="/" className="hover:underline hover:text-white">Home</Link>
                            <ChevronRight className="h-3 w-3" />
                            <span className="text-rose-400">{title}</span>
                        </div>
                    </div>
                </section>

                {/* Content paragraphs */}
                <article className="py-16 container mx-auto px-4 max-w-4xl prose prose-rose dark:prose-invert">
                    <div 
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-12 shadow-sm space-y-6"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </article>
            </div>

            {/* Footer */}
            <footer className="bg-slate-900 text-white border-t border-slate-800">
                {footer_columns && footer_columns.length > 0 && (
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {footer_columns.map((col) => (
                            <div key={col.id}>
                                <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
                                    {locale === 'bn' ? col.title_bn : col.title_en}
                                </h4>
                                {col.type === 'content' ? (
                                    <div className="text-slate-400 text-sm space-y-2 leading-relaxed">
                                        {locale === 'bn' ? col.content_bn : col.content_en}
                                    </div>
                                ) : (
                                    <ul className="space-y-2.5">
                                        {menus.map((menu) => (
                                            <li key={menu.id}>
                                                <a
                                                    href={menu.url.startsWith('#') ? `/${menu.url}` : menu.url}
                                                    className="text-slate-400 hover:text-white text-sm transition"
                                                >
                                                    {locale === 'bn' ? menu.label_bn : menu.label_en}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                <div className="border-t border-slate-800 py-8">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400 text-sm">
                        <p style={typographyStyle('footer_copyright', settings)}>{settings.footer_copyright || '© 2026 Auto Xperts Car Servicing CMS. All rights reserved.'}</p>
                    </div>
                </div>
            </footer>

            {/* Booking Appointment Modal */}
            {isBookingOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                    <div className="relative w-full max-w-lg">
                        <button
                            type="button"
                            onClick={() => setIsBookingOpen(false)}
                            className="absolute -top-3 -right-3 z-50 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-500 hover:text-slate-800 transition border border-slate-200"
                            aria-label="Close"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        <div className="max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-950 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{t('booking.title')}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">{t('booking.subtitle')}</p>

                        <form onSubmit={submitBooking} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold mb-1.5 text-slate-600 dark:text-slate-400">{t('booking.name')}</label>
                                <input
                                    type="text"
                                    required
                                    value={data.customer_name}
                                    onChange={(e) => setData('customer_name', e.target.value)}
                                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                />
                                {errors.customer_name && <p className="text-xs text-rose-500 mt-1">{errors.customer_name}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5 text-slate-600 dark:text-slate-400">{t('booking.email')}</label>
                                    <input
                                        type="email"
                                        required
                                        value={data.customer_email}
                                        onChange={(e) => setData('customer_email', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                    />
                                    {errors.customer_email && <p className="text-xs text-rose-500 mt-1">{errors.customer_email}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5 text-slate-600 dark:text-slate-400">{t('booking.phone')}</label>
                                    <input
                                        type="tel"
                                        required
                                        value={data.customer_phone}
                                        onChange={(e) => setData('customer_phone', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                    />
                                    {errors.customer_phone && <p className="text-xs text-rose-500 mt-1">{errors.customer_phone}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5 text-slate-600 dark:text-slate-400">{t('booking.car_make')}</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Toyota"
                                        value={data.car_make}
                                        onChange={(e) => setData('car_make', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                    />
                                    {errors.car_make && <p className="text-xs text-rose-500 mt-1">{errors.car_make}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5 text-slate-600 dark:text-slate-400">{t('booking.car_model')}</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Corolla"
                                        value={data.car_model}
                                        onChange={(e) => setData('car_model', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                    />
                                    {errors.car_model && <p className="text-xs text-rose-500 mt-1">{errors.car_model}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5 text-slate-600 dark:text-slate-400">{t('booking.date')}</label>
                                    <input
                                        type="date"
                                        required
                                        value={data.booking_date}
                                        onChange={(e) => setData('booking_date', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                    />
                                    {errors.booking_date && <p className="text-xs text-rose-500 mt-1">{errors.booking_date}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5 text-slate-600 dark:text-slate-400">{t('booking.time')}</label>
                                    <select
                                        required
                                        value={data.booking_time}
                                        onChange={(e) => setData('booking_time', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                    >
                                        <option value="" disabled>{t('booking.time')}</option>
                                        <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                                        <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                                        <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                                        <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                                    </select>
                                    {errors.booking_time && <p className="text-xs text-rose-500 mt-1">{errors.booking_time}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold mb-1.5 text-slate-600 dark:text-slate-400">{t('booking.notes')}</label>
                                <textarea
                                    rows={2}
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white resize-none"
                                />
                                {errors.notes && <p className="text-xs text-rose-500 mt-1">{errors.notes}</p>}
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsBookingOpen(false)}
                                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex items-center gap-1.5 rounded-lg bg-rose-500 px-5 py-2 text-sm font-semibold text-white hover:bg-rose-600 transition disabled:bg-rose-400"
                                >
                                    {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                                    <span>{processing ? t('booking.submitting') : t('booking.submit')}</span>
                                </button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
