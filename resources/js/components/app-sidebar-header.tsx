import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { toUrl } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className="ml-auto flex items-center">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <a
                            href={toUrl('/')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent p-0 text-sm font-medium text-accent-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                        >
                            <span className="sr-only">View Website</span>
                            <ExternalLink className="size-5 opacity-80 group-hover:opacity-100" />
                        </a>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>View Website</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </header>
    );
}
