import { useState, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Plus, Edit2, Trash2, X, Loader2, GripVertical, Image as ImageIcon } from 'lucide-react';
import { translateText } from '@/utils/translate';

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

interface Props {
    slides: HeroSlideItem[];
}

export default function HeroSlides({ slides = [] }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [localSlides, setLocalSlides] = useState<HeroSlideItem[]>(slides);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');

    useEffect(() => {
        setLocalSlides(slides);
    }, [slides]);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        image: '',
        title_en: '',
        title_bn: '',
        subtitle_en: '',
        subtitle_bn: '',
        button_text_en: '',
        button_text_bn: '',
        order: 0,
    });

    const uploadImage = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;
            const formData = new FormData();
            formData.append('file', file);
            const csrf = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content;
            try {
                const res = await fetch('/dashboard/upload-image', {
                    method: 'POST',
                    headers: { 'X-CSRF-TOKEN': csrf || '' },
                    body: formData,
                });
                const result = await res.json();
                setData('image', result.location);
                setImagePreview(result.location);
            } catch {
                alert('Image upload failed');
            }
        };
        input.click();
    };

    const handleCreate = () => {
        reset();
        setImagePreview('');
        setEditId(null);
        setIsOpen(true);
    };

    const handleEdit = (slide: HeroSlideItem) => {
        setData({
            image: slide.image,
            title_en: slide.title_en,
            title_bn: slide.title_bn,
            subtitle_en: slide.subtitle_en || '',
            subtitle_bn: slide.subtitle_bn || '',
            button_text_en: slide.button_text_en || '',
            button_text_bn: slide.button_text_bn || '',
            order: slide.order,
        });
        setImagePreview(slide.image);
        setEditId(slide.id);
        setIsOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this slide?')) {
            destroy(`/dashboard/hero-slides/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const handleDeleteImage = (id: number) => {
        if (confirm('Delete this image from the server? The slide record will be kept.')) {
            destroy(`/dashboard/hero-slides/${id}/image`, {
                preserveScroll: true,
                onSuccess: () => {
                    setImagePreview('');
                    setData('image', '');
                },
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const options = {
            onSuccess: () => {
                setIsOpen(false);
                reset();
                setImagePreview('');
            },
        };
        if (editId) {
            put(`/dashboard/hero-slides/${editId}`, options);
        } else {
            post('/dashboard/hero-slides', options);
        }
    };

    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        if (e.currentTarget instanceof HTMLElement) {
            e.currentTarget.style.opacity = '0.5';
        }
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedIndex === index) return;
        setDragOverIndex(index);
    };

    const handleDrop = (e: React.DragEvent, targetIndex: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === targetIndex) return;

        const updated = [...localSlides];
        const [draggedItem] = updated.splice(draggedIndex, 1);
        updated.splice(targetIndex, 0, draggedItem);

        const orders = updated.map((item, index) => ({
            id: item.id,
            order: index + 1,
        }));

        setLocalSlides(updated.map((item, index) => ({ ...item, order: index + 1 })));

        router.post('/dashboard/hero-slides/reorder', { orders }, {
            preserveScroll: true,
        });
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <Head title="Hero Slides" />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Hero Slides</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Manage slides for the hero banner slider. Each slide has a background image, title, subtitle, and optional button text.</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-1.5 rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-600 transition"
                >
                    <Plus className="h-4 w-4" />
                    <span>Add Slide</span>
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-xs font-semibold text-slate-500 uppercase">
                                <th className="p-4 w-12 text-center">Drag</th>
                                <th className="p-4 w-16 text-center">Order</th>
                                <th className="p-4">Image</th>
                                <th className="p-4">Title (English)</th>
                                <th className="p-4">Title (Bengali)</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                            {localSlides.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-400">
                                        No hero slides created yet. Add one to enable the hero slider.
                                    </td>
                                </tr>
                            ) : (
                                localSlides.map((slide, index) => (
                                    <tr
                                        key={slide.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, index)}
                                        onDragOver={(e) => handleDragOver(e, index)}
                                        onDrop={(e) => handleDrop(e, index)}
                                        onDragEnd={handleDragEnd}
                                        className={`hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-all select-none ${draggedIndex === index ? 'opacity-40 bg-slate-50 dark:bg-slate-900/40' : ''} ${dragOverIndex === index ? 'bg-rose-50/20 dark:bg-rose-950/10 border-t-2 border-rose-500' : ''}`}
                                    >
                                        <td className="p-4 text-center cursor-grab active:cursor-grabbing text-slate-400 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400">
                                            <GripVertical className="h-4 w-4 mx-auto" />
                                        </td>
                                        <td className="p-4 font-semibold text-center text-slate-400">
                                            {slide.order}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={slide.image}
                                                    alt={slide.title_en}
                                                    className="h-12 w-20 object-cover rounded-lg border border-slate-200 dark:border-slate-700"
                                                />
                                                {slide.image && (
                                                    <button
                                                        onClick={() => handleDeleteImage(slide.id)}
                                                        className="p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition"
                                                        title="Delete image from server"
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 font-semibold text-slate-900 dark:text-white max-w-[200px] truncate">
                                            {slide.title_en}
                                        </td>
                                        <td className="p-4 font-semibold text-slate-900 dark:text-white max-w-[200px] truncate">
                                            {slide.title_bn}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <button
                                                    onClick={() => handleEdit(slide)}
                                                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                                                    title="Edit Slide"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(slide.id)}
                                                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                                                    title="Delete Slide"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Slide Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                    <div className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-slate-950 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        <h3 className="text-lg font-bold mb-6">{editId ? 'Edit Hero Slide' : 'Add Hero Slide'}</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-xs font-semibold mb-1.5">Background Image</label>
                                {imagePreview ? (
                                    <div className="flex items-center gap-3 mb-2">
                                        <img src={imagePreview} alt="Preview" className="h-24 w-40 object-cover rounded-lg border border-slate-200 dark:border-slate-700" />
                                        <div className="flex flex-col gap-2">
                                            <button
                                                type="button"
                                                onClick={uploadImage}
                                                className="text-xs font-semibold text-rose-500 hover:text-rose-600 transition"
                                            >
                                                Replace
                                            </button>
                                            {editId && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteImage(editId)}
                                                    className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-rose-500 transition"
                                                >
                                                    <Trash2 className="h-3 w-3" /> Delete from server
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={uploadImage}
                                        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-rose-500 transition border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-8 w-full justify-center"
                                    >
                                        <ImageIcon className="h-5 w-5" />
                                        <span>Click to upload image</span>
                                    </button>
                                )}
                                {errors.image && <p className="text-xs text-rose-500 mt-1">{errors.image}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5">Title (English)</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.title_en}
                                        onChange={(e) => setData('title_en', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors.title_en && <p className="text-xs text-rose-500 mt-1">{errors.title_en}</p>}
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-xs font-semibold">Title (Bengali)</label>
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                try {
                                                    const res = await translateText(data.title_en);
                                                    setData('title_bn', res);
                                                } catch {
                                                    alert('Translation failed.');
                                                }
                                            }}
                                            className="text-[10px] font-bold text-rose-500 hover:text-rose-600 transition"
                                        >
                                            Auto-Translate
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={data.title_bn}
                                        onChange={(e) => setData('title_bn', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors.title_bn && <p className="text-xs text-rose-500 mt-1">{errors.title_bn}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5">Subtitle (English)</label>
                                    <textarea
                                        rows={3}
                                        value={data.subtitle_en}
                                        onChange={(e) => setData('subtitle_en', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 resize-none"
                                    />
                                    {errors.subtitle_en && <p className="text-xs text-rose-500 mt-1">{errors.subtitle_en}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5">Subtitle (Bengali)</label>
                                    <textarea
                                        rows={3}
                                        value={data.subtitle_bn}
                                        onChange={(e) => setData('subtitle_bn', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 resize-none"
                                    />
                                    {errors.subtitle_bn && <p className="text-xs text-rose-500 mt-1">{errors.subtitle_bn}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5">Button Text (English)</label>
                                    <input
                                        type="text"
                                        value={data.button_text_en}
                                        onChange={(e) => setData('button_text_en', e.target.value)}
                                        placeholder="Book Now"
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors.button_text_en && <p className="text-xs text-rose-500 mt-1">{errors.button_text_en}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5">Button Text (Bengali)</label>
                                    <input
                                        type="text"
                                        value={data.button_text_bn}
                                        onChange={(e) => setData('button_text_bn', e.target.value)}
                                        placeholder="এখনই বুক করুন"
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors.button_text_bn && <p className="text-xs text-rose-500 mt-1">{errors.button_text_bn}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-1">
                                    <label className="block text-xs font-semibold mb-1.5">Sort Order</label>
                                    <input
                                        type="number"
                                        required
                                        value={data.order}
                                        onChange={(e) => setData('order', parseInt(e.target.value))}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors.order && <p className="text-xs text-rose-500 mt-1">{errors.order}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50 dark:border-slate-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex items-center gap-1.5 rounded-lg bg-rose-500 px-5 py-2 text-sm font-semibold text-white hover:bg-rose-600 transition disabled:bg-rose-400"
                                >
                                    {processing && <Loader2 className="h-4 w-4 animate-spin" />}
                                    <span>Save</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

HeroSlides.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Hero Slides', href: '/dashboard/hero-slides' }]}>
        {page}
    </AppLayout>
);
