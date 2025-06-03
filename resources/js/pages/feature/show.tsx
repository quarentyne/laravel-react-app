import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Feature } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Show({feature}: {feature: Feature}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Features',
            href: '/feature',
        },
        {
            title: feature.name,
            href: `/feature/${feature.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={feature.name} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                    <div
                        className="flex gap-8 border-sidebar-border/70 dark:border-sidebar-border relative rounded-xl border p-4">
                        <div className="flex flex-col items-center">
                            <button type="button" className="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5"
                                     stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                </svg>
                            </button>
                            <span className="text-2xl font-semibold">1</span>
                            <button type="button" className="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5"
                                     stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl mb-2">{feature.name}</h2>
                            <p>{feature.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
