import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Feature } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';

export default function Edit({feature}: { feature: Feature }) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Features',
            href: '/feature',
        },
        {
            title: 'Edit Feature',
            href: '/feature/edit/' + feature.id,
        },
    ];
    const {
        data,
        setData,
        processing,
        errors,
        put
    } = useForm({
        'name': feature.name,
        'description': feature.description,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('feature.update', feature.id), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Feature" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Feature name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Description</Label>

                            <Textarea
                                id="description"
                                className="mt-1 block w-full"
                                onChange={(e) => setData('description', e.target.value)}
                                required
                                autoComplete="description"
                                placeholder="Feature description"
                                value={data.description}
                            ></Textarea>

                            <InputError className="mt-2" message={errors.name} />
                        </div>
                        <Button disabled={processing}>Update</Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
