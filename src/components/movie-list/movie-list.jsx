import React from "react";
import Movie from "../movie";
import ErrorIndicator from "../error-indicator";
import './movie-list.css'


export default class MovieList extends React.Component{
    render() {
        const {movies, genres, loadingGenres, query, guestId, updateCache, currentTab} = this.props;
        const elements = movies.map((movie) =>{
            // console.log('movie is: ', movie);
            //поч тут не работает if(movies.length === 0) ??
            return <Movie key={movie.id} movie={movie} genres={genres}
                          loadingGenres={loadingGenres} guestId={guestId}
                          updateCache={updateCache}/>
        });
        let message;
        if(!elements.length) {
            // eslint-disable-next-line default-case
            switch (currentTab) {
                case 'search':
                    message = <ErrorIndicator description={`No results found for ${query}`} type="info"/>
                    break;
                case 'rated':
                    message = <ErrorIndicator description={`No rated movies`} type="info"/>
                    break;
            }

        }

        return(
            <div className="movies-list">
                {message}
                {elements}
            </div>
        )
    }
};