import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFavoritesStore = create(
    persist(
        (set, get) => ({
            favorites: [],

            toggleFavorite: (movie) => {
                const { favorites } = get();
                const exists = favorites.some((m) => m.id === movie.id);

                if(exists) {
                    set({ favorites: favorites.filter((m) => m.id !== movie.id) });
                } else {
                    set({ favorites: [...favorites, movie] });
                }
            },
        }),
        {
            name: 'cinematch_favorites',
        }
    )
);