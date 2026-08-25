import MovieCard from "@/components/MovieCard";

async function getTrendingMovies() {
  const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}&language=es-CO`,
    { next: { revalidate: 3600 } }
  );

  if (!res){
    throw new Error('Error al conectar con TMDB');
  }

  return res.json();
}

export default async function Home() {
  const data = await getTrendingMovies();
  const movies = data.results;

  return (
      <main className="bg-slate-900 min-h-screen p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-sky-400 mb-6 text-center">
          CineMatch
        🍿</h1>
        
        <h2 className="text-xl font-bold text-white mb-6">Tendencias Hoy 🍿</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie}  />
          ))}
        </div>
      </main>
  );
}
