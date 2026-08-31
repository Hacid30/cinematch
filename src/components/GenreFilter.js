'use client';

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function GenreFilter( { genres, selectedGenre }){
    const router = useRouter();
    const pahname = usePathname();
    const SearchParams =  useSearchParams();

    const handleGenreClick = (genreId) => {
        const params = new URLSearchParams(SearchParams);

        params.delete('page');

        if (genreId) {
            params.set('genre', genreId.toString());
        } else {
            params.delete('genre');
        }

        router.push(`${pahname}?${params.toString()}`);
    }

    return(
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto mb-8">
            <button
                onClick={() => handleGenreClick(null)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors border ${
                    !selectedGenre
                        ? 'bg-sky-500 text-slate-950 border-sky-400 font-bold shadow-lg shadow-sky-500/20'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                }`}
            >
                Todos
            </button>

            {genres.map((genre) => {
                const isActive = selectedGenre === genre.id.toString();
                
                return (
                    <button
                        key={genre.id}
                        onClick={() => handleGenreClick(genre.id)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors border ${
                        isActive
                        ? 'bg-sky-500 text-slate-950 border-sky-400 font-bold shadow-lg shadow-sky-500/20'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                }`}
                    >
                        {genre.name}
                    </button>
                )
            })}
        </div>
    )
}