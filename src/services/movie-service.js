export default class MovieService {
    _apiKey = '8ed0e45837fd5a2d3d126ab11dda2cab';

    async getResource(url, options = {}){
        const res = await fetch(url, options);
        try{
            return await res.json();
        }catch (e) {
            throw new Error (`Received ${res.status}`)
        }
    }

    // async postResource(url, body) {
    //     const res = await fetch(url, {method: 'POST', headers: {
    //             'Content-Type': 'application/json;charset=utf-8'
    //         }, body: JSON.stringify(body)});
    //
    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}. Status: ${res.status}`);
    //     }
    //
    //     return await res.json();
    // }

    async getMovies(keyword, page){
        return await this.getResource(`https://api.themoviedb.org/3/search/movie?api_key=${this._apiKey}&query=${keyword}&page=${page}`);
    }
    async getGenres(language){
        return await this.getResource(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this._apiKey}&language=${language}`);
    }
    async getGuestSessionId(){
        const res = await this.getResource(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this._apiKey}`)
        return res.guest_session_id;
    }

    getRatedFilms(guestId, page, lang) {
        return this.getResource(
            `https://api.themoviedb.org/3/guest_session/${guestId}/rated/movies?api_key=${this._apiKey}&language=${lang}&sort_by=created_at.asc&page=${page}`
        );
    }

    rateFilm(value, guestId, movieId) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ value }),
        }
        return (
            this.getResource(
                `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${this._apiKey}&guest_session_id=${guestId}`, options
            )
        );
    }

    deleteRateMovie(guestId, movieId){
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        };
        return this.getResource(
            `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${this._apiKey}&guest_session_id=${guestId}`,
            options
        );
    }

}