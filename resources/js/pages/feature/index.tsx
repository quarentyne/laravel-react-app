import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Feature } from '@/types';
import { Head, Link, usePage, WhenVisible } from '@inertiajs/react';
import FeatureItem from '@/components/feature-item';
import { Button } from '@/components/ui/button';
import { useCan } from '@/hooks/use-can';
import { PERMISSIONS } from '@/constants/permissions';
import { createElement, ReactElement } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Features',
        href: '/feature',
    },
];

export default function Index({features, page, lastPage}: {features: Feature[], page: number, lastPage: number}) {
    const successMessage: string = usePage().props.success as string;
    const canCreate = useCan(PERMISSIONS.MANAGE_FEATURES);

    const fallback: ReactElement = createElement('div', {}, 'Loading...');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Features" />
            <>
                {successMessage && <div className="bg-emerald-400 p-6 m-4 rounded">{successMessage}</div>}
            </>
            <>
            {canCreate &&
                <Link href={route('feature.create')} className="m-4">
                    <Button className="cursor-pointer" variant="default">Create new Feature</Button>
                </Link>
            }
            </>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                    {features.map((feature) => (
                        <FeatureItem key={feature.id} feature={feature} />
                    ))}
                    {page < lastPage && <WhenVisible fallback={fallback}
                                 always
                                 params={{
                                     data: { page: page + 1 },
                                     preserveUrl: true,
                                     only: ['features', 'page'],
                                 }}>
                        This is loading
                    </WhenVisible>}
                </div>
            </div>
        </AppLayout>
    );
}
