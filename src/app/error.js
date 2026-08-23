'use client';

import { useEffect } from "react";

export default function Error( { error, reset } ){
    useEffect(() => {
        console.error('Error detectado:', error)
    },[error]);

    return (
        <main className="bg-slate-900 min-h-screen flex flex-col items-center justify-center text-center p-6">
            <div className="text-5xl mb-4">⚠️</div>
            <h1 className="text-3xl font-bold text-white mb-2">¡Algo salió mal!</h1>
            <p className="text-slate-400 max-w-md mb-8">
                Hubo un problema de conexión con el servidor o la API. Intenta nuevamente.
            </p>

            <button
                onClick={() => reset()}
                className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold px-6 py-3 rounded-xl transition"
            >
                Reintentar
            </button>
        </main>
    )
}