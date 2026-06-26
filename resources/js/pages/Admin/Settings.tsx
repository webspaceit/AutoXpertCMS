import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Save, Loader2, Settings as SettingsIcon, Layout, Phone, Mail, Clock, MapPin, Upload, Trash2, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { translateText } from '@/utils/translate';
import TypographyPopup from '@/components/typography-popup';

interface Props {
    settings: Record<string, string>;
}

export default function Settings({ settings }: Props) {
    const [activeTab, setActiveTab] = useState<'hero' | 'contact'>('hero');

    const typographyDefaults = (prefix: string) => ({
        [`${prefix}_font_family`]: settings[`${prefix}_font_family`] || '',
        [`${prefix}_font_size`]: settings[`${prefix}_font_size`] || '',
        [`${prefix}_font_weight`]: settings[`${prefix}_font_weight`] || '',
        [`${prefix}_text_transform`]: settings[`${prefix}_text_transform`] || '',
        [`${prefix}_font_style`]: settings[`${prefix}_font_style`] || '',
        [`${prefix}_text_decoration`]: settings[`${prefix}_text_decoration`] || '',
        [`${prefix}_line_height`]: settings[`${prefix}_line_height`] || '',
        [`${prefix}_letter_spacing`]: settings[`${prefix}_letter_spacing`] || '',
        [`${prefix}_word_spacing`]: settings[`${prefix}_word_spacing`] || '',
    });

    const { data, setData, post, processing, errors } = useForm({
        hero_title_en: settings.hero_title_en || '',
        hero_title_bn: settings.hero_title_bn || '',
        hero_subtitle_en: settings.hero_subtitle_en || '',
        hero_subtitle_bn: settings.hero_subtitle_bn || '',
        hero_badge_en: settings.hero_badge_en || '',
        hero_badge_bn: settings.hero_badge_bn || '',
        logo_url: settings.logo_url || '',
        ...typographyDefaults('hero_title_en'),
        ...typographyDefaults('hero_title_bn'),
        ...typographyDefaults('hero_badge_en'),
        ...typographyDefaults('hero_badge_bn'),
        ...typographyDefaults('hero_subtitle_en'),
        ...typographyDefaults('hero_subtitle_bn'),
        ...typographyDefaults('contact_address_en'),
        ...typographyDefaults('contact_address_bn'),
        ...typographyDefaults('contact_phone'),
        ...typographyDefaults('contact_email'),
        ...typographyDefaults('contact_hours_en'),
        ...typographyDefaults('contact_hours_bn'),
        contact_address_en: settings.contact_address_en || '',
        contact_address_bn: settings.contact_address_bn || '',
        contact_phone: settings.contact_phone || '',
        contact_email: settings.contact_email || '',
        contact_hours_en: settings.contact_hours_en || '',
        contact_hours_bn: settings.contact_hours_bn || '',
        map_zoom: settings.map_zoom || '15',
        hero_mode: settings.hero_mode || 'static',
        hero_interval: settings.hero_interval || '5',

    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/dashboard/settings', {
            preserveScroll: true,
        });
    };

    return (
        <div className="p-6 w-full space-y-6">
            <Head title="Website Settings" />

            <div>
                <h1 className="text-2xl font-bold tracking-tight">Homepage Settings</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">Edit hero banner copy and contact information displayed on the public website.</p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800">
                <button
                    onClick={() => setActiveTab('hero')}
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition ${activeTab === 'hero'
                        ? 'border-rose-500 text-rose-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                        }`}
                >
                    <Layout className="h-4 w-4" />
                    <span>Hero Section</span>
                </button>
                <button
                    onClick={() => setActiveTab('contact')}
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition ${activeTab === 'contact'
                        ? 'border-rose-500 text-rose-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                        }`}
                >
                    <Phone className="h-4 w-4" />
                    <span>Contact & Hours</span>
                </button>

            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
                    {activeTab === 'hero' && (
                        <div className="space-y-4">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Hero Section Content</h3>

                            {/* Logo Upload */}
                            <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                                <label className="block text-xs font-semibold mb-2 text-slate-600 dark:text-slate-400">Site Logo</label>
                                {settings.logo && (
                                    <div className="flex items-center gap-4 mb-3">
                                        <img
                                            src={`/${settings.logo}`}
                                            alt="Logo"
                                            className="h-10 w-auto object-contain rounded border border-slate-200 dark:border-slate-800"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const input = document.createElement('input');
                                                input.type = 'file';
                                                input.accept = 'image/jpeg,image/png,image/webp,image/svg+xml';
                                                input.onchange = (e) => {
                                                    const file = (e.target as HTMLInputElement).files?.[0];
                                                    if (file) setData('logo', file);
                                                    post('/dashboard/settings', { preserveScroll: true, forceFormData: true });
                                                };
                                                input.click();
                                            }}
                                            className="text-xs font-semibold text-rose-500 hover:text-rose-600 transition"
                                        >
                                            Replace
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (confirm('Remove logo?')) {
                                                    setData('remove_logo', true);
                                                    post('/dashboard/settings', { preserveScroll: true, forceFormData: true });
                                                }
                                            }}
                                            className="text-xs font-semibold text-slate-400 hover:text-rose-500 transition flex items-center gap-1"
                                        >
                                            <Trash2 className="h-3 w-3" /> Remove
                                        </button>
                                    </div>
                                )}
                                {!settings.logo && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const input = document.createElement('input');
                                            input.type = 'file';
                                            input.accept = 'image/jpeg,image/png,image/webp,image/svg+xml';
                                            input.onchange = (e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                if (file) setData('logo', file);
                                                post('/dashboard/settings', { preserveScroll: true, forceFormData: true });
                                            };
                                            input.click();
                                        }}
                                        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-rose-500 transition"
                                    >
                                        <Upload className="h-4 w-4" /> Upload Logo
                                    </button>
                                )}
                                <div className="mt-3">
                                    <label className="block text-xs font-semibold mb-1.5 text-slate-600 dark:text-slate-400">Logo Link URL</label>
                                    <input
                                        type="url"
                                        value={data.logo_url}
                                        onChange={(e) => setData('logo_url', e.target.value)}
                                        placeholder="https://example.com"
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                    />
                                    {errors.logo_url && <p className="text-xs text-rose-500 mt-1">{errors.logo_url}</p>}
                                </div>
                            </div>

                            {/* Favicon Upload */}
                            <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                                <label className="block text-xs font-semibold mb-2 text-slate-600 dark:text-slate-400">Favicon</label>
                                {settings.favicon ? (
                                    <div className="flex items-center gap-4 mb-3">
                                        <img
                                            src={`/${settings.favicon}`}
                                            alt="Favicon"
                                            className="h-8 w-8 object-contain rounded border border-slate-200 dark:border-slate-800"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const input = document.createElement('input');
                                                input.type = 'file';
                                                input.accept = 'image/jpeg,image/png,image/webp,image/svg+xml,.ico';
                                                input.onchange = (e) => {
                                                    const file = (e.target as HTMLInputElement).files?.[0];
                                                    if (file) setData('favicon', file);
                                                    post('/dashboard/settings', { preserveScroll: true, forceFormData: true });
                                                };
                                                input.click();
                                            }}
                                            className="text-xs font-semibold text-rose-500 hover:text-rose-600 transition"
                                        >
                                            Replace
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (confirm('Remove favicon?')) {
                                                    setData('remove_favicon', true);
                                                    post('/dashboard/settings', { preserveScroll: true, forceFormData: true });
                                                }
                                            }}
                                            className="text-xs font-semibold text-slate-400 hover:text-rose-500 transition flex items-center gap-1"
                                        >
                                            <Trash2 className="h-3 w-3" /> Remove
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const input = document.createElement('input');
                                            input.type = 'file';
                                            input.accept = 'image/jpeg,image/png,image/webp,image/svg+xml,.ico';
                                            input.onchange = (e) => {
                                                const file = (e.target as HTMLInputElement).files?.[0];
                                                if (file) setData('favicon', file);
                                                post('/dashboard/settings', { preserveScroll: true, forceFormData: true });
                                            };
                                            input.click();
                                        }}
                                        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-rose-500 transition"
                                    >
                                        <Upload className="h-4 w-4" /> Upload Favicon
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Hero Title (English)</label>
                                        <TypographyPopup prefix="hero_title_en" data={data} setData={setData} />
                                    </div>
                                    <input
                                        type="text"
                                        value={data.hero_title_en}
                                        onChange={(e) => setData('hero_title_en', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                    />
                                    {errors.hero_title_en && <p className="text-xs text-rose-500 mt-1">{errors.hero_title_en}</p>}
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Hero Title (Bengali)</label>
                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    try {
                                                        const res = await translateText(data.hero_title_en);
                                                        setData('hero_title_bn', res);
                                                    } catch (err) {
                                                        alert('Translation failed. Please try again.');
                                                    }
                                                }}
                                                className="text-[10px] font-bold text-rose-500 hover:text-rose-600 transition"
                                            >
                                                Auto-Translate
                                            </button>
                                            <TypographyPopup prefix="hero_title_bn" data={data} setData={setData} />
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        value={data.hero_title_bn}
                                        onChange={(e) => setData('hero_title_bn', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                    />
                                    {errors.hero_title_bn && <p className="text-xs text-rose-500 mt-1">{errors.hero_title_bn}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Hero Badge (English)</label>
                                        <TypographyPopup prefix="hero_badge_en" data={data} setData={setData} />
                                    </div>
                                    <input
                                        type="text"
                                        value={data.hero_badge_en}
                                        onChange={(e) => setData('hero_badge_en', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                    />
                                    {errors.hero_badge_en && <p className="text-xs text-rose-500 mt-1">{errors.hero_badge_en}</p>}
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Hero Badge (Bengali)</label>
                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    try {
                                                        const res = await translateText(data.hero_badge_en);
                                                        setData('hero_badge_bn', res);
                                                    } catch (err) {
                                                        alert('Translation failed. Please try again.');
                                                    }
                                                }}
                                                className="text-[10px] font-bold text-rose-500 hover:text-rose-600 transition"
                                            >
                                                Auto-Translate
                                            </button>
                                            <TypographyPopup prefix="hero_badge_bn" data={data} setData={setData} />
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        value={data.hero_badge_bn}
                                        onChange={(e) => setData('hero_badge_bn', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                    />
                                    {errors.hero_badge_bn && <p className="text-xs text-rose-500 mt-1">{errors.hero_badge_bn}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Hero Subtitle (English)</label>
                                        <TypographyPopup prefix="hero_subtitle_en" data={data} setData={setData} />
                                    </div>
                                    <textarea
                                        rows={4}
                                        value={data.hero_subtitle_en}
                                        onChange={(e) => setData('hero_subtitle_en', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white resize-none"
                                    />
                                    {errors.hero_subtitle_en && <p className="text-xs text-rose-500 mt-1">{errors.hero_subtitle_en}</p>}
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Hero Subtitle (Bengali)</label>
                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    try {
                                                        const res = await translateText(data.hero_subtitle_en);
                                                        setData('hero_subtitle_bn', res);
                                                    } catch (err) {
                                                        alert('Translation failed. Please try again.');
                                                    }
                                                }}
                                                className="text-[10px] font-bold text-rose-500 hover:text-rose-600 transition"
                                            >
                                                Auto-Translate
                                            </button>
                                            <TypographyPopup prefix="hero_subtitle_bn" data={data} setData={setData} />
                                        </div>
                                    </div>
                                    <textarea
                                        rows={4}
                                        value={data.hero_subtitle_bn}
                                        onChange={(e) => setData('hero_subtitle_bn', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white resize-none"
                                    />
                                    {errors.hero_subtitle_bn && <p className="text-xs text-rose-500 mt-1">{errors.hero_subtitle_bn}</p>}
                                </div>
                            </div>

                            {/* Hero Mode: Static vs Slider */}
                            <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                                <h4 className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-3">Hero Display Mode</h4>
                                <div className="flex gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="hero_mode"
                                            value="static"
                                            checked={data.hero_mode === 'static'}
                                            onChange={() => setData('hero_mode', 'static')}
                                            className="text-rose-500 focus:ring-rose-500"
                                        />
                                        <div>
                                            <span className="text-sm font-medium">Static Content</span>
                                            <p className="text-xs text-slate-400">Use the text fields below for a single hero banner.</p>
                                        </div>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="hero_mode"
                                            value="slider"
                                            checked={data.hero_mode === 'slider'}
                                            onChange={() => setData('hero_mode', 'slider')}
                                            className="text-rose-500 focus:ring-rose-500"
                                        />
                                        <div>
                                            <span className="text-sm font-medium">Slider</span>
                                            <p className="text-xs text-slate-400">Show multiple slides with images and text.</p>
                                        </div>
                                    </label>
                                </div>
                                {data.hero_mode === 'slider' && (
                                    <div className="mt-3 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">Auto-slide interval (seconds):</label>
                                            <input
                                                type="number"
                                                min={2}
                                                max={15}
                                                value={data.hero_interval}
                                                onChange={(e) => setData('hero_interval', e.target.value)}
                                                className="w-20 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                            />
                                        </div>
                                        <a
                                            href="/dashboard/hero-slides"
                                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-500 hover:text-rose-600 transition"
                                        >
                                            <ImageIcon className="h-4 w-4" />
                                            <span>Manage Hero Slides</span>
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                    </div>
                                )}
                            </div>

                        </div>
                    )}

                    {activeTab === 'contact' && (
                        <div className="space-y-4">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Contact Details & Working Hours</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Address (English)</label>
                                        <TypographyPopup prefix="contact_address_en" data={data} setData={setData} />
                                    </div>
                                    <input
                                        type="text"
                                        value={data.contact_address_en}
                                        onChange={(e) => setData('contact_address_en', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                    />
                                    {errors.contact_address_en && <p className="text-xs text-rose-500 mt-1">{errors.contact_address_en}</p>}
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Address (Bengali)</label>
                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    try {
                                                        const res = await translateText(data.contact_address_en);
                                                        setData('contact_address_bn', res);
                                                    } catch (err) {
                                                        alert('Translation failed. Please try again.');
                                                    }
                                                }}
                                                className="text-[10px] font-bold text-rose-500 hover:text-rose-600 transition"
                                            >
                                                Auto-Translate
                                            </button>
                                            <TypographyPopup prefix="contact_address_bn" data={data} setData={setData} />
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        value={data.contact_address_bn}
                                        onChange={(e) => setData('contact_address_bn', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                    />
                                    {errors.contact_address_bn && <p className="text-xs text-rose-500 mt-1">{errors.contact_address_bn}</p>}
                                </div>
                            </div>

                            {/* Map Zoom */}
                            <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                                        <MapPin className="h-3.5 w-3.5" /> Map Zoom Level
                                    </label>
                                    <span className="text-xs font-bold text-rose-500 tabular-nums w-6 text-right">{data.map_zoom}</span>
                                </div>
                                <input
                                    type="range"
                                    min={1}
                                    max={21}
                                    step={1}
                                    value={data.map_zoom}
                                    onChange={(e) => setData('map_zoom', e.target.value)}
                                    className="w-full accent-rose-500 cursor-pointer"
                                />
                                <div className="flex justify-between text-[10px] text-slate-400 mt-1 select-none">
                                    <span>1 — World</span>
                                    <span>10 — City</span>
                                    <span>15 — Streets</span>
                                    <span>21 — Buildings</span>
                                </div>
                                {errors.map_zoom && <p className="text-xs text-rose-500 mt-1">{errors.map_zoom}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> Phone Number</label>
                                        <TypographyPopup prefix="contact_phone" data={data} setData={setData} />
                                    </div>
                                    <input
                                        type="text"
                                        value={data.contact_phone}
                                        onChange={(e) => setData('contact_phone', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                    />
                                    {errors.contact_phone && <p className="text-xs text-rose-500 mt-1">{errors.contact_phone}</p>}
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> Contact Email</label>
                                        <TypographyPopup prefix="contact_email" data={data} setData={setData} />
                                    </div>
                                    <input
                                        type="email"
                                        value={data.contact_email}
                                        onChange={(e) => setData('contact_email', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                    />
                                    {errors.contact_email && <p className="text-xs text-rose-500 mt-1">{errors.contact_email}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Hours (English)</label>
                                        <TypographyPopup prefix="contact_hours_en" data={data} setData={setData} />
                                    </div>
                                    <input
                                        type="text"
                                        value={data.contact_hours_en}
                                        onChange={(e) => setData('contact_hours_en', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                    />
                                    {errors.contact_hours_en && <p className="text-xs text-rose-500 mt-1">{errors.contact_hours_en}</p>}
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Hours (Bengali)</label>
                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    try {
                                                        const res = await translateText(data.contact_hours_en);
                                                        setData('contact_hours_bn', res);
                                                    } catch (err) {
                                                        alert('Translation failed. Please try again.');
                                                    }
                                                }}
                                                className="text-[10px] font-bold text-rose-500 hover:text-rose-600 transition"
                                            >
                                                Auto-Translate
                                            </button>
                                            <TypographyPopup prefix="contact_hours_bn" data={data} setData={setData} />
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        value={data.contact_hours_bn}
                                        onChange={(e) => setData('contact_hours_bn', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                    />
                                    {errors.contact_hours_bn && <p className="text-xs text-rose-500 mt-1">{errors.contact_hours_bn}</p>}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex items-center gap-1.5 rounded-full bg-rose-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-rose-600 transition disabled:bg-rose-400"
                    >
                        {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        <span>Save Changes</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

Settings.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Settings', href: '/dashboard/settings' }]}>
        {page}
    </AppLayout>
);
