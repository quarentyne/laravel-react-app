import { Feature } from '@/types';
import { useState } from 'react';
import { Link } from '@inertiajs/react';
import FeatureActionsDropdown from '@/components/feature-actions-dropdown';
import FeatureUpvoteDownvote from '@/components/feature-upvote-downvote';
import { Button } from '@/components/ui/button';

export default function FeatureItem({ feature }: { feature: Feature }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const isLongText = feature.description.length > 500;

    return (
        <div
            className="flex gap-8 border-sidebar-border/70 dark:border-sidebar-border relative rounded-xl border p-4">
            <FeatureUpvoteDownvote feature={feature} />
            <div className="flex-1">
                <Link className="text-2xl mb-2" href={route('feature.show', feature.id)}>
                    {feature.name}
                </Link>
                <p>{isExpanded ? feature.description : `${isLongText ? feature.description.slice(0, 500) + '...' : feature.description}`}</p>
                {isLongText &&
                    <button type="button" onClick={toggleReadMore}
                            className="text-amber-500 hover:underline cursor-pointer">
                        {isExpanded ? 'Read Less' : 'Read More'}
                    </button>
                }
                <div className="mt-2">
                    <Link href={route('feature.show', feature.id)}>
                        <Button className="cursor-pointer" variant='outline'>Comments</Button>
                    </Link>
                </div>
            </div>
            <div>
                <FeatureActionsDropdown feature={feature} />
            </div>
        </div>
    );
}
