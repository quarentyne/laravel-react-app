import { Comment } from '@/types';
import { useForm } from '@inertiajs/react';
import { useCan } from '@/hooks/use-can';
import { PERMISSIONS } from '@/constants/permissions';

export default function CommentItem({ comment }: { comment: Comment }) {
    const canDelete = useCan(PERMISSIONS.MANAGE_COMMENTS, comment.user.id);
    const form = useForm();

    const deleteComment = () => {
        form.delete(route('comment.destroy', comment.id), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <div className="flex gap-4 mb-3">
            <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </div>
            <div className="flex-1">
                <h3 className="font-bold mt-1">
                    {comment.user.name}
                    <span className="text-gray-500 text-xs ml-4">{comment.created_at}</span>
                </h3>
                <div className="italic mt-1">{comment.comment}</div>
            </div>
            {
                canDelete &&
                <div className="flex items-center p-2">
                    <button onClick={deleteComment} className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
            }
        </div>
    );
}
