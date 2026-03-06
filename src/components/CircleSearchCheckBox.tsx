import { useSelectedTag } from "../contexts/selectedTag";

export type CircleSearchCheckBoxProps = {
    label: string;
    items: string[];
    filterCategory: 'single' | 'multi';
}

export default function CircleSearchCheckBox({ label, items, filterCategory }: CircleSearchCheckBoxProps) {
    const { toggleSingleTag, toggleMultiTag, getSelectedTags } = useSelectedTag()

    const handleChange = (category:string, tag: string) => {
        switch (filterCategory) {
            case 'single':
                toggleSingleTag(category, tag)
                break;
            case 'multi':
                toggleMultiTag(category, tag)
                break;
        }
    }

    const isChecked = (tag: string) => {
        const selectedTags = getSelectedTags()
        return selectedTags.includes(tag)
    }

    return (
        <div>
        <div className='flex items-center gap-x-[1rem] mt-5 mb-2'>
        <h3 className='font-medium shrink-0'>{label}</h3> 
        <div className='w-full h-[0.1rem] bg-green-700'></div>
        </div>
            <fieldset className='flex gap-2 w-full flex-wrap'>
                
            {items.map((item, index) => (
                <button
                    key={index}
                    className={`flex width-fit min-w-[33%] items-center justify-center text-nowrap flex-nowrap grow cursor-pointer border-green-700 rounded-md p-1 border-2 transition-all hover:bg-green-50 ${isChecked(item) ? 'bg-green-700 text-white hover:bg-green-800' : ''}`}
                    onClick={() => handleChange(label, item)}
                >
                    {item}
                </button>
            ))}

        </fieldset>
        </div>
    )
}