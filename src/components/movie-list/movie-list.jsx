import React from "react";
import Movie from "../movie";
import ErrorIndicator from "../error-indicator";
import './movie-list.css'

function MovieList ({movies, genres, loadingGenres, query, guestId, updateCache, currentTab}){

    const elements = movies.map((movie) =>{
        return <Movie key={movie.id} movie={movie} genres={genres}
                      loadingGenres={loadingGenres} guestId={guestId}
                      updateCache={updateCache}/>
    });

    let message;
    if(!elements.length) {
        switch (currentTab) {
            case 'search':
                message = query ? <ErrorIndicator description={`No results found for ${query}`} type="info"/> : null;
                break;
            case 'rated':
                message = <ErrorIndicator description={`No rated movies`} type="info"/>
                break;
             //no default
        }
    }

    return(
        <div className="movies-list">
            {message}
            {elements}
        </div>
    )
}

export default MovieList;