import axios from 'axios'
const BASE_API = 'https://yts.mx/api/v2/'

class Api {
  async getSuggestion (id) {
    const response = await axios.get(`${BASE_API}movie_suggestions.json?movie_id=${id}`)
    return response.data.data.movies
  }

  async getMovies () {
    const response = await axios.get(`${BASE_API}list_movies.json`)
    return response.data.data.movies
  }

  async searchMovie (title) {
    const response = await axios.get(`${BASE_API}list_movies.json?limit=1&sort_by=rating&query_term=${title}`)
    return response.data.data.movies
  }
}

export default new Api()
