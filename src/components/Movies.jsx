import MovieCard from "./MovieCard";

const Movies = ({ movies, givingRating }) => {

    return (
        <section id="movies" className="pt-4 flex flex-wrap justify-center items-center gap-4">  
            {
                movies.length > 0 ?
                    movies.map(
                        (movie) => <MovieCard key={movie.id} movie={movie}/>
                    )
                :
                    <h3 className="text-amber-500 font-bold h-[70vh] flex items-center">Sorry, no movies with ratings of {givingRating}+ were found within this category</h3>
            }
        </section>
    )
}

export default Movies;