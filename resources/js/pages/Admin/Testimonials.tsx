import { useState, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Plus, Edit2, Trash2, X, Star, Loader2, GripVertical } from 'lucide-react';
import { translateText } from '@/utils/translate';

interface Testimonial {
    id: number;
    customer_name: string;
    rating: number;
    comment_en: string;
    comment_bn: string;
    order: number;
}

interface Props {
    testimonials: Testimonial[];
}

export default function Testimonials({ testimonials = [] }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [localTestimonials, setLocalTestimonials] = useState<Testimonial[]>(testimonials);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    useEffect(() => {
        setLocalTestimonials(testimonials);
    }, [testimonials]);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        customer_name: '',
        rating: 5,
        comment_en: '',
        comment_bn: '',
        order: 0,
    });

    const handleCreate = () => {
        reset();
        setEditId(null);
        setIsOpen(true);
    };

    const handleEdit = (testimonial: Testimonial) => {
        setData({
            customer_name: testimonial.customer_name,
            rating: testimonial.rating,
            comment_en: testimonial.comment_en,
            comment_bn: testimonial.comment_bn,
            order: testimonial.order,
        });
        setEditId(testimonial.id);
        setIsOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            destroy(`/dashboard/testimonials/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editId) {
            put(`/dashboard/testimonials/${editId}`, {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        } else {
            post('/dashboard/testimonials', {
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
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedIndex === index) return;
        setDragOverIndex(index);
    };

    const handleDrop = (e: React.DragEvent, targetIndex: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === targetIndex) return;

        const updated = [...localTestimonials];
        const [draggedItem] = updated.splice(draggedIndex, 1);
        updated.splice(targetIndex, 0, draggedItem);

        // Reassign sequential orders
        const orders = updated.map((item, index) => ({
            id: item.id,
            order: index + 1,
        }));

        // Optimistically update UI
        setLocalTestimonials(updated.map((item, index) => ({ ...item, order: index + 1 })));

        router.post('/dashboard/testimonials/reorder', { orders }, {
            preserveScroll: true,
        });
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <Head title="Manage Testimonials" />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Testimonials</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Drag and drop cards or use Sort Order to configure how reviews display on the home page.</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-1.5 rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-600 transition"
                >
                    <Plus className="h-4 w-4" />
                    <span>Add Testimonial</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {localTestimonials.length === 0 ? (
                    <div className="col-span-full p-8 text-center text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                        No testimonials created yet.
                    </div>
                ) : (
                    localTestimonials.map((testimonial, index) => (
                        <div 
                            key={testimonial.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDrop={(e) => handleDrop(e, index)}
                            onDragEnd={handleDragEnd}
                            className={`bg-white dark:bg-slate-900 border rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-all select-none ${
                                draggedIndex === index ? 'opacity-40 bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800' : 'border-slate-200 dark:border-slate-800'
                            } ${
                                dragOverIndex === index ? 'border-2 border-rose-500 scale-105 shadow-lg' : ''
                            }`}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="cursor-grab active:cursor-grabbing p-1 text-slate-400 hover:text-rose-500 dark:text-slate-600 dark:hover:text-rose-400">
                                            <GripVertical className="h-4 w-4" />
                                        </div>
                                        <div className="flex gap-1 text-amber-400">
                                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-current" />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">Order: {testimonial.order}</span>
                                        <span className="text-xs text-slate-400">Rating: {testimonial.rating}/5</span>
                                    </div>
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{testimonial.customer_name}</h3>
                                <p className="text-xs text-slate-600 dark:text-slate-300 mb-2 italic">" {testimonial.comment_en} "</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 italic font-medium">" {testimonial.comment_bn} "</p>
                            </div>
                            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex items-center justify-end gap-2 mt-auto">
                                <button
                                    onClick={() => handleEdit(testimonial)}
                                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                                    title="Edit Testimonial"
                                >
                                    <Edit2 className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(testimonial.id)}
                                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                                    title="Delete Testimonial"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Testimonial Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                    <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-950 p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        <h3 className="text-lg font-bold mb-6">{editId ? 'Edit Testimonial' : 'Add Testimonial'}</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5">Customer Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.customer_name}
                                        onChange={(e) => setData('customer_name', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors.customer_name && <p className="text-xs text-rose-500 mt-1">{errors.customer_name}</p>}
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-xs font-semibold mb-1.5">Rating (1-5)</label>
                                        <input
                                            type="number"
                                            required
                                            min="1"
                                            max="5"
                                            value={data.rating}
                                            onChange={(e) => setData('rating', parseInt(e.target.value))}
                                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900"
                                        />
                                        {errors.rating && <p className="text-xs text-rose-500 mt-1">{errors.rating}</p>}
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
                            </div>

                            <div>
                                <label className="block text-xs font-semibold mb-1.5">Comment (English)</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={data.comment_en}
                                    onChange={(e) => setData('comment_en', e.target.value)}
                                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 resize-none"
                                />
                                {errors.comment_en && <p className="text-xs text-rose-500 mt-1">{errors.comment_en}</p>}
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="block text-xs font-semibold">Comment (Bengali)</label>
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            if (!data.comment_en.trim()) {
                                                alert('Please enter English comment first.');
                                                return;
                                            }
                                            try {
                                                const res = await translateText(data.comment_en);
                                                setData('comment_bn', res);
                                            } catch (err) {
                                                alert('Translation failed. Please try again.');
                                            }
                                        }}
                                        className="text-[10px] font-bold text-rose-500 hover:text-rose-600 transition"
                                    >
                                        Auto-Translate
                                    </button>
                                </div>
                                <textarea
                                    required
                                    rows={3}
                                    value={data.comment_bn}
                                    onChange={(e) => setData('comment_bn', e.target.value)}
                                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 resize-none"
                                />
                                {errors.comment_bn && <p className="text-xs text-rose-500 mt-1">{errors.comment_bn}</p>}
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
                                    <span>Save Testimonial</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

Testimonials.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Testimonials', href: '/dashboard/testimonials' }]}>
        {page}
    </AppLayout>
);
