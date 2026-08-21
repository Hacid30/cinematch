import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

async function searchMovies(query) {
    const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=es-CO&query=${encodeURIComponent(query)}`
    );

    if (!res.ok) {
        throw new Error('Error al buscar películas');
    }

    return res.json();
}

export default async function SearchPage( { searchParams } ){
    const { q } = await searchParams;
    const data = q ? await searchMovies(q) : { results: [] };
    const movies = data.results;

    return(
        <main className="bg-slate-900 min-h-screen p-6 md:p-10" >
            <div className="flex items-center justify-between mb-6 max-w-5xl mx-auto">
                <Link
                    href='/'
                    className="text-sky-400 hover:underline font-semibold text-sm"
                >
                    ← Volver al inicio
                </Link>
            </div>

            <SearchBar/>

            <h1 className="text-2xl font-bold text-white mb-6">
                Resultados para: <span className="text-sky-400">{q}</span>
            </h1>

            {movies.length === 0 ? (
                <p className="text-slate-400 text-center py-10">
                    No se encontraron películas con ese nombre.
                </p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6" >
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </main>
    )
}