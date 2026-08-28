'use client';

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ currentPage, totalPages }){
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createPageUrl = (pageNumber) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const prevPage = currentPage > 1 ? currentPage -1 : 1;
    const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

    return (
        <div className="flex items-center justify-center gap-4 my-10"> 
            {/* Botón Anterior */}
            {currentPage > 1 ? (
                <Link
                    href={createPageUrl(prevPage)}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl font-semibold text-sm border border-slate-700 transition"
                >
                    ← Anterior
                </Link>
            ) : (
                <button
                    disabled
                    className="bg-slate-800/40 text-slate-500 px-4 py-2 rounded-xl font-semibold text-sm border-slate-800/40 cursor-not-allowed"
                >
                    ← Anterior
                </button>
            )}

            {/* Indicador de Página */}
            <span className="text-slate-400 text-sm font-medium px-2">
                Página <strong className="text-white font-bold">{currentPage}</strong> de {' '}
                <strong className="text-white font-bold">{totalPages}</strong>
            </span>

            {/* Botón Siguiente */}
            {currentPage < totalPages ? (
                <Link
                    href={createPageUrl(nextPage)}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl font-semibold text-sm border border-slate-700 transition"
                >
                    Siguiente →
                </Link>
            ) : (
                <button
                    disabled
                    className="bg-slate-800/40 text-slate-500 px-4 py-2 rounded-xl font-semibold text-sm border-slate-800/40 cursor-not-allowed"
                >
                    Siguiente →
                </button>
            )}
        </div>
    )
}
