import appConfig from '../config.json'
import { type CircleItem } from '../CircleDataHandler'
import LazyImageWithSpinner from './LazyImageWithSpinner'

import { FaArrowRight } from 'react-icons/fa'

export type CircleCardProps = {
    id: string;
    highlighted_tags?: string[];
    circleItem: CircleItem | undefined;
    onCardClick?: (id: string) => void;

}

export default function CircleCard({id, highlighted_tags, circleItem, onCardClick }: CircleCardProps) {
    
    if (!circleItem) { // circleItem is undefined, return a placeholder card or null
        return null;
    }

    const item = circleItem

    const images_dir = `${import.meta.env.BASE_URL}${appConfig.circle_data_dir}/${appConfig.circle_images_dir}/${id}/`

    {/* Find Highlighted Tags in the Item.tags first and move to first, then other tags */}
    const highlightedTags = item.tags.filter(tag => highlighted_tags?.includes(tag))
    const otherTags = item.tags.filter(tag => !highlighted_tags?.includes(tag))
    const orderedTags = [...highlightedTags, ...otherTags]


    return (
        <div className="card bg-base-100 shadow-xl group cursor-pointer max-w-[30rem]" onClick={() => onCardClick?.(id)}>
            <figure className="aspect-square">
                <LazyImageWithSpinner
                    src={`${images_dir}${item.images[0]}`}
                    alt={item.circle_name}
                    className={"w-full h-full object-cover"}
                />
            </figure>
            <div className="card-body gap-y-7 justify-between">
            <div className='flex gap-y-7 flex-col'>
                <div>
                    <h2 className="card-title">{circleItem.circle_name}</h2>
                    <p>{circleItem.catchphrase}</p>
                </div>
                <div className='flex gap-2 flex-wrap'>
                    {/* Display Highlighted Tags first, then display other tags */}
                    {orderedTags.map((tag, index) => (
                        <div key={index} className={`rounded-[0.2rem] border-green-800 border px-3 text-nowrap ${highlighted_tags?.includes(tag) ? 'bg-green-700 text-white' : 'bg-white text-gray-800'}`}>
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-between items-center">
                    <FaArrowRight className="w-4 h-4 text-slate-700  transition-all group-hover:translate-x-2" />

                    {/* stop propagation */}
                    {/* <button className="btn btn-circle" onClick={(e) => {
                        e.stopPropagation()
                        onFavoriteClicked?.(id)
                    }}>
                        <FaRegHeart className="w-6 h-6 text-slate-700" />
                    </button> */}
            </div>
        </div>
      </div>
    )
}
