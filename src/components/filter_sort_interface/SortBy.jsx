export default function SortBy({sortByValues, sortBy, onSortChange}) {
    const handleSortChange = (e) => {
        onSortChange(e.target.value);
    };

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="sort_by" className="text-white font-medium text-sm">Sort Results By:</label>
            <select 
                name="sort_by" 
                id="sort_by" 
                value={sortBy}
                onChange={handleSortChange}
                className="px-3 py-2 bg-gray-900 text-white border border-gray-600 rounded focus:border-yellow-500 focus:outline-none min-w-[200px]"
            >
                <option value="">Select Sort Option</option>
                {sortByValues.map(sortByValue => <option key={sortByValue} value={sortByValue}>{sortByValue}</option>)}
            </select>
        </div>
    )
}