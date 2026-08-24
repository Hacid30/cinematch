'use client';

import { useState, useEffect } from "react";
import { useFavoritesStore } from "@/store/useFavoritesStore";

export default function FavoriteButton({ movie }){
    const [ mounted, setMounted ] = useState(false);
    const { favorites, toggleFavorite } = useFavoritesStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="p-2.5 rounded-full bg-slate-900/60 text-slate-400">
                🤍
            </button>
        )
    }

    const isFav = favorites.some((m) => m.id === movie.id);

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(movie);
    };

    return (
        <button
            onClick={handleClick}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg ${
                isFav
                    ? 'bg-rose-500/90 text-white hover:scale-110'
                    : 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-900/90 hover:scale-110'
            }`}
            title={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
            {isFav ? '❤️' : '🤍'}
        </button>
    )
}