import React from "react";
import {Card, Typography, Spin} from "antd";
import { format } from 'date-fns';
import noPosterPicture from './noPoster.png';

import './movie.css';

export default class Movie extends React.Component {
    render() {
        const {poster_path: poster, title, overview: description, release_date: date, genre_ids: genreId } = this.props.movie;
        const {genres, loadingGenres} = this.props;
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
                    <Title level={4}>{title}</Title>
                    <p>{dateFormat}</p>
                    <section className="movie__genre">{genresDisplay}</section>
                    <Paragraph ellipsis={{rows: 6}}>{description}</Paragraph>
                </section>
            </Card.Grid>
        )
    }
};