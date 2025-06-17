import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Feature, PaginatedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import FeatureItem from '@/components/feature-item';
import { Button } from '@/components/ui/button';
import { useCan } from '@/hooks/use-can';
import { PERMISSIONS } from '@/constants/permissions';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Features',
        href: '/feature',
    },
];

export default function Index({features}: {features: PaginatedData<Feature>}) {
    const successMessage: string = usePage().props.success as string;
    const canCreate = useCan(PERMISSIONS.MANAGE_FEATURES);

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
                    {features.data.map((feature) => (
                        <FeatureItem key={feature.id} feature={feature} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
