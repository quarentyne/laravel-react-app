import type { BreadcrumbItem, User, PaginatedData } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import UserItem from '@/components/user-item';

export default function Index({ users }: {users: PaginatedData<User>}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Users',
            href: '/user',
        },
    ];

    const successMessage: string = usePage().props.success as string;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <>
                {successMessage && <div className="bg-emerald-400 p-6 m-4 rounded">{successMessage}</div>}
            </>


            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Registered at
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Roles
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.data.map((user: User) => (
                        <UserItem user={user} key={user.id} />
                    ))}
                    </tbody>
                </table>
            </div>


        </AppLayout>
    );
}
