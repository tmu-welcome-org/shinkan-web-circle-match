import { createContext } from 'react'
import type { CircleData } from '../CircleDataHandler'

type SelectedTagContextType = {
    selectedSingleTags: Record<string, string[]> 
    selectedMultiTags: Record<string, string[]> 
    toggleSingleTag: (category: string, tag: string) => void
    toggleMultiTag: (category: string, tag: string) => void
    resetTags: () => void
    getSelectedTags: () => string[]
    filterCirclesByTags: (circleData: CircleData) => CircleData
}
    
export const SelectedTagContext = createContext<SelectedTagContextType | null>(null)

