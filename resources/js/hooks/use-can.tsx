import { usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';

export function useCan(permission: string, ownerId?: number): boolean {
    const { auth } = usePage<SharedData>().props;

    if(!auth.user) return false;
    const hasPermission = auth.user.permissions.includes(permission);
    const isOwner = ownerId ? auth.user.id === ownerId: true;

    return hasPermission && isOwner;
}
