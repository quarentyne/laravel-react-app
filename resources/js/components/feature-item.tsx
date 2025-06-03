import { Feature } from '@/types';
import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function FeatureItem({ feature }: { feature: Feature }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
       setIsExpanded(!isExpanded);
    };

    const isLongText = feature.description.length > 500;

    return (
        <div
            className="flex gap-8 border-sidebar-border/70 dark:border-sidebar-border relative rounded-xl border p-4">
            <div className="flex flex-col items-center">
                <button type="button" className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="size-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg>
                </button>
                <span className="text-2xl font-semibold">1</span>
                <button type="button" className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="size-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
            </div>
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
            </div>
        </div>
    );
}
