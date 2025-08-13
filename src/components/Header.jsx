import { useState } from "react";
import FilterByRating from "./filter_sort_interface/FilterByRating";
import SortBy from "./filter_sort_interface/SortBy";

const Header = ({onCategoryChange, givingRating, setGivingRating, sortBy, onSortChange}) => {
    const categories = [
        {id: 0, name: 'Now in Theaters', href: '#in_theaters'},
        {id: 1, name: 'Popular', href:'#popular'},
        {id: 2, name: 'Top Rated', href:'#highly_rated'}
    ];

    const [selectedCategory, setSelectedCategory] = useState('Now in Theaters');
    
    const ratingFilterValues = [5, 6, 7, 8];
    const sortByValues = ['Rating - High to Low', 'Rating - Low to High', 'Release Date - Newest First', 'Release Date - Oldest First', 'Title Ascending', 'Title Descending'];
        
    const handleCategoryClick = (category) => {
        console.log(category.name + ' ' + category.href);
        setSelectedCategory(category.name);
        onCategoryChange(category.name);
    };

    const handleFilter = (rating) => {
        if (rating === givingRating) { // reset filter
            setGivingRating(0);
        } else {
            setGivingRating(rating);
        }
    };

    return (
        <header id="application-header" className="sticky top-0 z-50 bg-black px-4 pb-4 shadow-xl">
            
            <div className="flex flex-col items-center gap-4 py-6 lg:flex-row lg:items-start lg:justify-between">
                <section id="application-title-section" className="flex flex-col items-center lg:items-start gap-2">
                    <h1 className="text-xl sm:text-4xl font-bold">Best Movies Reviews App</h1>
                    <p className="text-lg text-gray-400">by Ricardo Garcia Cerrada</p>
                </section>
                <nav id="navigation-links" className="flex items-center justify-center">
                    <ul className="flex gap-10">
                        {categories.map((category) => <li key={category.id}><a href={category.href} onClick={() => handleCategoryClick(category)} className="text-lg font-semibold text-yellow-500 hover:text-yellow-300">{category.name}</a></li>)}
                    </ul>
                </nav>
            </div>

            <div className="flex flex-col-reverse items-center gap-4 px-6 md:px-0 md:flex-row md:items-end md:justify-between">
                <section id="page-title-section">
                    <h2 className="text-2xl sm:text-4xl">{selectedCategory}</h2>
                </section>
                <section id="filters-section" className="flex flex-col items-start gap-6 sm:flex-row sm:items-start md:gap-4">
                    <SortBy sortByValues={sortByValues} sortBy={sortBy} onSortChange={onSortChange} />
                    <FilterByRating ratingFilterValues={ratingFilterValues} givingRating={givingRating} onRatingButtonClick={handleFilter} />
                </section>
            </div>
        </header>
    )
}

export default Header