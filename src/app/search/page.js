import MovieCard from "@/components/MovieCard";
import BackButton from "@/components/BackButton";
import Pagination from "@/components/Pagination";
import { notFound } from "next/navigation";

async function searchMovies(query, page = 1) {
    const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=es-CO&query=${encodeURIComponent(query)}&page=${page}`
    );

    if (!res.ok) {
        throw new Error('Error al buscar películas');
    }

    return res.json();
}

export default async function SearchPage( { searchParams } ){
    const { q, page } = await searchParams;
    const query = q || '';
    const currentPage = Number(page) || 1;

    if(!query) notFound();

    const data = await searchMovies(query, currentPage);
    const totalPages = Math.min(data.total_pages || 1, 500);

    return(
        <main className="bg-slate-900 min-h-screen p-6 md:p-10" >
            <div className="flex items-center justify-between mb-6 max-w-5xl mx-auto">
                <BackButton/>
            </div>

            <h1 className="text-2xl font-bold text-white mb-6">
                Resultados para: <span className="text-sky-400">{query}</span>
            </h1>

            {data.results.length === 0 ? (
                <p className="text-slate-400 text-center py-10">
                    No se encontraron películas con ese nombre.
                </p>
            ) : (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6" >
                        {data.results.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>

                    <Pagination currentPage={currentPage} totalPages={totalPages}/>
                </>
            )}
        </main>
    )
}