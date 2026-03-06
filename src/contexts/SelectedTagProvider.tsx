import appConfig from '../config.json'
import { useState, useMemo, type ReactNode } from 'react'
import type { CircleData, CircleItem } from '../CircleDataHandler'
import { SelectedTagContext } from './selectedTagContext'


export const SelectedTagProvider = ({ children }: { children: ReactNode }) => {

    function initializeTags(type: "single" | "multi"): Record<string, string[]> {

        const category = type === "single" ? appConfig.tags_category.single_select : appConfig.tags_category.multi_select
        const initial: Record<string, string[]> = {}
        for (const [key] of Object.entries(category)) {
            initial[key] = []
        }
        return initial
    }

    const [selectedSingleTags, setSelectedSingleTags] = useState<Record<string, string[]>>(() => {
        return initializeTags("single")
    })
    const [selectedMultiTags, setSelectedMultiTags] = useState<Record<string, string[]>>(() => {
        return initializeTags("multi")
    })

    const toggleSingleTag = (category: string, tag: string) => { 
        setSelectedSingleTags(prev => {
            return {
                ...prev,
                [category]: prev[category].includes(tag) ?
                    prev[category].filter(t => t !== tag) :
                    [...prev[category], tag]
            }
        })
     }
    const toggleMultiTag = (category: string, tag: string) => { 
        setSelectedMultiTags(prev => {
            return {
                ...prev,
                [category]: prev[category].includes(tag) ?
                    prev[category].filter(t => t !== tag) :
                    [...prev[category], tag]
            }
        })
    }

    const resetTags = () => {
        setSelectedSingleTags(() => {
            return initializeTags("single")
        })
        setSelectedMultiTags(() => {
            return initializeTags("multi")
        })
    }

    const getSelectedTags = useMemo(() => {
        return () => { 
            const singleTags = Object.values(selectedSingleTags).flat()
            const multiTags = Object.values(selectedMultiTags).flat()
            return [...singleTags, ...multiTags]
        }
    }, [selectedSingleTags, selectedMultiTags])

    const filterCirclesByTags = useMemo(() => {
        return (circleData: CircleData): CircleData => {
            const selectedTags = getSelectedTags()
            if (selectedTags.length === 0) {
                return circleData // None selected tags, return all circles
            }

            const filteredCircles: Record<string, CircleItem> = { ...circleData.circles }
            
            for (const [, singleTagsInCategory] of Object.entries(selectedSingleTags)) { 
                if (singleTagsInCategory.length === 0) {
                    continue // No tag selected in this category => allow remaining circles
                }

                for (const [id, circle] of Object.entries(filteredCircles)) {
                    if (!singleTagsInCategory.some(t => circle.tags.includes(t))) {
                        delete filteredCircles[id] // Exclude circles that do not have any of the selected tags in this category
                    }
                }
            }
            for (const [, multiTagsInCategory] of Object.entries(selectedMultiTags)) {
                if (multiTagsInCategory.length === 0) {
                    continue // No tag selected in this category => allow remaining circles
                }

                for (const [id, circle] of Object.entries(filteredCircles)) {
                    if (!multiTagsInCategory.every(t => circle.tags.includes(t))) {
                        delete filteredCircles[id] // Exclude circles that do not have all of the selected tags in this category
                    }
                }
            }
            return {
                metadata: circleData.metadata,
                circles: filteredCircles
            }
        }
    }, [selectedSingleTags, selectedMultiTags, getSelectedTags])

    return (
        <SelectedTagContext.Provider value={{
            selectedSingleTags, selectedMultiTags,
            toggleSingleTag, toggleMultiTag,
            resetTags, getSelectedTags,
            filterCirclesByTags, 
        }}>
            {children}
        </SelectedTagContext.Provider>
    )
}