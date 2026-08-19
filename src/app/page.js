import Image from "next/image";

async function getTrendingMovies() {
  const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}&language=es-CO`);

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
        <h1 className="text-4xl font-bold text-sky-400 mb-6">Tendencias Hoy 🍿</h1>
        
        <ul className="text-slate-300 space-y-2">
          {movies.map((movie) => (
            <li key={movie.id}>🎥 {movie.title}</li>
          ))}
        </ul>
      </main>
  );
}
