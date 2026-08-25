'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { useFavoritesStore } from "@/store/useFavoritesStore";

export default function Navbar() {
    const [mounted, setMounted ] = useState(false);
    const { favorites } = useFavoritesStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    return(
        <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
                <Link 
                    href='/'
                    className="text-xl font-extrabold text-sky-400 flex items-center gap-2 hover:opacity-90 transition shrink-0">
                <span className="text-2xl">🍿</span>
                <span className="tracking-wide">CineMatch</span>
                </Link>

                <div className="flex-1 max-w-md hidden sm:block">
                    <SearchBar />
                </div>

                <Link
                    href='/favorites'
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700/80 px-4 py-2 rounded-xl text-sm font-semibold text-slate-200 transition border border-slate-700/60 shrink-0"
                >
                    <span>Favoritos</span>
                    <span className="bg-rose-500/20 text-rose-300 text-xs font-bold px-2.5 py-0.5 rounded-full border-rose-500/30">  
                        ❤️ {mounted ? favorites.length : 0}
                    </span>
                </Link>
            </div>

            <div className="sm:hidden px-4 pb-3">
                <SearchBar />
            </div>
        </header>
    )
}