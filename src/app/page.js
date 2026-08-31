import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import GenreFilter from "@/components/GenreFilter";

async function getGenres(){
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=es-CO`
  );

  if (!res.ok) return [];
  const data = await res.json();
  return data.genres || [];
}

async function getMovies(page=1, genreId = null) {
  const endpoint = genreId
    ? `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=es-CO&sort_by=popularity.desc&with_genres=${genreId}&page=${page}`
    : `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}&language=es-CO&page=${page}`;
  
  const res = await fetch( endpoint, { next: { revalidate: 3600 } });

  if (!res){
    throw new Error('Error al conectar con TMDB');
  }

  return res.json();
}

export default async function Home({ searchParams }) {
  
  const { page, genre } = await searchParams;
  const currentPage = Number(page) || 1;

  const [ genres, moviesData ] = await Promise.all([
    getGenres(),
    getMovies(currentPage, genre)
  ])
  const totalPages = Math.min(moviesData.total_pages || 1, 500);

  return (
      <main className="bg-slate-900 min-h-screen p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-sky-400 mb-6 text-center">
          CineMatch
        🍿</h1>
        
        <p className="text-slate-400 text-center mb-8 text-sm md:text-base">
          Descubre las películas en tendencia y filtra por tu categoría favorita
        </p>

        <GenreFilter genres={genres} selectedGenre={genre}/>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {moviesData.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie}  />
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </main>
  );
}
