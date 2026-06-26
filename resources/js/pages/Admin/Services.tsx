import { useState, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Plus, Edit2, Trash2, X, Wrench, ShieldAlert, Wind, Disc, Check, Loader2, GripVertical } from 'lucide-react';
import { translateText } from '@/utils/translate';

interface Service {
    id: number;
    name_en: string;
    name_bn: string;
    description_en: string;
    description_bn: string;
    price: number;
    icon: string;
    order: number;
}

interface Props {
    services: Service[];
}

const iconsList = ['Wrench', 'ShieldAlert', 'Wind', 'Disc'];

export default function Services({ services = [] }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [localServices, setLocalServices] = useState<Service[]>(services);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    useEffect(() => {
        setLocalServices(services);
    }, [services]);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name_en: '',
        name_bn: '',
        description_en: '',
        description_bn: '',
        price: '',
        icon: 'Wrench',
        order: 0,
    });

    const handleCreate = () => {
        reset();
        setEditId(null);
        setIsOpen(true);
    };

    const handleEdit = (service: Service) => {
        setData({
            name_en: service.name_en,
            name_bn: service.name_bn,
            description_en: service.description_en,
            description_bn: service.description_bn,
            price: service.price.toString(),
            icon: service.icon,
            order: service.order,
        });
        setEditId(service.id);
        setIsOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this service?')) {
            destroy(`/dashboard/services/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editId) {
            put(`/dashboard/services/${editId}`, {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        } else {
            post('/dashboard/services', {
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

        const updated = [...localServices];
        const [draggedItem] = updated.splice(draggedIndex, 1);
        updated.splice(targetIndex, 0, draggedItem);

        // Reassign sequential orders
        const orders = updated.map((item, index) => ({
            id: item.id,
            order: index + 1,
        }));

        // Optimistically update UI
        setLocalServices(updated.map((item, index) => ({ ...item, order: index + 1 })));

        router.post('/dashboard/services/reorder', { orders }, {
            preserveScroll: true,
        });
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <Head title="Manage Services" />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Car Services</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Drag and drop the service cards or use their orders to arrange how they display on the home page.</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-1.5 rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-600 transition"
                >
                    <Plus className="h-4 w-4" />
                    <span>Add Service</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {localServices.length === 0 ? (
                    <div className="col-span-full p-8 text-center text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                        No services created yet.
                    </div>
                ) : (
                    localServices.map((service, index) => (
                        <div 
                            key={service.id}
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
                                        <span className="inline-flex rounded-lg bg-rose-500/10 p-2 text-rose-500">
                                            <Wrench className="h-5 w-5" />
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">Order: {service.order}</span>
                                        <span className="text-sm font-bold text-rose-500">৳{parseFloat(service.price.toString()).toLocaleString()}</span>
                                    </div>
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{service.name_en} <span className="text-xs font-normal text-slate-400">({service.name_bn})</span></h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">{service.description_en}</p>
                            </div>
                            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex items-center justify-end gap-2 mt-auto">
                                <button
                                    onClick={() => handleEdit(service)}
                                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                                    title="Edit Service"
                                >
                                    <Edit2 className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(service.id)}
                                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                                    title="Delete Service"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Service Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
                    <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-950 p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        <h3 className="text-lg font-bold mb-6">{editId ? 'Edit Service' : 'Add New Service'}</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold mb-1.5">Name (English)</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.name_en}
                                        onChange={(e) => setData('name_en', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors.name_en && <p className="text-xs text-rose-500 mt-1">{errors.name_en}</p>}
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-xs font-semibold">Name (Bengali)</label>
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                try {
                                                    const res = await translateText(data.name_en);
                                                    setData('name_bn', res);
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
                                        value={data.name_bn}
                                        onChange={(e) => setData('name_bn', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors.name_bn && <p className="text-xs text-rose-500 mt-1">{errors.name_bn}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-xs font-semibold mb-1.5">Price (BDT)</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        step="0.01"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900"
                                    />
                                    {errors.price && <p className="text-xs text-rose-500 mt-1">{errors.price}</p>}
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

                            <div>
                                <label className="block text-xs font-semibold mb-1.5">Description (English)</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={data.description_en}
                                    onChange={(e) => setData('description_en', e.target.value)}
                                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 resize-none"
                                />
                                {errors.description_en && <p className="text-xs text-rose-500 mt-1">{errors.description_en}</p>}
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="block text-xs font-semibold">Description (Bengali)</label>
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            if (!data.description_en.trim()) {
                                                alert('Please enter English description first.');
                                                return;
                                            }
                                            try {
                                                const res = await translateText(data.description_en);
                                                setData('description_bn', res);
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
                                    value={data.description_bn}
                                    onChange={(e) => setData('description_bn', e.target.value)}
                                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-rose-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 resize-none"
                                />
                                {errors.description_bn && <p className="text-xs text-rose-500 mt-1">{errors.description_bn}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold mb-3">Service Icon</label>
                                <div className="grid grid-cols-4 gap-3">
                                    {iconsList.map((iconName) => {
                                        const isSelected = data.icon === iconName;
                                        return (
                                            <button
                                                key={iconName}
                                                type="button"
                                                onClick={() => setData('icon', iconName)}
                                                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                                                    isSelected 
                                                        ? 'border-rose-500 bg-rose-500/10 text-rose-500 shadow-sm' 
                                                        : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900'
                                                }`}
                                            >
                                                {iconName === 'Wrench' && <Wrench className="h-5 w-5" />}
                                                {iconName === 'ShieldAlert' && <ShieldAlert className="h-5 w-5" />}
                                                {iconName === 'Wind' && <Wind className="h-5 w-5" />}
                                                {iconName === 'Disc' && <Disc className="h-5 w-5" />}
                                                <span className="text-[10px] mt-1.5 font-medium">{iconName}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                                {errors.icon && <p className="text-xs text-rose-500 mt-1">{errors.icon}</p>}
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
                                    <span>Save Service</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

Services.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Services', href: '/dashboard/services' }]}>
        {page}
    </AppLayout>
);
