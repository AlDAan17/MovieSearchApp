export default class MovieService {
    _apiKey = '8ed0e45837fd5a2d3d126ab11dda2cab';

    async getResource(url){
        const res = await fetch(url);
        if(!res.ok){
            throw new Error (`Received ${res.status}`)
        }
        return await res.json();
    }

    async getMovies(keyword){
        const res = await this.getResource(`https://api.themoviedb.org/3/search/movie?api_key=${this._apiKey}&query=${keyword}`);
        return res.results;
    }
    async getGenres(language){
        const res = await this.getResource(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this._apiKey}&language=${language}`);
        return res.genres;
    }

}

const movie = new MovieService();

movie.getMovies().then((body) => {
    // body.forEach((i) =>{
    //     console.log(i.original_title)
    // })
    // console.log(body)
})