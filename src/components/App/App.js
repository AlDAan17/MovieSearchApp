import React from 'react';
import {Layout, Spin} from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import Header from "../header";
import './App.css';
import MovieList from "../movie-list";
import MovieService from "../../services/movie-service";


export default class App extends React.Component {

    movieService = new MovieService();

    state = {
        movies: [],
        genres:[],
        loading:true,
        loadingGenres:true,
        error:false,
    };

    componentDidMount() {
        this.updateMovies();
        this.updateGenres();
    }

    updateMovies(){
        this.movieService.getMovies('return').then((res) =>{
            this.setState({
                movies: res,
                loading:false,
            })
        })
    }
    updateGenres(){
        this.movieService.getGenres('en').then((res) =>{
            this.setState({
                genres: res,
                loadingGenres:false,
            })
        })
    }

    render() {
        const {Sider, Content } = Layout;
        const{movies, genres, loading, error, loadingGenres} = this.state;
        const spinner = <Spin indicator={<LoadingOutlined style={{ fontSize: 55 }}/>}
                              className="spinner" tip= "Loading..."/>;
        console.log('current state of movies: ', movies);
        console.log('current state of genres: ', genres);
        if(loading){
            return <Spin indicator={spinner} />
        }
        return (
            <Layout className='main-content '>
                <Sider className="sider" width="14.93%"/>
                <Content>
                    <Header/>
                    <MovieList movies={movies} genres={genres} loadingGenres={loadingGenres}/>
                </Content>
                <Sider className="sider" width="14.93%"/>
            </Layout>
        );
    }

}
