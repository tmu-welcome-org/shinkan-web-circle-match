import { useContext } from 'react'
import { SelectedTagContext } from './selectedTagContext'

export const useSelectedTag = () => {
    const ctx = useContext(SelectedTagContext)
    if (!ctx) throw new Error('useSelectedTag must be used within SelectedTagProvider')
    return ctx
}