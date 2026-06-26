import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    Calendar, 
    Clock, 
    CheckCircle, 
    Wrench, 
    MessageSquare,
    TrendingUp,
    Car,
    User,
    ArrowUpRight
} from 'lucide-react';

interface Stats {
    total_bookings: number;
    pending_bookings: number;
    confirmed_bookings: number;
    completed_bookings: number;
    total_services: number;
    total_testimonials: number;
}

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
    service: {
        name_en: string;
    };
}

interface Props {
    stats: Stats;
    recent_bookings: Booking[];
}

export default function Dashboard({ stats, recent_bookings = [] }: Props) {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            <Head title="Dashboard" />

            <div>
                <h1 className="text-2xl font-bold tracking-tight">Workshop Dashboard</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">Overview of your car servicing business operations.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Pending Bookings */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex items-center justify-between shadow-sm">
                    <div className="space-y-1">
                        <span className="text-xs text-slate-500 uppercase font-semibold">Pending Bookings</span>
                        <div className="text-3xl font-extrabold text-amber-500">{stats.pending_bookings}</div>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                        <Clock className="h-6 w-6" />
                    </div>
                </div>

                {/* Confirmed Bookings */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex items-center justify-between shadow-sm">
                    <div className="space-y-1">
                        <span className="text-xs text-slate-500 uppercase font-semibold">Active Jobs</span>
                        <div className="text-3xl font-extrabold text-blue-500">{stats.confirmed_bookings}</div>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                        <Calendar className="h-6 w-6" />
                    </div>
                </div>

                {/* Completed Jobs */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex items-center justify-between shadow-sm">
                    <div className="space-y-1">
                        <span className="text-xs text-slate-500 uppercase font-semibold">Completed Jobs</span>
                        <div className="text-3xl font-extrabold text-emerald-500">{stats.completed_bookings}</div>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                        <CheckCircle className="h-6 w-6" />
                    </div>
                </div>

                {/* Services Catalog */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex items-center justify-between shadow-sm">
                    <div className="space-y-1">
                        <span className="text-xs text-slate-500 uppercase font-semibold">Total Services</span>
                        <div className="text-3xl font-extrabold text-rose-500">{stats.total_services}</div>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                        <Wrench className="h-6 w-6" />
                    </div>
                </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Bookings List */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 lg:col-span-2 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                        <h2 className="font-bold text-lg">Recent Appointments</h2>
                        <a href="/dashboard/bookings" className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-0.5">
                            <span>View All</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                    </div>

                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {recent_bookings.length === 0 ? (
                            <div className="text-center py-6 text-slate-400 text-sm">No appointments scheduled yet.</div>
                        ) : (
                            recent_bookings.map((booking) => (
                                <div key={booking.id} className="py-3.5 flex items-center justify-between text-sm">
                                    <div className="space-y-0.5">
                                        <div className="font-semibold flex items-center gap-1.5 text-slate-900 dark:text-white">
                                            <User className="h-3.5 w-3.5 text-slate-400" />
                                            <span>{booking.customer_name}</span>
                                        </div>
                                        <div className="text-xs text-slate-500 flex items-center gap-1.5">
                                            <Car className="h-3.5 w-3.5" />
                                            <span>{booking.car_make} {booking.car_model} - {booking.service?.name_en}</span>
                                        </div>
                                    </div>
                                    <div className="text-right space-y-1">
                                        <div className="text-xs font-medium text-slate-600 dark:text-slate-300">{booking.booking_date}</div>
                                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                            booking.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                                            booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                            booking.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                                            'bg-rose-100 text-rose-800'
                                        }`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Additional Stats Overview */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
                    <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                        <h2 className="font-bold text-lg">Workshop Overview</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                <span className="text-sm font-medium">Customer Reviews</span>
                            </div>
                            <span className="text-sm font-bold">{stats.total_testimonials} Testimonials</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                                <span className="text-sm font-medium">Total Bookings</span>
                            </div>
                            <span className="text-sm font-bold">{stats.total_bookings} Bookings</span>
                        </div>
                    </div>

                    <div className="rounded-xl bg-slate-50 dark:bg-slate-950 p-4 border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm">Business Operations</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">All modules loaded. Access configurations inside navigation sidebar.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Dashboard.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}>
        {page}
    </AppLayout>
);
