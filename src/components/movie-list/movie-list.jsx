import React from "react";
import Movie from "../movie";

import './movie-list.css'

export default class MovieList extends React.Component{
    render() {
        const {movies, genres, loadingGenres} = this.props;
        const elements = movies.map((movie) =>{
            // console.log('movie is: ', movie);
            return <Movie key={movie.id} movie={movie} genres={genres} loadingGenres={loadingGenres}/>
        });
        return(
            <div className="movies-list">
                {elements}
            </div>
        )
    }
};