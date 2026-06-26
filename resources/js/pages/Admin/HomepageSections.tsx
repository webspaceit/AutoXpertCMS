import { useState, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Plus, Edit2, Trash2, X, FileText, Loader2, LayoutGrid, GripVertical } from 'lucide-react';
import { translateText } from '@/utils/translate';
import TypographyPopup from '@/components/typography-popup';
import RichEditor from '@/components/rich-editor';

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

interface Props {
    sections: HomepageSection[];
}

export default function HomepageSections({ sections = [] }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [localSections, setLocalSections] = useState<HomepageSection[]>(sections);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    useEffect(() => {
        setLocalSections(sections);
    }, [sections]);

    const typographyFlat = (section?: HomepageSection) => {
        const prefs = ['title_en', 'title_bn'];
        const props = ['font_family', 'font_size', 'font_weight', 'text_transform', 'font_style', 'text_decoration', 'line_height', 'letter_spacing', 'word_spacing'];
        const result: Record<string, string> = {};
        for (const pref of prefs) {
            for (const prop of props) {
                result[`${pref}_${prop}`] = section?.typography?.[pref]?.[prop] || '';
            }
        }
        return result;
    };

    const { data, setData, delete: destroy, processing, errors, reset } = useForm({
        title_en: '',
        title_bn: '',
        slug: '',
        content_en: '',
        content_bn: '',
        order: 0,
        ...typographyFlat(),
    });

    const handleCreate = () => {
        reset();
        setEditId(null);
        setIsOpen(true);
    };

    const handleEdit = (section: HomepageSection) => {
        setData({
            title_en: section.title_en,
            title_bn: section.title_bn,
            slug: section.slug,
            content_en: section.content_en,
            content_bn: section.content_bn,
            order: section.order,
            ...typographyFlat(section),
        });
        setEditId(section.id);
        setIsOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this homepage section?')) {
            destroy(`/dashboard/sections/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = { ...data };

        if (editId) {
            router.put(`/dashboard/sections/${editId}`, payload, {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        } else {
            router.post('/dashboard/sections', payload, {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        }
    };

    // Drag and Drop Logic
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

        const updated = [...localSections];
        const [draggedItem] = updated.splice(draggedIndex, 1);
        updated.splice(targetIndex, 0, draggedItem);

        // Reassign sequential orders
        const orders = updated.map((item, index) => ({
            id: item.id,
            order: index + 1,
        }));

        // Optimistically update UI
        setLocalSections(updated.map((item, index) => ({ ...item, order: index + 1 })));

        router.post('/dashboard/sections/reorder', { orders }, {
            preserveScroll: true,
        });
    };

    const handleDragEnd = (e: React.DragEvent) => {
        setDraggedIndex(null);
        setDragOverIndex(null);
        if (e.currentTarget instanceof HTMLElement) {
            e.currentTarget.style.opacity = '1';
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <Head title="Manage Homepage Sections" />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Homepage Sections</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Drag and drop rows or use the Sort Order field to arrange sections for your landing page.</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-1.5 rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-600 transition"
                >
                    <Plus className="h-4 w-4" />
                    <span>Create Section</span>
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-xs font-semibold text-slate-500 uppercase">
                                <th className="p-4 w-12 text-center">Drag</th>
                                <th className="p-4">Title (English)</th>
                                <th className="p-4">Title (Bengali)</th>
                                <th className="p-4">Anchor Slug</th>
                                <th className="p-4 w-20">Sort Order</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                            {localSections.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-400">
                                        No homepage sections created yet.
                                    </td>
                                </tr>
                            ) : (
                                localSections.map((section, index) => (
                                    <tr 
                                        key={section.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, index)}
                                        onDragOver={(e) => handleDragOver(e, index)}
                                        onDrop={(e) => handleDrop(e, index)}
                                        onDragEnd={handleDragEnd}
                                        className={`hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-all select-none ${
                                            draggedIndex === index ? 'opacity-40 bg-slate-50 dark:bg-slate-900/40' : ''
                                        } ${
                                            dragOverIndex === index ? 'bg-rose-50/20 dark:bg-rose-950/10 border-t-2 border-rose-500' : ''
                                        }`}
                                    >
                                        <td className="p-4 text-center cursor-grab active:cursor-grabbing text-slate-400 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400">
                                            <GripVertical className="h-4 w-4 mx-auto" />
                                        </td>
                                        <td className="p-4 font-semibold text-slate-900 dark:text-white">
                                            {section.title_en}
                                        </td>
                                        <td className="p-4 font-semibold text-slate-900 dark:text-white">
                                            {section.title_bn}
                                        </td>
                                        <td className="p-4 text-slate-500">
                                            #{section.slug}
                                        </td>
                                        <td className="p-4 text-slate-500 font-medium">
                                            {section.order}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <button
                                                    onClick={() => handleEdit(section)}
                                                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                                                    title="Edit Section"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(section.id)}
                                                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                                                    title="Delete Section"
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

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                    <div className="relative w-full max-w-4xl rounded-2xl bg-white dark:bg-slate-950 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        <h3 className="text-lg font-bold mb-6">{editId ? 'Edit Homepage Section' : 'Create Homepage Section'}</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-xs font-semibold">Section Title (English)</label>
                                        <TypographyPopup prefix="title_en" data={data} setData={setData} />
                                    </div>
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
                                        <label className="block text-xs font-semibold">Section Title (Bengali)</label>
                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    try {
                                                        const res = await translateText(data.title_en);
                                                        setData('title_bn', res);
                                                    } catch (err) {
                                                        alert('Translation failed. Please try again.');
                                                    }
                                                }}
                                                className="text-[10px] font-bold text-rose-500 hover:text-rose-600 transition"
                                            >
                                                Auto-Translate
                                            </button>
                                            <TypographyPopup prefix="title_bn" data={data} setData={setData} />
                                        </div>
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
                                    <label className="block text-xs font-semibold mb-1.5">Anchor Slug (e.g. custom-about, leave blank for auto-generation)</label>
                                    <input
                                        type="text"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        placeholder="auto-generated-from-title"
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors.slug && <p className="text-xs text-rose-500 mt-1">{errors.slug}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5">Sort Order</label>
                                    <input
                                        type="number"
                                        required
                                        value={data.order}
                                        onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors.order && <p className="text-xs text-rose-500 mt-1">{errors.order}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-semibold">Content (English)</label>
                                    <RichEditor
                                        content={data.content_en}
                                        onUpdate={(html) => setData(d => ({ ...d, content_en: html }))}
                                        placeholder="Enter English content..."
                                    />
                                    {errors.content_en && <p className="text-xs text-rose-500 mt-1">{errors.content_en}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between mb-1">
                                        <label className="block text-xs font-semibold">Content (Bengali)</label>
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                if (!data.content_en.trim()) {
                                                    alert('Please fill out the English content first.');
                                                    return;
                                                }
                                                try {
                                                    const res = await translateText(data.content_en);
                                                    setData(d => ({ ...d, content_bn: res }));
                                                } catch (err) {
                                                    alert('Translation failed. Please try again.');
                                                }
                                            }}
                                            className="text-[10px] font-bold text-rose-500 hover:text-rose-600 transition"
                                        >
                                            Auto-Translate
                                        </button>
                                    </div>
                                    <RichEditor
                                        content={data.content_bn}
                                        onUpdate={(html) => setData(d => ({ ...d, content_bn: html }))}
                                        placeholder="Enter Bengali content..."
                                    />
                                    {errors.content_bn && <p className="text-xs text-rose-500 mt-1">{errors.content_bn}</p>}
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
                                    <span>Save Section</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

HomepageSections.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Homepage Sections', href: '/dashboard/sections' }]}>
        {page}
    </AppLayout>
);
