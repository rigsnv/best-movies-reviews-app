import { useMemo } from "react";

const Pagination = ({ currentPage, totalPages, totalResults, onPageChange }) => {
    // Generate page numbers to display
    const pageNumbers = useMemo(() => {
        const pages = [];
        const maxPagesToShow = 5;
        
        if (totalPages <= maxPagesToShow) {
            // Show all pages if total is less than max
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show smart pagination
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, currentPage + 2);
            
            // Adjust if we're near the beginning
            if (currentPage <= 3) {
                startPage = 1;
                endPage = maxPagesToShow;
            }
            
            // Adjust if we're near the end
            if (currentPage >= totalPages - 2) {
                startPage = totalPages - maxPagesToShow + 1;
                endPage = totalPages;
            }
            
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
        }
        
        return pages;
    }, [currentPage, totalPages]);

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page) => {
        onPageChange(page);
    };

    if (totalPages <= 1) {
        return null; // Don't show pagination if there's only one page
    }

    return (
        <div className="flex flex-col items-center gap-4 mt-8 mb-6">
            {/* Results info */}
            <div className="text-sm text-gray-400">
                Showing page {currentPage} of {totalPages} ({totalResults.toLocaleString()} total results)
            </div>
            
            {/* Pagination controls */}
            <div className="flex items-center gap-2">
                {/* Previous button */}
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded text-sm font-medium transition-colors hidden sm:block ${
                        currentPage === 1
                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-800 text-white hover:bg-gray-600'
                    }`}
                >
                    Previous
                </button>

                {/* First page if not in visible range */}
                {pageNumbers[0] > 1 && (
                    <>
                        <button
                            onClick={() => handlePageClick(1)}
                            className="px-3 py-2 rounded text-sm font-medium bg-gray-800 text-white hover:bg-gray-600 transition-colors"
                        >
                            1
                        </button>
                        {pageNumbers[0] > 2 && (
                            <span className="px-2 text-gray-500">...</span>
                        )}
                    </>
                )}

                {/* Page numbers */}
                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageClick(page)}
                        className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                            page === currentPage
                                ? 'bg-yellow-500 text-black'
                                : 'bg-gray-800 text-white hover:bg-gray-600'
                        }`}
                    >
                        {page}
                    </button>
                ))}

                {/* Last page if not in visible range */}
                {pageNumbers[pageNumbers.length - 1] < totalPages && (
                    <>
                        {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                            <span className="px-2 text-gray-500">...</span>
                        )}
                        <button
                            onClick={() => handlePageClick(totalPages)}
                            className="px-3 py-2 rounded text-sm font-medium bg-gray-800 text-white hover:bg-gray-600 transition-colors"
                        >
                            {totalPages}
                        </button>
                    </>
                )}

                {/* Next button */}
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded text-sm font-medium transition-colors hidden sm:block ${
                        currentPage === totalPages
                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-800 text-white hover:bg-gray-600'
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
