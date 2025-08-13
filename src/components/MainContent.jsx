import {useEffect, useState, useMemo} from "react";
import moviesAPI from '../services/moviesServiceAPI'
import Movies from "./Movies";
import Pagination from "./Pagination";

const MainContent = ({category, givingRating = 0, currentPage, onPageChange, sortBy}) => {
   const [allMovies, setAllMovies] = useState([])
   const [paginationData, setPaginationData] = useState({
       page: 1,
       total_pages: 1,
       total_results: 0
   });

   // Filter movies based on the rating
   const filteredMovies = useMemo(() => {
       if (givingRating === 0) {
           return allMovies;
       }
       return allMovies.filter((movie) => movie.vote_average >= givingRating);
   }, [allMovies, givingRating]);

   // Sort movies based on the selected sort option
   const sortedAndFilteredMovies = useMemo(() => {
       if (!sortBy) return filteredMovies;

       const moviesCopy = [...filteredMovies];

       switch (sortBy) {
           case 'Rating - High to Low':
               return moviesCopy.sort((a, b) => b.vote_average - a.vote_average);
           case 'Rating - Low to High':
               return moviesCopy.sort((a, b) => a.vote_average - b.vote_average);
           case 'Release Date - Newest First':
               return moviesCopy.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
           case 'Release Date - Oldest First':
               return moviesCopy.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
           case 'Title Ascending':
               return moviesCopy.sort((a, b) => a.title.localeCompare(b.title));
           case 'Title Descending':
               return moviesCopy.sort((a, b) => b.title.localeCompare(a.title));
           default:
               return filteredMovies;
       }
   }, [filteredMovies, sortBy]);
    
    useEffect(()=>{
        const fetchMovies = async () => {
            try {
                console.log('Fetching movies for category:', category, 'page:', currentPage);
                const data = await moviesAPI(category, currentPage);
                console.log('API response:', data);
                console.log('API response type:', typeof data);
                console.log('API response keys:', data ? Object.keys(data) : 'No data');
                
                if (data && data.results) {
                    console.log('Setting movies:', data.results);
                    setAllMovies(data.results);
                    setPaginationData({
                        page: data.page,
                        total_pages: data.total_pages,
                        total_results: data.total_results
                    });
                } else {
                    console.log('No results found in data:', data);
                    // Clear movies if no data received
                    setAllMovies([]);
                    setPaginationData({
                        page: 1,
                        total_pages: 1,
                        total_results: 0
                    });
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
                console.error('Error details:', error.message);
                setAllMovies([]);
                setPaginationData({
                    page: 1,
                    total_pages: 1,
                    total_results: 0
                });
            }
        };
        
        fetchMovies();
    }, [category, currentPage]);

    return (
        <>
            <main id="main-content">
                <Movies movies={sortedAndFilteredMovies} givingRating={givingRating} />
                <Pagination 
                    currentPage={paginationData.page}
                    totalPages={paginationData.total_pages}
                    totalResults={paginationData.total_results}
                    onPageChange={onPageChange}
                />
            </main>
        </>
    );
}

export default MainContent;