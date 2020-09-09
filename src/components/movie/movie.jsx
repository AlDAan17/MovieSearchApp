import React from "react";
import {Card, Typography, Spin, Rate, message} from "antd";
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import noPosterPicture from './noPoster.png';

import './movie.css';
import MovieService from "../../services/movie-service";
import Rating from "../rating";

export default class Movie extends React.Component {

    movieService = new MovieService();

    rate = (value) =>{
        const {movie, guestId, updateCache } = this.props;
        const {id} = movie;
        if(value === 0){
            this.movieService.deleteRateMovie(guestId, id);
        }
        this.movieService.rateFilm(value, guestId, id);
        updateCache(movie, value);
    }

    render() {
        const {genres, loadingGenres, movie} = this.props;
        const {poster_path: poster, title, overview: description, release_date: date, genre_ids: genreId, rating, vote_average: average } = movie;
        const {Title, Text, Paragraph} = Typography;
        const dateFormat = date ? format(new Date(date), "LLLL d, y") : null ;

        let genresDisplay;
        if(loadingGenres) genresDisplay = <Spin />;
        if(!loadingGenres){
            genresDisplay= genreId.map((id) => {
                try{
                    return (
                        <p className="movie__genre-item" key={id}>
                            <Text keyboard>{genres.find((item) => item.id === id).name}</Text>
                        </p>
                    )
                }catch (e) {
                    console.log(e);
                }
            });
        }
        return(
            <Card.Grid className="movie">
                <section>
                    <img className="movie__image" src={ poster ? `https://image.tmdb.org/t/p/w500${poster}` : noPosterPicture} alt="poster"/>
                </section>
                <section className="movie__content">
                    <section className="movie__content-head">
                        <Title level={4}>{title}</Title>
                       <Rating value={average}/>
                    </section>
                    <p>{dateFormat}</p>
                    <section className="movie__genre">{genresDisplay}</section>
                    <Paragraph ellipsis={{rows: 6}}>{description}</Paragraph>
                    <Rate allowHalf defaultValue={rating} onChange={this.rate} count={10} className="movie__rate"/>
                </section>
            </Card.Grid>
        )
    }
}



Movie.propTypes = {
    movie: PropTypes.shape({
        poster_path: PropTypes.string,
        release_date: PropTypes.string,
        overview: PropTypes.string,
        title: PropTypes.string,
        genre_ids: PropTypes.arrayOf(PropTypes.number),
        vote_average: PropTypes.number,
        id: PropTypes.number,
    }).isRequired,
    guestId: PropTypes.string.isRequired,
    updateCache: PropTypes.func.isRequired,
}