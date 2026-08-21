'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const [ query, setQuery ] = useState('');
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        router.push(`/search?q=${encodeURIComponent(query)}`);
    };

    return (
        <form onSubmit={handleSearch} className="w-full max-w-md mx-auto mb-8">
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar una película..."
                    className="w-full bg-slate-800 text-white px-4 py-3 pl-11 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder-slate-400 transition"
                />
                <span  className="absolute left-4 top-3.5 text-slate-400">🔍</span>
            </div>
        </form>
    );
}

