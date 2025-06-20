import { User } from '@/types';
import { Link } from '@inertiajs/react';

export default function UserItem({ user }: { user: User }) {

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.name}
            </th>
            <td className="px-6 py-4">
                {user.email}
            </td>
            <td className="px-6 py-4">
                {user.created_at}
            </td>
            <td className="px-6 py-4">
                {user.roles.join(', ')}
            </td>
            <td className="px-6 py-4 grid gap-2">
                <Link className="block w-full text-center text-blue-500" href={route('user.edit', user.id)}>Edit</Link>
                <Link className="block w-full text-center cursor-pointer text-red-500" method="delete" href={route('user.destroy', user.id)}>Delete</Link>
            </td>
        </tr>
    );
}
