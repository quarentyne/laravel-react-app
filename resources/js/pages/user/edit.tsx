import { BreadcrumbItem, User } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { ROLES } from '@/constants/permissions';
import { Checkbox } from '@/components/ui/checkbox';

export default function Edit({ user }: { user: User }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Users',
            href: '/user',
        },
        {
            title: 'Edit User',
            href: '/user/' +  + user.id + '/edit/',
        },
    ];
    const {
        data,
        setData,
        processing,
        errors,
        put
    } = useForm({
        'name': user.name,
        'email': user.email,
        'roles': user.roles,
    });

    const onChangeRole = e => {
        if(e.target.dataset.state === 'unchecked') {
            setData('roles', [...data.roles, e.target.value]);
        } else {
            setData('roles', [...data.roles.filter(role => role !== e.target.value)]);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('user.update', user.id), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit User" />
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
                                placeholder="Name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Email</Label>

                            <Input
                                id="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="email"
                                placeholder="Email"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>
                        <div className="grid gap-1">
                            {
                                Object.keys(ROLES).map(role => (
                                    <div className="flex items-center space-x-3" key={role}>
                                        <Checkbox
                                            id={role}
                                            value={role.toLowerCase()}
                                            name={`roles[${ROLES[role]}]]`}
                                            checked={data.roles.includes(ROLES[role])}
                                            onClick={onChangeRole}
                                        />
                                        <Label htmlFor={role}>{ROLES[role].charAt(0).toUpperCase() + ROLES[role].slice(1)}</Label>
                                    </div>
                                ))
                            }
                            <InputError message={errors.roles} />
                        </div>
                        <Button disabled={processing}>Update</Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
