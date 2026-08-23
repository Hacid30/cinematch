import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getMovieDetails(id) {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=es-CO`
    );

    if (res.status === 404 ){
        notFound();
    }

    if (!res.ok) {
        throw new Error('No se pudo obtener la información de la película');
    }

    return res.json();
}

export default async function MovieDetailPage( { params } ){
    const { id } = await params;
    const movie = await getMovieDetails(id);

    const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    return(
        <main className="bg-slate-900 min-h-screen text-white">
            <div className="relative w-full h-[40vh] md:h-[50vh]">
                {movie.backdrop_path && (
                    <Image
                        src={backdropUrl}
                        alt={movie.title}
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900 to-transparent"/>
                    <Link
                        href='/'
                        className="absolute top-6 left-6 bg-slate-800/80 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm transition"
                    >
                        ← Volver
                    </Link>
            </div>

            <div className="max-w-5xl mx-auto px-6 -mt-32 relative z-10 flex flex-col md:flex-row gap-8 pb-12">
                <div className="relative w-64 h-96 shrink-0 mx-auto md:mx-0 rounded-xl overflow-hidden shadow-2xl border-2 border-slate-700" >
                    <Image
                        src={posterUrl}
                        alt={movie.title}
                        fill
                        className="object-cover"
                    />
                </div>

                <div>
                    <h1>{movie.title}</h1>
                    <div>
                        <span> ⭐ {movie.vote_average.toFixed(1)}</span>
                        <span> 📅 {movie.release_date} </span>
                        <span> ⏱️ {movie.runtime} min </span>
                    </div>

                    <div>
                        {movie.genres.map((genre) => (
                            <span
                                key={genre.id}
                                className="bg-sky-500/20 text-sky-300 text-xs px-3 py-1 rounded-full border border-sky-500/30"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <h2 className="text-xl font-semibold text-sky-400 mt-2">Sinopsis</h2>
                    <p className="text-slate-300 leading-relaxed">
                        {movie.overview || 'No hay sinopsis disponible en español.'}
                    </p>
                </div>
            </div>

        </main>
    )
}