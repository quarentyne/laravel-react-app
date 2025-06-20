import { usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';

export function useHasRole(role: string): boolean {
    const { auth } = usePage<SharedData>().props;

    return (auth.user && auth.user.roles.includes(role));
}
