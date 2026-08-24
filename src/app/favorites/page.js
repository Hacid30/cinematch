'use client';

import { useState, useEffect } from 'react';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import MovieCard from '@/components/MovieCard';
import Link from 'next/link';

export default function FavoritePage() {
    const [ mounted, setMounted ] = useState(false);
    const { favorites } = useFavoritesStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return(
            <main className='bg-slate-900 min-h-screen p-6 md:p-10 text-white'>
                <h1 className='text-3xl font-bold mb-6 text-center'>Mis Favoritos ❤️</h1>
                <p className='text-slate-400 text-center'>Cargando tu lista...</p>
            </main>
        )
    }

    return (
        <main className='bg-slate-900 min-h-screen p-6 md:p-10 text-white'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex items-center justify-between mb-8'>
                    <h1 className='text-3xl font-bold text-slate-400 hover:text-white transition'>Mis Favoritos ❤️</h1>
                    <Link 
                        href='/'
                        className='text-sm font-semibold text-slate-400 hover:text-white transition'
                    >
                        ← Volver al inicio
                    </Link>
                </div>

                {favorites.length === 0 ? (
                    <div className='text-center py-20 bg-slate-800/50 rounded-2xl border border-slate-800'>
                        <p className='text-slate-400 text-lg mb-4'>Aún no has guardado ninguna película en tu lista.</p>
                        <Link 
                            href='/'
                            className='bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition inline-block'
                        >
                            Explorar películas
                        </Link>
                    </div>
                ) : (
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
                        {favorites.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}
            </div>

        </main>
    )
}