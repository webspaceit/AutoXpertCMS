import { useState, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Plus, Edit2, Trash2, X, Loader2, GripVertical, Type, FileText, Menu as MenuIcon } from 'lucide-react';
import { translateText } from '@/utils/translate';
import RichEditor from '@/components/rich-editor';
import TypographyPopup from '@/components/typography-popup';

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
    columns: FooterColumnItem[];
    settings?: Record<string, string>;
}

export default function FooterColumns({ columns = [], settings = {} }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [localColumns, setLocalColumns] = useState<FooterColumnItem[]>(columns);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    useEffect(() => {
        setLocalColumns(columns);
    }, [columns]);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        title_en: '',
        title_bn: '',
        type: 'menu' as 'menu' | 'content',
        content_en: '',
        content_bn: '',
        order: 0,
    });

    const typoForm = useForm({
        footer_copyright: settings.footer_copyright || '',
        footer_copyright_font_family: settings.footer_copyright_font_family || '',
        footer_copyright_font_size: settings.footer_copyright_font_size || '',
        footer_copyright_font_weight: settings.footer_copyright_font_weight || '',
        footer_copyright_text_transform: settings.footer_copyright_text_transform || '',
        footer_copyright_font_style: settings.footer_copyright_font_style || '',
        footer_copyright_text_decoration: settings.footer_copyright_text_decoration || '',
        footer_copyright_line_height: settings.footer_copyright_line_height || '',
        footer_copyright_letter_spacing: settings.footer_copyright_letter_spacing || '',
        footer_copyright_word_spacing: settings.footer_copyright_word_spacing || '',
    });

    const handleCreate = () => {
        reset();
        setEditId(null);
        setIsOpen(true);
    };

    const handleEdit = (col: FooterColumnItem) => {
        setData({
            title_en: col.title_en,
            title_bn: col.title_bn,
            type: col.type,
            content_en: col.content_en || '',
            content_bn: col.content_bn || '',
            order: col.order,
        });
        setEditId(col.id);
        setIsOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this footer column?')) {
            destroy(`/dashboard/footer-columns/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const options = {
            onSuccess: () => {
                setIsOpen(false);
                reset();
            },
        };
        if (editId) {
            put(`/dashboard/footer-columns/${editId}`, options);
        } else {
            post('/dashboard/footer-columns', options);
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

        const updated = [...localColumns];
        const [draggedItem] = updated.splice(draggedIndex, 1);
        updated.splice(targetIndex, 0, draggedItem);

        const orders = updated.map((item, index) => ({
            id: item.id,
            order: index + 1,
        }));

        setLocalColumns(updated.map((item, index) => ({ ...item, order: index + 1 })));

        router.post('/dashboard/footer-columns/reorder', { orders }, {
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
            <Head title="Footer Section" />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Footer Section</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Manage footer columns and copyright text.</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-1.5 rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-600 transition"
                >
                    <Plus className="h-4 w-4" />
                    <span>Add Column</span>
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-xs font-semibold text-slate-500 uppercase">
                                <th className="p-4 w-12 text-center">Drag</th>
                                <th className="p-4 w-16 text-center">Order</th>
                                <th className="p-4">Title (English)</th>
                                <th className="p-4">Title (Bengali)</th>
                                <th className="p-4">Type</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                            {localColumns.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-400">
                                        No footer columns created yet.
                                    </td>
                                </tr>
                            ) : (
                                localColumns.map((col, index) => (
                                    <tr
                                        key={col.id}
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
                                            {col.order}
                                        </td>
                                        <td className="p-4 font-semibold text-slate-900 dark:text-white">
                                            {col.title_en}
                                        </td>
                                        <td className="p-4 font-semibold text-slate-900 dark:text-white">
                                            {col.title_bn}
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${col.type === 'menu' ? 'bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400'}`}>
                                                {col.type === 'menu' ? <MenuIcon className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
                                                {col.type === 'menu' ? 'Menu' : 'Content'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <button
                                                    onClick={() => handleEdit(col)}
                                                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                                                    title="Edit Column"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(col.id)}
                                                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                                                    title="Delete Column"
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

            {/* Footer Copyright */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                    <FileText className="h-4 w-4 text-rose-500" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Footer Copyright Text</h3>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Set the copyright text displayed at the bottom of the footer. Use the typography icon to customize its appearance.</p>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        typoForm.post('/dashboard/settings', { preserveScroll: true });
                    }}
                    className="space-y-4"
                >
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Copyright Text</label>
                            <TypographyPopup prefix="footer_copyright" data={typoForm.data} setData={typoForm.setData} />
                        </div>
                        <input
                            type="text"
                            value={typoForm.data.footer_copyright}
                            onChange={(e) => typoForm.setData('footer_copyright', e.target.value)}
                            placeholder="© 2026 Auto Xperts Car Servicing CMS. All rights reserved."
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={typoForm.processing}
                            className="flex items-center gap-1.5 rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-600 transition disabled:bg-rose-400"
                        >
                            {typoForm.processing && <Loader2 className="h-4 w-4 animate-spin" />}
                            <span>Save Copyright</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Column Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                    <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-950 p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        <h3 className="text-lg font-bold mb-6">{editId ? 'Edit Footer Column' : 'Add Footer Column'}</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
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
                                                } catch (err) {
                                                    alert('Translation failed. Please try again.');
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

                            <div>
                                <label className="block text-xs font-semibold mb-1.5">Column Type</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="menu"
                                            checked={data.type === 'menu'}
                                            onChange={() => setData('type', 'menu')}
                                            className="text-rose-500 focus:ring-rose-500"
                                        />
                                        <span className="text-sm font-medium">Menu Links</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="content"
                                            checked={data.type === 'content'}
                                            onChange={() => setData('type', 'content')}
                                            className="text-rose-500 focus:ring-rose-500"
                                        />
                                        <span className="text-sm font-medium">Rich Text Content</span>
                                    </label>
                                </div>
                            </div>

                            {data.type === 'content' && (
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-semibold">Content (English)</label>
                                        <RichEditor
                                            content={data.content_en}
                                            onUpdate={(html) => setData('content_en', html)}
                                            placeholder="Enter English content..."
                                        />
                                        {errors.content_en && <p className="text-xs text-rose-500 mt-1">{errors.content_en}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between">
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
                                                        setData('content_bn', res);
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
                                            onUpdate={(html) => setData('content_bn', html)}
                                            placeholder="Enter Bengali content..."
                                        />
                                        {errors.content_bn && <p className="text-xs text-rose-500 mt-1">{errors.content_bn}</p>}
                                    </div>
                                </div>
                            )}

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

FooterColumns.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Footer Section', href: '/dashboard/footer-columns' }]}>
        {page}
    </AppLayout>
);
