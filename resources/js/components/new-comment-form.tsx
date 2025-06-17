import { useForm } from '@inertiajs/react';
import { Feature } from '@/types';
import { Textarea } from '@/components/ui/textarea';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { useCan } from '@/hooks/use-can';
import { PERMISSIONS } from '@/constants/permissions';

export default function NewCommentForm({ feature }: { feature: Feature }) {
    const canComment = useCan(PERMISSIONS.MANAGE_COMMENTS);
    const {data, setData, processing, post} = useForm({
        comment: '',
    });

    const createComment: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('comment.store', feature.id), {
            preserveState: 'errors',
            preserveScroll: true,
        });
    };

    if(!canComment) {
        return (
            <div className="text-center text-gray-600">You don't have permissions to leave comments</div>
        )
    }

    if(canComment) {
        return (
            <form onSubmit={createComment} className="px-3 py-2 rounded-lg bg-gray-500 dark:bg-gray-800">
                <label className="sr-only" htmlFor="comment-input">Your comment</label>
                <Textarea
                    onChange={(e) => setData('comment', e.target.value)}
                    id="comment-input"
                    value={data.comment}
                    placeholder="Your comment"
                    className="resize-none block mt-1 mb-2 w-full"
                ></Textarea>
                <Button type="submit" disabled={processing}>Add comment</Button>
            </form>
        );
    }
}
