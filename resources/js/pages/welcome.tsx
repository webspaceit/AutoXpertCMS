import { useState, useEffect } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import { toBengaliDigits } from '@/utils/translate';
import {
    Wrench,
    ShieldAlert,
    Wind,
    Disc,
    Calendar,
    Clock,
    Phone,
    Mail,
    MapPin,
    Star,
    CheckCircle2,
    Globe,
    ChevronRight,
    ChevronUp,
    Loader2,
    X
} from 'lucide-react';

interface Service {
    id: number;
    name_en: string;
    name_bn: string;
    description_en: string;
    description_bn: string;
    price: number;
    icon: string;
}

interface Testimonial {
    id: number;
    customer_name: string;
    rating: number;
    comment_en: string;
    comment_bn: string;
}

interface MenuItem {
    id: number;
    label_en: string;
    label_bn: string;
    url: string;
    order: number;
}

interface HomepageSection {
    id: number;
    title_en: string;
    title_bn: string;
    slug: string;
    content_en: string;
    content_bn: string;
    order: number;
    typography?: Record<string, Record<string, string>>;
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
    services: Service[];
    testimonials: Testimonial[];
    auth: {
        user: any;
    };
    menus?: MenuItem[];
    footer_columns?: FooterColumnItem[];
    hero_slides?: HeroSlideItem[];
    settings?: Record<string, string>;
    sections?: HomepageSection[];
}

interface HeroSlideItem {
    id: number;
    image: string;
    title_en: string;
    title_bn: string;
    subtitle_en: string | null;
    subtitle_bn: string | null;
    button_text_en: string | null;
    button_text_bn: string | null;
    order: number;
}

const iconMap: Record<string, any> = {
    Wrench,
    ShieldAlert,
    Wind,
    Disc,
};

const BUILTIN_SECTIONS: HomepageSection[] = [
    { id: -1, slug: 'services', title_en: 'Our Services', title_bn: 'আমাদের সেবা', content_en: '', content_bn: '', order: -3 },
    { id: -2, slug: 'testimonials', title_en: 'Testimonials', title_bn: 'গ্রাহক মতামত', content_en: '', content_bn: '', order: -2 },
    { id: -3, slug: 'contact', title_en: 'Contact Us', title_bn: 'যোগাযোগ', content_en: '', content_bn: '', order: -1 },
];

const mergeSections = (dbSections: HomepageSection[], menus: MenuItem[]): HomepageSection[] => {
    const dbSlugs = new Set(dbSections.map(s => s.slug));
    const builtins = BUILTIN_SECTIONS.filter(b => !dbSlugs.has(b.slug));
    const merged = [...builtins, ...dbSections];

    const menuSlugs = menus
        .filter(m => m.url.startsWith('#'))
        .map(m => m.url.slice(1));

    if (menuSlugs.length > 0) {
        const slugOrder = new Map(menuSlugs.map((slug, i) => [slug, i]));
        merged.sort((a, b) => {
            const aPos = slugOrder.get(a.slug);
            const bPos = slugOrder.get(b.slug);
            if (aPos !== undefined && bPos !== undefined) return aPos - bPos;
            if (aPos !== undefined) return -1;
            if (bPos !== undefined) return 1;
            return a.order - b.order;
        });
    } else {
        merged.sort((a, b) => a.order - b.order);
    }

    return merged.map((item, i) => ({ ...item, order: i + 1 }));
};

const needsPx = (v: string) => /^-?\d+(\.\d+)?$/.test(v);

const typographyStyle = (prefix: string, settings: Record<string, string>) => {
    const val = (suffix: string) => settings[`${prefix}_${suffix}`] || undefined;
    const s: Record<string, string | undefined> = {};
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
        if (v) s[cssKey] = needsPx(v) && cssKey !== 'lineHeight' ? `${v}px` : v;
    }
    return s;
};

const sectionTypographyStyle = (prefix: string, typography: Record<string, Record<string, string>> | undefined) => {
    if (!typography) return {};
    const prefs = typography[prefix];
    if (!prefs) return {};
    const s: Record<string, string | undefined> = {};
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
        const v = prefs[settingKey];
        if (v) s[cssKey] = needsPx(v) && cssKey !== 'lineHeight' ? `${v}px` : v;
    }
    return s;
};

export default function Welcome({ services = [], testimonials = [], auth, menus = [], footer_columns = [], hero_slides = [], settings = {}, sections = [] }: Props) {
    const { t, locale } = useTranslation();
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<number | ''>('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [localSections, setLocalSections] = useState<HomepageSection[]>(() => mergeSections(sections, menus));
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const onScroll = () => setShowScrollTop(window.scrollY > 400);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (settings.hero_mode !== 'slider' || !hero_slides.length) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % hero_slides.length);
        }, (parseInt(settings.hero_interval) || 5) * 1000);
        return () => clearInterval(interval);
    }, [settings.hero_mode, settings.hero_interval, hero_slides.length]);

    useEffect(() => {
        setLocalSections(mergeSections(sections, menus));
    }, [sections, menus]);

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

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const headerOffset = 64;
            const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
            window.scrollTo({ top, behavior: 'smooth' });
            el.setAttribute('tabindex', '-1');
            el.focus({ preventScroll: true });
        }
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
        if (url.startsWith('#')) {
            e.preventDefault();
            scrollToSection(url.slice(1));
        }
    };

    const switchLanguage = (newLocale: 'en' | 'bn') => {
        router.get('/', { locale: newLocale }, { preserveState: true });
    };

    const handleBookNow = (serviceId?: number) => {
        if (serviceId) {
            setData('service_id', serviceId);
            setSelectedService(serviceId);
        }
        setIsBookingOpen(true);
    };

    const submitBooking = (e: React.FormEvent) => {
        e.preventDefault();
        post('/bookings', {
            onSuccess: () => {
                reset();
                setSelectedService('');
                setIsBookingOpen(false);
                setSuccessMessage(t('booking.success'));
                setTimeout(() => setSuccessMessage(''), 5000);
            },
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-rose-500 selection:text-white dark:bg-slate-950 dark:text-slate-100 overflow-x-hidden">
            <Head title="Auto Xperts - Car Servicing CMS" />



            {/* Navigation Header */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                    <a href={settings.logo_url || '#'} target={settings.logo_url ? '_blank' : undefined} rel={settings.logo_url ? 'noopener noreferrer' : undefined} className="flex items-center gap-2">
                        {settings.logo ? (
                            <img src={`/${settings.logo}`} alt="Logo" className="h-8 w-auto object-contain" />
                        ) : (
                            <>
                                <Wrench className="h-6 w-6 text-rose-500 animate-spin" />
                                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Auto <span className="text-rose-500">Xperts</span></span>
                            </>
                        )}
                    </a>

                    <nav className="hidden md:flex items-center gap-6">
                        {menus.map((menu) => (
                            <a
                                key={menu.id}
                                href={menu.url}
                                onClick={(e) => handleNavClick(e, menu.url)}
                                className="text-sm font-medium text-slate-600 hover:text-rose-500 dark:text-slate-300 dark:hover:text-rose-400"
                                style={typographyStyle(locale === 'bn' ? 'menu_label_bn' : 'menu_label_en', settings)}
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
                            onClick={() => handleBookNow()}
                            className="rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-600 transition"
                        >
                            {t('hero.book_now')}
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            {settings.hero_mode === 'slider' && hero_slides.length > 0 ? (
                <section className="relative overflow-hidden bg-slate-900 text-white">
                    {hero_slides.map((slide, i) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-opacity duration-700 ${i === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                            <img
                                src={slide.image}
                                alt={locale === 'bn' ? slide.title_bn : slide.title_en}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-slate-900/70"></div>
                        </div>
                    ))}
                    <div className="relative z-20 py-24 sm:py-32">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
                            {hero_slides.map((slide, i) => (
                                <div key={slide.id} className={`transition-all duration-700 ${i === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'}`}>
                                    {i === currentSlide && (
                                        <>
                                            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
                                                {locale === 'bn' ? slide.title_bn : slide.title_en}
                                            </h1>
                                            {(locale === 'bn' ? slide.subtitle_bn : slide.subtitle_en) && (
                                                <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                                                    {locale === 'bn' ? slide.subtitle_bn : slide.subtitle_en}
                                                </p>
                                            )}
                                            <div className="flex flex-wrap items-center justify-center gap-4">
                                                <button
                                                    onClick={() => handleBookNow()}
                                                    className="rounded-full bg-rose-500 px-8 py-3.5 text-base font-semibold shadow-lg hover:bg-rose-600 transition"
                                                >
                                                    {locale === 'bn' && slide.button_text_bn ? slide.button_text_bn : slide.button_text_en || t('hero.book_now')}
                                                </button>
                                                <a
                                                    href="#services"
                                                    onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
                                                    className="rounded-full bg-white/10 px-8 py-3.5 text-base font-semibold hover:bg-white/20 transition flex items-center gap-1.5"
                                                >
                                                    <span>{t('hero.view_services')}</span>
                                                    <ChevronRight className="h-4 w-4" />
                                                </a>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    {hero_slides.length > 1 && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                            {hero_slides.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentSlide(i)}
                                    className={`w-2.5 h-2.5 rounded-full transition ${i === currentSlide ? 'bg-rose-500 w-6' : 'bg-white/50 hover:bg-white/80'}`}
                                />
                            ))}
                        </div>
                    )}
                </section>
            ) : (
                <section className="relative overflow-hidden bg-slate-900 text-white py-24 sm:py-32">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-900/30 via-slate-900 to-slate-900 z-0"></div>
                    <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
                        <span className="inline-flex items-center rounded-full bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-400 ring-1 ring-inset ring-rose-500/20 mb-4"
                            style={typographyStyle(locale === 'bn' ? 'hero_badge_bn' : 'hero_badge_en', settings)}
                        >
                            {locale === 'bn'
                                ? (settings.hero_badge_bn || 'পেশাদার গাড়ি যত্ন')
                                : (settings.hero_badge_en || 'Professional Car Care')}
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6"
                            style={typographyStyle(locale === 'bn' ? 'hero_title_bn' : 'hero_title_en', settings)}
                        >
                            {locale === 'bn'
                                ? (settings.hero_title_bn || 'পেশাদার গাড়ি সার্ভিসিং এবং ডায়াগনস্টিকস')
                                : (settings.hero_title_en || 'Professional Car Servicing & Diagnostics')}
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10"
                            style={typographyStyle(locale === 'bn' ? 'hero_subtitle_bn' : 'hero_subtitle_en', settings)}
                        >
                            {locale === 'bn'
                                ? (settings.hero_subtitle_bn || 'ঢাকাতে ইঞ্জিন টিউনিং, ব্রেক মেরামত, এসি চেকআপ এবং প্রিসিশন হুইল অ্যালাইনমেন্টের জন্য আপনার বিশ্বস্ত অংশীদার।')
                                : (settings.hero_subtitle_en || 'Your trusted partner for engine tuning, brake repairs, AC checkups, and precision wheel alignment in Dhaka.')}
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <button
                                onClick={() => handleBookNow()}
                                className="rounded-full bg-rose-500 px-8 py-3.5 text-base font-semibold shadow-lg hover:bg-rose-600 transition"
                            >
                                {t('hero.book_now')}
                            </button>
                            <a
                                href="#services"
                                onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
                                className="rounded-full bg-white/10 px-8 py-3.5 text-base font-semibold hover:bg-white/20 transition flex items-center gap-1.5"
                            >
                                <span>{t('hero.view_services')}</span>
                                <ChevronRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </section>
            )}

            {/* Success Toast Banner */}
            {successMessage && (
                <div className="fixed bottom-4 right-4 z-50 max-w-md bg-emerald-600 text-white rounded-lg p-4 shadow-xl flex items-start gap-3 border border-emerald-500 transition-all duration-300">
                    <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold">{successMessage}</p>
                    </div>
                </div>
            )}

            {/* Dynamic Layout Blocks Loop */}
            {localSections.map((section, index) => {
                if (section.slug === 'services') {
                    return (
                        <section key={section.id} id="services" className="py-24 bg-white dark:bg-slate-950 scroll-mt-16 border-b border-slate-100 dark:border-slate-900 last:border-0">
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                                <div className="text-center max-w-3xl mx-auto mb-16">
                                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
                                        {locale === 'bn' ? section.title_bn : section.title_en}
                                    </h2>
                                    <div className="h-1 w-12 bg-rose-500 mx-auto rounded-full mb-4"></div>
                                    <p className="text-lg text-slate-500 dark:text-slate-400">{t('services.subtitle')}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {services.map((service) => {
                                        const IconComponent = iconMap[service.icon] || Wrench;
                                        const name = locale === 'bn' ? service.name_bn : service.name_en;
                                        const desc = locale === 'bn' ? service.description_bn : service.description_en;

                                        return (
                                            <div key={service.id} className="relative group rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:shadow-lg transition">
                                                <div>
                                                    <div className="h-12 w-12 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                                                        <IconComponent className="h-6 w-6" />
                                                    </div>
                                                    <h3 className="text-lg font-bold mb-3">{name}</h3>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{desc}</p>
                                                </div>
                                                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex items-center justify-between mt-auto">
                                                    <div>
                                                        <span className="text-xs text-slate-400 block">{t('services.price')}</span>
                                                        <span className="text-lg font-bold text-rose-500">৳{locale === 'bn' ? toBengaliDigits(service.price) : parseFloat(service.price.toString()).toLocaleString()}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => handleBookNow(service.id)}
                                                        className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1"
                                                    >
                                                        <span>{t('hero.book_now')}</span>
                                                        <ChevronRight className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    );
                }

                if (section.slug === 'testimonials') {
                    return (
                        <section key={section.id} id="testimonials" className="py-24 bg-slate-50 dark:bg-slate-900/50 scroll-mt-16 border-b border-slate-100 dark:border-slate-900 last:border-0">
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                                <div className="text-center max-w-3xl mx-auto mb-16">
                                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
                                        {locale === 'bn' ? section.title_bn : section.title_en}
                                    </h2>
                                    <div className="h-1 w-12 bg-rose-500 mx-auto rounded-full mb-4"></div>
                                    <p className="text-lg text-slate-500 dark:text-slate-400">{t('testimonials.subtitle')}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                    {testimonials.map((testimonial) => {
                                        const comment = locale === 'bn' ? testimonial.comment_bn : testimonial.comment_en;
                                        return (
                                            <div key={testimonial.id} className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                                                <div className="flex gap-1 mb-4 text-amber-400">
                                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                                        <Star key={i} className="h-4 w-4 fill-current" />
                                                    ))}
                                                </div>
                                                <p className="italic text-slate-600 dark:text-slate-300 mb-6">"{comment}"</p>
                                                <div className="font-semibold text-slate-900 dark:text-white">{testimonial.customer_name}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    );
                }

                if (section.slug === 'contact') {
                    return (
                        <section key={section.id} id="contact" className="py-24 bg-white dark:bg-slate-950 scroll-mt-16 border-b border-slate-100 dark:border-slate-900 last:border-0">
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                    <div>
                                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
                                            {locale === 'bn' ? section.title_bn : section.title_en}
                                        </h2>
                                        <div className="h-1 w-12 bg-rose-500 rounded-full mb-6"></div>
                                        <div className="space-y-6">
                                            <div className="flex items-start gap-4">
                                                <div className="h-10 w-10 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                                                    <MapPin className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold">{t('contact.address')}</h4>
                                                    <p className="text-slate-500 dark:text-slate-400"
                                                        style={typographyStyle(locale === 'bn' ? 'contact_address_bn' : 'contact_address_en', settings)}
                                                    >
                                                        {locale === 'bn'
                                                            ? (settings.contact_address_bn || 'তেজগাঁও শিল্প এলাকা, ঢাকা, বাংলাদেশ')
                                                            : (settings.contact_address_en || 'Tejgaon Industrial Area, Dhaka, Bangladesh')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="h-10 w-10 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                                                    <Phone className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold">{t('contact.phone')}</h4>
                                                    <p className="text-slate-500 dark:text-slate-400"
                                                        style={typographyStyle('contact_phone', settings)}
                                                    >
                                                        {settings.contact_phone || '+880 1711-223344'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="h-10 w-10 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                                                    <Mail className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold">{t('contact.email')}</h4>
                                                    <p className="text-slate-500 dark:text-slate-400"
                                                        style={typographyStyle('contact_email', settings)}
                                                    >
                                                        {settings.contact_email || 'info@autoxperts.com'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="h-10 w-10 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                                                    <Clock className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold">{t('contact.hours')}</h4>
                                                    <p className="text-slate-500 dark:text-slate-400"
                                                        style={typographyStyle(locale === 'bn' ? 'contact_hours_bn' : 'contact_hours_en', settings)}
                                                    >
                                                        {locale === 'bn'
                                                            ? (settings.contact_hours_bn || 'শনি - বৃহস্পতি: সকাল ৯:০০ - সন্ধ্যা ৬:০০ (শুক্রবার বন্ধ)')
                                                            : (settings.contact_hours_en || 'Sat - Thu: 9:00 AM - 6:00 PM (Friday Closed)')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-96 rounded-2xl overflow-hidden relative shadow-inner border border-slate-200 dark:border-slate-800">
                                        {(() => {
                                            const addr = settings.contact_address_en || 'Tejgaon, Dhaka';
                                            return (
                                                <iframe
                                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(addr)}&t=&z=${settings.map_zoom || 15}&ie=UTF8&iwloc=A&output=embed`}
                                                    width="100%"
                                                    height="100%"
                                                    style={{ border: 0, pointerEvents: 'none' }}
                                                    allowFullScreen
                                                    loading="lazy"
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                    title="Workshop Location"
                                                    className="absolute inset-0"
                                                    onLoad={(e) => {
                                                        const iframe = e.currentTarget;
                                                        iframe.style.pointerEvents = 'none';
                                                        iframe.parentElement?.addEventListener('click', () => {
                                                            iframe.style.pointerEvents = 'auto';
                                                        });
                                                        iframe.addEventListener('mouseleave', () => {
                                                            iframe.style.pointerEvents = 'none';
                                                        });
                                                    }}
                                                />
                                            );
                                        })()}
                                    </div>
                                </div>
                            </div>
                        </section>
                    );
                }

                // Custom Rich Text Sections
                return (
                    <section
                        key={section.id}
                        id={section.slug}
                        className="py-24 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 last:border-0 scroll-mt-16"
                    >
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white"
                                    style={sectionTypographyStyle(locale === 'bn' ? 'title_bn' : 'title_en', section.typography)}
                                >
                                    {locale === 'bn' ? section.title_bn : section.title_en}
                                </h2>
                                <div className="h-1 w-12 bg-rose-500 mx-auto rounded-full"></div>
                            </div>
                            <div
                                className="rich-text-content text-slate-600 dark:text-slate-300 space-y-6 break-words [&_p]:leading-relaxed [&_p]:text-base sm:[&_p]:text-lg [&_img]:block [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-2xl [&_img]:shadow-md [&_img]:mx-auto [&_img]:my-8 [&_video]:rounded-2xl [&_video]:shadow-md [&_video]:mx-auto [&_video]:my-8 [&_a]:text-rose-500 [&_a]:hover:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-4 [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_code]:break-words"
                                dangerouslySetInnerHTML={{ __html: locale === 'bn' ? section.content_bn : section.content_en }}
                            />
                        </div>
                    </section>
                );
            })}

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
                                                    href={menu.url}
                                                    onClick={(e) => {
                                                        if (menu.url.startsWith('#')) {
                                                            e.preventDefault();
                                                            scrollToSection(menu.url.substring(1));
                                                        }
                                                    }}
                                                    className="text-slate-400 hover:text-white text-sm transition"
                                                >
                                                    {locale === 'bn' ? menu.title_bn : menu.title_en}
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

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-8 right-8 z-40 h-12 w-12 rounded-full bg-rose-500 text-white shadow-lg hover:bg-rose-600 transition flex items-center justify-center"
                    aria-label="Scroll to top"
                >
                    <ChevronUp className="h-5 w-5" />
                </button>
            )}

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
                        <div className="max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-950 p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
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

                            <div>
                                <label className="block text-xs font-semibold mb-1.5 text-slate-600 dark:text-slate-400">{t('booking.service')}</label>
                                <select
                                    required
                                    value={data.service_id}
                                    onChange={(e) => setData('service_id', Number(e.target.value))}
                                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                                >
                                    <option value="" disabled>{t('booking.service')}</option>
                                    {services.map((service) => (
                                        <option key={service.id} value={service.id}>
                                            {locale === 'bn' ? service.name_bn : service.name_en} - ৳{locale === 'bn' ? toBengaliDigits(service.price) : parseFloat(service.price.toString()).toLocaleString()}
                                        </option>
                                    ))}
                                </select>
                                {errors.service_id && <p className="text-xs text-rose-500 mt-1">{errors.service_id}</p>}
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
