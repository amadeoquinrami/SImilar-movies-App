require('dotenv').config()

const API_KEY = process.env.TMDB_API_KEY

const searchMovies = async (movieTitle) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movieTitle)}`
  const response = await fetch(url)
  const data = await response.json()
  if (!response.ok) throw new Error(data.status_message || 'TMDB request failed')
  return data.results || []
}

const getSimilarMovies = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`
  const response = await fetch(url)
  const data = await response.json()
  if (!response.ok) throw new Error(data.status_message || 'TMDB request failed')
  return data.results || []
}

module.exports = { searchMovies, getSimilarMovies }
