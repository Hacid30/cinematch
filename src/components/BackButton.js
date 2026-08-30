'use client';

import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="bg-slate-800/80 hover:bg-slate-700 text-white mt-8 ml-8 px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm transition z-20"
        >
            ← Volver
        </button>
    )
}