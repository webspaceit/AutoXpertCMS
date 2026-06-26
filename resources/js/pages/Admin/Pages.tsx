import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Plus, Edit2, Trash2, X, FileText, Loader2 } from 'lucide-react';
import { translateText } from '@/utils/translate';
import RichEditor from '@/components/rich-editor';

interface DynamicPage {
    id: number;
    title_en: string;
    title_bn: string;
    slug: string;
    content_en: string;
    content_bn: string;
}

interface Props {
    pages: DynamicPage[];
}

export default function Pages({ pages = [] }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    const { data, setData, delete: destroy, processing, errors, reset } = useForm({
        title_en: '',
        title_bn: '',
        slug: '',
        content_en: '',
        content_bn: '',
    });

    const handleCreate = () => {
        reset();
        setEditId(null);
        setIsOpen(true);
    };

    const handleEdit = (page: DynamicPage) => {
        setData({
            title_en: page.title_en,
            title_bn: page.title_bn,
            slug: page.slug,
            content_en: page.content_en,
            content_bn: page.content_bn,
        });
        setEditId(page.id);
        setIsOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this custom page?')) {
            destroy(`/dashboard/pages/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            title_en: data.title_en,
            title_bn: data.title_bn,
            slug: data.slug,
            content_en: data.content_en,
            content_bn: data.content_bn,
        };

        if (editId) {
            router.put(`/dashboard/pages/${editId}`, payload, {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        } else {
            router.post('/dashboard/pages', payload, {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <Head title="Manage Custom Pages" />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Custom Pages</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Create dynamic pages with custom paragraphs and content.</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-1.5 rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-600 transition"
                >
                    <Plus className="h-4 w-4" />
                    <span>Create Page</span>
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-xs font-semibold text-slate-500 uppercase">
                                <th className="p-4">Title (English)</th>
                                <th className="p-4">Title (Bengali)</th>
                                <th className="p-4">URL Route</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                            {pages.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-slate-400">
                                        No custom pages created yet.
                                    </td>
                                </tr>
                            ) : (
                                pages.map((page) => (
                                    <tr key={page.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                                        <td className="p-4 font-semibold text-slate-900 dark:text-white">
                                            {page.title_en}
                                        </td>
                                        <td className="p-4 font-semibold text-slate-900 dark:text-white">
                                            {page.title_bn}
                                        </td>
                                        <td className="p-4 text-slate-500 flex items-center gap-1.5">
                                            <LinkIcon className="h-3.5 w-3.5" />
                                            <a 
                                                href={`/page/${page.slug}`} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="hover:underline text-rose-500 font-medium"
                                            >
                                                /page/{page.slug}
                                            </a>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <button
                                                    onClick={() => handleEdit(page)}
                                                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                                                    title="Edit Page"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(page.id)}
                                                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                                                    title="Delete Page"
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

            {/* Page Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                    <div className="relative w-full max-w-4xl rounded-2xl bg-white dark:bg-slate-950 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        <h3 className="text-lg font-bold mb-6">{editId ? 'Edit Custom Page' : 'Create Custom Page'}</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5">Page Title (English)</label>
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
                                        <label className="block text-xs font-semibold">Page Title (Bengali)</label>
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
                                <label className="block text-xs font-semibold mb-1.5">URL Slug (e.g. privacy-policy, leave blank for auto-generation)</label>
                                <input
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    placeholder="auto-generated-from-title"
                                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900"
                                />
                                {errors.slug && <p className="text-xs text-rose-500 mt-1">{errors.slug}</p>}
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
                                    <span>Save Page</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

Pages.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Pages', href: '/dashboard/pages' }]}>
        {page}
    </AppLayout>
);
