import type { BreadcrumbItem, User } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage, WhenVisible } from '@inertiajs/react';
import UserItem from '@/components/user-item';
import { createElement } from 'react';

export default function Index({ users, page, lastPage }: {users: User[], page: number, lastPage: number}) {
    console.log(users)
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Users',
            href: '/user',
        },
    ];

    const successMessage: string = usePage().props.success as string;
    const fallback = createElement('div', {}, 'Loading...');

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
                    {users.map((user: User) => (
                        <UserItem user={user} key={user.id} />
                    ))}
                    {page < lastPage &&
                        <WhenVisible
                            fallback={fallback}
                            always
                            params={{
                                data: { page: page + 1 },
                                preserveUrl: true,
                                only: ['users', 'page'],
                            }}
                        >
                            Loading
                        </WhenVisible>
                    }
                    </tbody>
                </table>
            </div>


        </AppLayout>
    );
}
