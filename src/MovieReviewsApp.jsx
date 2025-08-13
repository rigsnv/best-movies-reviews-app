import { useState } from 'react'
import Header from './components/Header'
import MainContent from './components/MainContent'

function MovieReviewsApp() {
  const [category, setCategory] = useState('Now in Theaters');
  const [givingRating, setGivingRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1); // Reset to page 1 when category changes
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  }

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  }

  return (
    <>
      <div id="MovieReviewsAppContainer" className="h-full mx-auto bg-black text-white px-4 pb-12 sm:px-0">
        <div className="container mx-auto">
          <Header
            onCategoryChange={handleCategoryChange}
            givingRating={givingRating}
            setGivingRating={setGivingRating}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />
          <MainContent 
            category={category} 
            givingRating={givingRating} 
            currentPage={currentPage}
            onPageChange={handlePageChange}
            sortBy={sortBy}
          />
        </div>
      </div>
    </>
  )
}

export default MovieReviewsApp
