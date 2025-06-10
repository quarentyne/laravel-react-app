import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    permissions: string[];
    roles: string[];
    [key: string]: unknown; // This allows for additional properties...
}

export type PaginatedData<T> = {
    data: T[];
    links: Record<string, string>;
}

export interface Feature {
    id: number;
    name: string;
    description: string;
    created_at: string;
    upvote_count: number;
    user_has_upvoted: boolean;
    user_has_downvoted: boolean;
    user: User;
}
