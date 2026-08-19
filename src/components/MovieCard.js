import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ movie }) {
    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    return( 
        <Link href={`/movie/${movie.id}`}>
        <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col justify-between">
            <div className="relative w-full h-80">
                <Image
                    src={posterUrl}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (min-width: 1200px) 50vw, 25vw"
                />
            </div>

            <div className="p-4 flex flex-col gap-2">
                <h2 className="font-bold text-white text-lg line-clamp-1" >{movie.title}</h2>
                <div className="flex justify-between items-center text-sm text-slate-400">
                    <span>⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                    <span>{movie.release_date ? movie.release_date.split('-')[0] : 'S/F'}</span>
                </div>
            </div>
        </div>
        </Link>
    )
}

