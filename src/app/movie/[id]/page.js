import Image from "next/image";
import BackButton from "@/components/BackButton";
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

async function getMovieTrailer(id) {
    let res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}&language=es-CO`
    );
    let data = await res.json();

    let trailer = data.results?.find(
        (vid) => vid.site === 'YouTube' && vid.type === 'Trailer'
    );

    if (!trailer) {
        res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        );
        data = await res.json();

        trailer = data.results?.find(
            (vid) => vid.site === 'YouTube' && vid.type === 'Trailer'
        );
    }

    return trailer ? trailer.key : null;
}

export default async function MovieDetailPage( { params } ){
    const { id } = await params;
    
    const [ movie, trailerKey ] = await Promise.all([
        getMovieDetails(id),
        getMovieTrailer(id)
    ]);

    if (!movie) notFound();

    const backdropUrl =  movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    return (
  <main className="min-h-screen text-white pb-12 bg-slate-900">
    {/* 1. BANNER SUPERIOR CON BACKDROP */}
    <div className="relative w-full h-[40vh] md:h-[50vh] bg-slate-800">
      {movie.backdrop_path && (
        <Image
          src={backdropUrl}
          alt={movie.title}
          fill
          priority
          className="object-cover opacity-30"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
      <div className="absolute top-6 left-6 z-20">
        <BackButton />
      </div>
    </div>

    {/* 2. CONTENEDOR PRINCIPAL */}
    <div className="max-w-5xl mx-auto px-6 -mt-32 relative z-10">
      
      {/* SECCIÓN SUPERIOR: Póster + Información (Flexbox Horizontal en Desktop) */}
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        
        {/* Póster */}
        <div className="relative w-64 h-96 shrink-0 rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700">
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Detalles de la Película */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            {movie.title}
          </h1>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
            <span className="bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-sm font-semibold border border-amber-400/30">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
            <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-sm font-medium border border-slate-700">
              📅 {movie.release_date}
            </span>
            {movie.runtime > 0 && (
              <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-sm font-medium border border-slate-700">
                ⏱️ {movie.runtime} min
              </span>
            )}
          </div>

          {/* Géneros */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="bg-sky-500/20 text-sky-300 text-xs px-3 py-1 rounded-full border border-sky-500/30 font-medium"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <h2 className="text-xl font-semibold text-sky-400 mb-2">Sinopsis</h2>
          <p className="text-slate-300 leading-relaxed text-base md:text-lg">
            {movie.overview || 'No hay sinopsis disponible en español.'}
          </p>
        </div>
      </div>

      {/* SECCIÓN INFERIOR: Tráiler Oficial (Ocupa todo el ancho abajo) */}
      <div className="mt-12 pt-8 border-t border-slate-800">
        <h2 className="text-2xl font-bold text-sky-400 mb-6 flex items-center gap-2">
          🎬 Tráiler Oficial
        </h2>

        {trailerKey ? (
          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${trailerKey}`}
              title={`Tráiler de ${movie.title}`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-800">
            <p className="text-slate-400">No hay tráiler disponible para esta película.</p>
          </div>
        )}
      </div>

    </div>
  </main>
);
}