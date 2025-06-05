import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { EllipsisVertical, SquarePen, Trash2 } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Feature } from '@/types';

export default function FeatureActionsDropdown({feature}: {feature: Feature}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent group">
                    <EllipsisVertical className="ml-auto size-4" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                align="end"
            >
                <DropdownMenuItem asChild>
                    <Link className="block w-full" href={route('feature.edit', feature.id)}>
                        <SquarePen className="mr-2" />
                        Edit Feature
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link className="block w-full" method="delete" href={route('feature.destroy', feature.id)}>
                        <Trash2 className="mr-2" />
                        Delete Feature
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
