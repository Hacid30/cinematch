import Link from "next/link";

export default function NotFound() {
    return(
        <main className="bg-slate-900 min-h-screen flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-7xl font-extrabold text-sky-400 mb-2" >404</h1>
            <h2 className="text-2xl font-bold text-white mb-3" >Película no encontrada</h2>
            <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
                Parece que la película que estás buscando no existe o la dirección ingresada es incorrecta.
            </p>
            <Link 
                href="/"
                className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition"
            >
                Volver al catálogo principal
            </Link>
        </main>
    )
}