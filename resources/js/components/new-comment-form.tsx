import { useForm } from '@inertiajs/react';
import { Feature } from '@/types';
import { Textarea } from '@/components/ui/textarea';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';

export default function NewCommentForm({ feature }: { feature: Feature }) {
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
