import { Feature } from '@/types';
import { useState } from 'react';

export default function FeatureItem({ feature }: { feature: Feature }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
       setIsExpanded(!isExpanded);
    };

    return (
        <div
            className="flex gap-8 border-sidebar-border/70 dark:border-sidebar-border relative rounded-xl border">
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
                <h3 className="text-2xl mb-2">{feature.name}</h3>
                <p>{isExpanded ? feature.description : `${feature.description.slice(0, 500)}...`}</p>
                {feature.description.length > 500 &&
                    <button type="button" onClick={toggleReadMore}
                            className="text-amber-500 hover:underline cursor-pointer">
                        {isExpanded ? 'Read Less' : 'Read More'}
                    </button>
                }
            </div>
        </div>
    );
}
