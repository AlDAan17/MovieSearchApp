export default class MovieService {
    _apiKey = '8ed0e45837fd5a2d3d126ab11dda2cab';

    async getResource(url){
        const res = await fetch(url);
        if(!res.ok){
            throw new Error (`Received ${res.status}`)
        }
        return await res.json();
    }

    async getMovies(keyword, page){
        return await this.getResource(`https://api.themoviedb.org/3/search/movie?api_key=${this._apiKey}&query=${keyword}&page=${page}`);
    }
    async getGenres(language){
        return await this.getResource(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this._apiKey}&language=${language}`);
    }

}