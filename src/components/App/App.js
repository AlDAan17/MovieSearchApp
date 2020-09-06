import React from 'react';
import {Layout, Spin, Pagination } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import Header from "../header";
import './App.css';
import MovieList from "../movie-list";
import MovieService from "../../services/movie-service";
import ErrorIndicator from "../error-indicator";


export default class App extends React.Component {

    movieService = new MovieService();

    state = {
        movies: [],
        genres:[],
        loading:false,
        loadingGenres:true,
        error:false,
        query:null,
        page: 1,
        totalMoviesResults: null,
    };

    componentDidUpdate(prevProps, prevState) {
        const { query, page} = this.state;
        if (prevState.query !== query || prevState.page !== page) {
            this.updateMovies(query, page);
            this.updateGenres();
        }
    }

    // componentDidMount() {
    //     this.updateMovies();
    //     this.updateGenres();
    // }

    updateMovies(query, page){
        this.movieService.getMovies(query, page).then((res) =>{
            console.log("res is: ", res);
            this.setState({
                movies: res.results,
                loading:false,
                totalMoviesResults: res.total_results
            })
            console.log('STATE: ', this.state)
        })
            .catch(this.onError);
    }
    updateGenres(){
        this.movieService.getGenres('en').then((res) =>{
            this.setState({
                genres: res.genres,
                loadingGenres:false,
            })
        })
            .catch(this.onError);
    }

    getQuery = (query) =>{
        if(query === this.state.query || !query) return;
        this.setState({
            query,
            error:false,
            loading:true,
        })
    };

    onError = () =>{
        this.setState({
            error:true,
            loading: false,
        })
    };

    onChangePage = (page) =>{
        this.setState({
            loading: true,
            page
        })
    }

    render() {
        const {Sider, Content } = Layout;
        const{movies, genres, loading, error, loadingGenres, query, totalMoviesResults, page} = this.state;
        console.log('current state of movies: ', movies);

        const spinner = loading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 55 }}/>}
                              className="spinner" tip= "Loading..."/> : null;
        const errorMessage = error ? <ErrorIndicator/> : null;
        const hasData = !(error || loading || !query);
        const content = hasData ? (
            //react component??
            <>
                <MovieList movies={movies} genres={genres}
                                             loadingGenres={loadingGenres}/>
                <Pagination className="pagination" current={page} total={totalMoviesResults}
                            onChange={this.onChangePage} pageSize={20}
                            showQuickJumper showSizeChanger={false}/>
            </>
        ) : null;

        return (
            <Layout className='main-content '>
                <Sider className="sider" width="14.93%"/>
                <Content>
                    <Header getQuery={this.getQuery}/>
                    {spinner}
                    {errorMessage}
                    {content}
                </Content>
                <Sider className="sider" width="14.93%"/>
            </Layout>
        );
    }

}
