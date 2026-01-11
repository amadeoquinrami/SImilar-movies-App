const path = require('path')
const express = require('express')
const hbs =require('hbs')
const tmdb = require('./utils/tmdb')
require('dotenv').config()

console.log('TMDB Bearer Token loaded:', process.env.TMDB_BEARER_TOKEN ? 'Yes' : 'No x')
console.log('First 10 chars:', process.env.TMDB_BEARER_TOKEN?.substring(0, 10))

const app = express()
const port = process.env.PORT || 5500

            /// defining paths for Express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

            /// handlebars engine and views locatiions 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
                        //static directory ro serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Similar Movies Finder',
        name: 'Amadeo Ramirez'  
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Amadeo Ramirez'  
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Search for any movie and discover similar titles!',
        title: 'Help',     
        name: 'Amadeo Ramirez'      
    })
})
                //movie search endpoint
app.get('/movies', async (req, res) => {
  if (!req.query.search) {
    return res.send({ error: 'You need to provide a movie title' })
  }

  try {
    const movies = await tmdb.searchMovies(req.query.search)
    res.send({ movies })
  } catch (error) {
    console.error(error.message)
    res.send({ error: error.message })
  }
})
                ///similar movies endpoint
app.get('/similar', async (req, res) => {
  if (!req.query.movieId) {
    return res.send({ error: 'You must provide a movie ID' })
  }

  try {
    const similar = await tmdb.getSimilarMovies(req.query.movieId)
    res.send({ similar })
  } catch (error) {
    console.error(error.message)
    res.send({ error: error.message })
  }
})
                //404 
app.use((req, res) => {
    res.render('404', {
        title: '404 PAGE',
        errorMessage: 'page can not be found'
    })
})
app.listen(port, () => {
    console.log(`Server is up on port ${port}`) 
})

