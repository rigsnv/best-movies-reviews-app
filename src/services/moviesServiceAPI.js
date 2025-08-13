export default async function moviesServiceAPI(category, page = 1) {
    
    if (category == 'Now in Theaters') {
        category = 'now_playing'; // Adjust category for API
    }

    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${category.toLowerCase().replace(' ', '_')}?language=en-US&page=${page}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjViNjNkZWMwYjkzNDVlMzA4MTc4YmE2MGJiODg2YSIsIm5iZiI6MTczODE1OTEzNi41NjksInN1YiI6IjY3OWEzNDIwOTc1NDBjOWZjOTI3YTRkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CU88WVqPI2D_1V8P4tPc7UIPhR-kOXagkNv89eK1Xu4', // Make sure this is correct
            'Content-Type': 'application/json'
        }
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(data); // Your existing log
    return data; // IMPORTANT: Return the data!
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
