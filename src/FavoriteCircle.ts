import appConfig from "./config.json"
import { useState } from "react"

export const useFavoriteCircle = (year: string) => {
    const [favoritesByYear, setFavoritesByYear] = useState<Record<string, string[]>>(() => {
        const manager = new FavoriteCircleManager()
        return manager.getAllFavorites()
    })

    const favoriteIds = [...new Set(favoritesByYear[year] || [])]

    const toggleFavorite = (circleID: string) => {
        setFavoritesByYear((prev) => {
            const current = [...new Set(prev[year] || [])]
            const next = current.includes(circleID)
                ? current.filter((id) => id !== circleID)
                : [...current, circleID]

            const nextAll = {
                ...prev,
                [year]: next,
            }

            const manager = new FavoriteCircleManager()
            manager.saveAllFavorites(nextAll)

            return nextAll
        })
    }

    const isFavorite = (circleID: string) => favoriteIds.includes(circleID)

    return {
        favoriteIds,
        isFavorite,
        toggleFavorite,
    }

}

export class FavoriteCircleManager {
    private storageKey = appConfig.favorite_storage_key;

    private readStorage(): Record<string, string[]> {
        if (typeof window === "undefined") {
            return {};
        }

        try {
            const raw = localStorage.getItem(this.storageKey);
            if (!raw) {
                return {};
            }

            const parsed = JSON.parse(raw) as unknown;
            if (!parsed || typeof parsed !== "object") {
                return {};
            }

            return parsed as Record<string, string[]>;
        } catch {
            return {};
        }
    }

    private writeStorage(favorites: Record<string, string[]>) {
        if (typeof window === "undefined") {
            return;
        }

        localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }

    public getAllFavorites(): Record<string, string[]> {
        return this.readStorage();
    }

    public saveAllFavorites(favoritesByYear: Record<string, string[]>) {
        this.writeStorage(favoritesByYear);
    }
    
}