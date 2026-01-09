const { response } = require('express')
const request = require('request')
console.log(response)
const results = []
const API_KEY = process.env.TMDB_API_KEY


const searchMovies = (movieTitle, callback) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movieTitle)}`
    const JSON = response.json()
    console.log(JSON) } //get rid of curly bracket
    // request({ url, json: true }, (error, {body}) => {
    //     console.log(request)
        
    //     if (error) {
    //         callback(error, null);
    //         return;
    //     }
    //     let data = [];
    //     try {
    //         data = typeof body === "string" ? JSON.parse(body) : body;
    //     } catch (err) {
    //         callback("Invalid JSON froom TMDB", null);
    //         return;
    //     }
                        //safety checksss
        // if (!data || !Array(data.results)) {
        //     callback(data?.status_message || "Unexpected TMDB response", null);
        //     return;
        // } 
                                    // if (data.length === 0) {
                                    //     callback("No movies found", null);
                                    //     console.log(data)
                                    //     return;
                                    // }
        // callback(null, data.results);
                                    // if (error) {
                                    //     callback('Unable to connect to TMDB service!', undefined)
                                    // } else if (body.results.length === 0) {
                                    //     callback('Unable to find movie. Try another search.', undefined)
                                    // } else {
                                    //     callback(undefined, body.results)
                                    // }
    // })
// }

// const getSimilarMovies = (movieId, callback) => {
//     const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`

//     request({ url, json: true}, (error, {body}) => {
//         if (error) {
//             callback('Unable to connect to the TMDB Service!', undefined)
//         } else if (body.results.length === 0) {
//             callback('No Similar movies found.', undefined)
//         } else {
//             callback(undefined, body.results)
//         }
//     })
// }
module.exports = {
    searchMovies //,
    // getSimilarMovies
}