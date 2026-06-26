import { Link } from '@inertiajs/react';
import { LayoutGrid, Calendar, Wrench, MessageSquare, Menu as MenuIcon, Settings as SettingsIcon, FileText, Columns, Image as ImageIcon } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Bookings',
        href: '/dashboard/bookings',
        icon: Calendar,
    },
    {
        title: 'Services',
        href: '/dashboard/services',
        icon: Wrench,
    },
    {
        title: 'Testimonials',
        href: '/dashboard/testimonials',
        icon: MessageSquare,
    },
    {
        title: 'Menus',
        href: '/dashboard/menus',
        icon: MenuIcon,
    },
    {
        title: 'Sections',
        href: '/dashboard/sections',
        icon: FileText,
    },
    {
        title: 'Hero Slides',
        href: '/dashboard/hero-slides',
        icon: ImageIcon,
    },
    {
        title: 'Footer Section',
        href: '/dashboard/footer-columns',
        icon: Columns,
    },
    {
        title: 'Settings',
        href: '/dashboard/settings',
        icon: SettingsIcon,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
