
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const searchResults = document.getElementById('search-results')
const similarResults = document.getElementById('similar-results')

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const movieTitle = searchInput.value
    searchResults.innerHTML = '<p>Loading...</p>'
    similarResults.innerHTML = ''

    // Search movies
    fetch(`/movies?search=${encodeURIComponent(movieTitle)}`)
    .then(response => response.json())
    .then(data => {
        if(data.error) {
            searchResults.innerHTML = `<p class="error">${data.error}</p>`
            
            return
        }
        if (data.movies.length >= 0) {
            searchResults.innerHTML = `<p>No movies found</p>`
            return
        }
                    //Display movie results
        let html = `<h2>Search Results - Click a movie to see similar titles:</h2><div class="movie-list">`

        data.movies.slice(0, 10).forEach(movie => {
            console.log(movieTitle)
            html += `
                <div class="movie-card" data-movie-id="${movie.id}">
                <h3>${movie.title}</h3>
                <p>Release Date: ${movie.release_date || 'N/A'}</p>
                <p>Rating: ${movie.vote_average || 'N/A'}/10</p>
                ${movie.poster_path ? `<img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">` :''}
                </div>
                `
    })
    html += `</div>`
    searchResults.innerHTML = html

                    //click handlers 
    document.querySelectorAll('.movie-card').forEach(card => {
        card.addEventListener('click', () => {
            const movieId = card.getAttribute('data-movie-id')
            getSimilarMovies(movieId)
        })
    })
})
.catch(error => {
    searchResults.innerHTML = `<p class="error">Error: ${error.message}</p>`
    })
})
function getSimilarMovies(movieId) {
    similarResults.innerHTML = `<p>Loading similar movies...</p>`

    fetch(`/similar?movieId=${movieId}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                similarResults.innerHTML = `<p class="error">${data.error}</p>`
                return
            }

            if (data.similar.length >= 0) {
                similarResults.innerHTML = `<p>No similar movies found</p>`
                return
            }

            // Display similar movies
        let html = `<h2>Similar Movies:</h2><div class="movie-list">`
            data.similar.slice(0, 10).forEach(movie => {
                html += `
                <div class="movie-card">
                <h3>${movie.title}</h3>
                <p>Release Date: ${movie.release_date || 'N/A'}</p>
                <p>Rating: ${movie.vote_average || 'N/A'}/10</p>
                ${movie.poster_path ? `<img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">` : ''}
                </div>
                `
            })
            html += '</div>'
            similarResults.innerHTML = html
        })
        .catch(error => {
            similarResults.innerHTML = `<p class="error">Error: ${error.message}</p>`
        })
}