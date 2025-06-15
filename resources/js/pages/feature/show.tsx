import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Feature } from '@/types';
import { Head } from '@inertiajs/react';
import FeatureUpvoteDownvote from '@/components/feature-upvote-downvote';
import NewCommentForm from '@/components/new-comment-form';
import CommentItem from '@/components/comment-item';

export default function Show({feature}: {feature: Feature}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Features',
            href: '/feature',
        },
        {
            title: feature.name,
            href: `/feature/${feature.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={feature.name} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                    <div
                        className="flex gap-8 border-sidebar-border/70 dark:border-sidebar-border relative rounded-xl border p-4">
                        <FeatureUpvoteDownvote feature={feature} />
                        <div className="flex-1">
                            <h2 className="text-2xl mb-2">{feature.name}</h2>
                            <p>{feature.description}</p>
                            <div className="mt-8">
                                <NewCommentForm feature={feature}/>
                                <div className="mt-4">
                                    {feature.comments.map((comment) => (
                                        <CommentItem comment={comment} key={comment.id} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
