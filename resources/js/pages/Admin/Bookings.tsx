import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    Clock, 
    CheckCircle2, 
    XCircle, 
    AlertCircle, 
    Trash2, 
    Calendar,
    User,
    Mail,
    Phone,
    Car
} from 'lucide-react';

interface Booking {
    id: number;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    car_make: string;
    car_model: string;
    booking_date: string;
    booking_time: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    notes: string | null;
    service: {
        name_en: string;
        name_bn: string;
    };
}

interface Props {
    bookings: Booking[];
}

const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400',
    confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400',
    completed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400',
    cancelled: 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400',
};

export default function Bookings({ bookings = [] }: Props) {
    const { patch, delete: destroy } = useForm();

    const handleStatusUpdate = (id: number, status: string) => {
        patch(`/dashboard/bookings/${id}/status`, {
            data: { status },
            preserveScroll: true,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this booking?')) {
            destroy(`/dashboard/bookings/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            <Head title="Manage Bookings" />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Appointment Bookings</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">View and manage service reservations.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-xs font-semibold text-slate-500 uppercase">
                                <th className="p-4">Customer</th>
                                <th className="p-4">Vehicle</th>
                                <th className="p-4">Service & Time</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                            {bookings.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-400">
                                        No bookings scheduled yet.
                                    </td>
                                </tr>
                            ) : (
                                bookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                                        <td className="p-4 space-y-1">
                                            <div className="font-semibold flex items-center gap-1.5">
                                                <User className="h-3.5 w-3.5 text-slate-400" />
                                                <span>{booking.customer_name}</span>
                                            </div>
                                            <div className="text-xs text-slate-500 flex items-center gap-1.5">
                                                <Mail className="h-3 w-3" />
                                                <span>{booking.customer_email}</span>
                                            </div>
                                            <div className="text-xs text-slate-500 flex items-center gap-1.5">
                                                <Phone className="h-3 w-3" />
                                                <span>{booking.customer_phone}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1.5 font-medium">
                                                <Car className="h-3.5 w-3.5 text-slate-400" />
                                                <span>{booking.car_make} {booking.car_model}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 space-y-1">
                                            <div className="font-medium text-slate-950 dark:text-white">{booking.service?.name_en}</div>
                                            <div className="text-xs text-slate-500 flex items-center gap-1.5">
                                                <Calendar className="h-3.5 w-3.5" />
                                                <span>{booking.booking_date}</span>
                                            </div>
                                            <div className="text-xs text-slate-500 flex items-center gap-1.5">
                                                <Clock className="h-3.5 w-3.5" />
                                                <span>{booking.booking_time}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[booking.status]}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                {booking.status === 'pending' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                                                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20"
                                                        title="Confirm Booking"
                                                    >
                                                        <CheckCircle2 className="h-4.5 w-4.5" />
                                                    </button>
                                                )}
                                                {booking.status === 'confirmed' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(booking.id, 'completed')}
                                                        className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20"
                                                        title="Complete Service"
                                                    >
                                                        <CheckCircle2 className="h-4.5 w-4.5" />
                                                    </button>
                                                )}
                                                {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                                                        className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/20"
                                                        title="Cancel Booking"
                                                    >
                                                        <XCircle className="h-4.5 w-4.5" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(booking.id)}
                                                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                                                    title="Delete Booking"
                                                >
                                                    <Trash2 className="h-4.5 w-4.5" />
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
        </div>
    );
}

Bookings.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }, { title: 'Bookings', href: '/dashboard/bookings' }]}>
        {page}
    </AppLayout>
);
