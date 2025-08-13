import rating_star from '../assets/img/rating_star.svg';

const MovieCard = ({movie}) => {
    return(
        <>
            <div id="movie-card" className="text-center flex flex-col w-2xs items-center hover:scale-105 transition-all duration-300">
                <a href={`https://themoviedb.org//movie/${movie.id}`} target="_blank" rel="noopener noreferrer">
                    <img className="rounded-2xl" alt="movie details" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex items-end justify-center gap-2">
                            <p>{movie.vote_average}</p>
                            <img className="size-7" alt="Rating Star" src={rating_star}/>
                        </div>
                        <p className="text-xs font-bold">Release date: {movie.release_date}</p>
                        <h3>Original Title: {movie.original_title}</h3>
                        <p className="movie_desc">{movie.overview.slice(0,100)+"..."}</p>
                    </div>
                </a>    
            </div>
        </>
    )
};

export default MovieCard;

