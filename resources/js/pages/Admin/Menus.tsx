import { useState, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Plus, Edit2, Trash2, X, Link as LinkIcon, SortAsc, Loader2, GripVertical, Type } from 'lucide-react';
import { translateText } from '@/utils/translate';
import TypographyPopup from '@/components/typography-popup';

interface MenuItem {
    id: number;
    label_en: string;
    label_bn: string;
    url: string;
    order: number;
}

interface Props {
    menus: MenuItem[];
    settings?: Record<string, string>;
}

export default function Menus({ menus = [], settings = {} }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [localMenus, setLocalMenus] = useState<MenuItem[]>(menus);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    useEffect(() => {
        setLocalMenus(menus);
    }, [menus]);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        label_en: '',
        label_bn: '',
        url: '',
        order: 0,
    });

    const typoForm = useForm({
        menu_label_en_font_family: settings.menu_label_en_font_family || '',
        menu_label_en_font_size: settings.menu_label_en_font_size || '',
        menu_label_en_font_weight: settings.menu_label_en_font_weight || '',
        menu_label_en_text_transform: settings.menu_label_en_text_transform || '',
        menu_label_en_font_style: settings.menu_label_en_font_style || '',
        menu_label_en_text_decoration: settings.menu_label_en_text_decoration || '',
        menu_label_en_line_height: settings.menu_label_en_line_height || '',
        menu_label_en_letter_spacing: settings.menu_label_en_letter_spacing || '',
        menu_label_en_word_spacing: settings.menu_label_en_word_spacing || '',
        menu_label_bn_font_family: settings.menu_label_bn_font_family || '',
        menu_label_bn_font_size: settings.menu_label_bn_font_size || '',
        menu_label_bn_font_weight: settings.menu_label_bn_font_weight || '',
        menu_label_bn_text_transform: settings.menu_label_bn_text_transform || '',
        menu_label_bn_font_style: settings.menu_label_bn_font_style || '',
        menu_label_bn_text_decoration: settings.menu_label_bn_text_decoration || '',
        menu_label_bn_line_height: settings.menu_label_bn_line_height || '',
        menu_label_bn_letter_spacing: settings.menu_label_bn_letter_spacing || '',
        menu_label_bn_word_spacing: settings.menu_label_bn_word_spacing || '',
    });

    const handleCreate = () => {
        reset();
        setEditId(null);
        setIsOpen(true);
    };

    const handleEdit = (menu: MenuItem) => {
        setData({
            label_en: menu.label_en,
            label_bn: menu.label_bn,
            url: menu.url,
            order: menu.order,
        });
        setEditId(menu.id);
        setIsOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this menu item?')) {
            destroy(`/dashboard/menus/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editId) {
            put(`/dashboard/menus/${editId}`, {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        } else {
            post('/dashboard/menus', {
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
        // Add a drag image class or handle opacity
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

        const updated = [...localMenus];
        const [draggedItem] = updated.splice(draggedIndex, 1);
        updated.splice(targetIndex, 0, draggedItem);

        // Reassign orders sequentially based on new positions
        const orders = updated.map((item, index) => ({
            id: item.id,
            order: index + 1,
        }));

        // Optimistically update UI
        setLocalMenus(updated.map((item, index) => ({ ...item, order: index + 1 })));

        router.post('/dashboard/menus/reorder', { orders }, {
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
            <Head title="Manage Navigation Menu" />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Navigation Menu</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Drag and drop rows or use the Sort Order field to organize links on the top navigation bar.</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-1.5 rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-600 transition"
                >
                    <Plus className="h-4 w-4" />
                    <span>Add Link</span>
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-xs font-semibold text-slate-500 uppercase">
                                <th className="p-4 w-12 text-center">Drag</th>
                                <th className="p-4 w-16 text-center">Order</th>
                                <th className="p-4">Label (English)</th>
                                <th className="p-4">Label (Bengali)</th>
                                <th className="p-4">URL Path</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                            {localMenus.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-400">
                                        No navigation links created yet.
                                    </td>
                                </tr>
                            ) : (
                                localMenus.map((menu, index) => (
                                    <tr 
                                        key={menu.id}
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
                                        <td className="p-4 font-semibold text-center text-slate-400">
                                            {menu.order}
                                        </td>
                                        <td className="p-4 font-semibold text-slate-900 dark:text-white">
                                            {menu.label_en}
                                        </td>
                                        <td className="p-4 font-semibold text-slate-900 dark:text-white">
                                            {menu.label_bn}
                                        </td>
                                        <td className="p-4 text-slate-500">
                                            <div className="flex items-center gap-1.5">
                                                <LinkIcon className="h-3.5 w-3.5 shrink-0" />
                                                <span>{menu.url}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <button
                                                    onClick={() => handleEdit(menu)}
                                                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                                                    title="Edit Menu"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(menu.id)}
                                                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                                                    title="Delete Menu"
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

            {/* Menu Typography */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                    <Type className="h-4 w-4 text-rose-500" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Navigation Menu Typography</h3>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">These typography settings apply to all navigation menu links on the public site.</p>

                <form onSubmit={(e) => { e.preventDefault(); typoForm.post('/dashboard/settings', { preserveScroll: true }); }} className="space-y-4">
                    <input type="hidden" name="_token" value={document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Menu Labels (English)</label>
                                <TypographyPopup prefix="menu_label_en" data={typoForm.data} setData={typoForm.setData} />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Menu Labels (Bengali)</label>
                                <TypographyPopup prefix="menu_label_bn" data={typoForm.data} setData={typoForm.setData} />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={typoForm.processing}
                            className="flex items-center gap-1.5 rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-600 transition disabled:bg-rose-400"
                        >
                            {typoForm.processing && <Loader2 className="h-4 w-4 animate-spin" />}
                            <span>Save Typography</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Menu Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                    <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-950 p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        <h3 className="text-lg font-bold mb-6">{editId ? 'Edit Menu Link' : 'Add Menu Link'}</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5">Label (English)</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.label_en}
                                        onChange={(e) => setData('label_en', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors.label_en && <p className="text-xs text-rose-500 mt-1">{errors.label_en}</p>}
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-xs font-semibold">Label (Bengali)</label>
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                try {
                                                    const res = await translateText(data.label_en);
                                                    setData('label_bn', res);
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
                                        value={data.label_bn}
                                        onChange={(e) => setData('label_bn', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors.label_bn && <p className="text-xs text-rose-500 mt-1">{errors.label_bn}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-xs font-semibold mb-1.5">URL Target (e.g. #services)</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.url}
                                        onChange={(e) => setData('url', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors.url && <p className="text-xs text-rose-500 mt-1">{errors.url}</p>}
                                </div>
                                <div>
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

Menus.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Menus', href: '/dashboard/menus' }]}>
        {page}
    </AppLayout>
);
