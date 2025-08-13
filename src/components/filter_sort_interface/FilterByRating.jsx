export default function FilterByRating({givingRating, onRatingButtonClick, ratingFilterValues}) {
    return (
        <section id="filter-by-rating" className="flex flex-col items-start gap-2">
            <h3 className="text-sm font-medium pb-2">Filter by Rating:</h3>
            <ul className="flex gap-2 font-bold">
                {ratingFilterValues.map(ratingFilterValue => <li key={ratingFilterValue} className={`text-yellow-500 hover:text-yellow-300 border-b-2 border-yellow-500/0 pr-2 cursor-pointer ${givingRating === ratingFilterValue ? "border-b-2 border-yellow-500/100 hover:border-yellow-300" : ""}`} onClick={() => onRatingButtonClick(ratingFilterValue)}>{ratingFilterValue}+</li>)}
            </ul>
        </section>
    );
}
