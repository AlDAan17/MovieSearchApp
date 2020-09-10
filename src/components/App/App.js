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

    cache = [];

    state = {
        windowWidth: window.innerWidth,
        movies: [],
        genres:[],
        loading:false,
        loadingGenres:true,
        error:false,
        query:'',
        page: 1,
        totalMoviesResults: null,
        currentTab: 'search',
        guestId: null,
    };


    componentDidMount() {
        window.addEventListener('resize', this.updateWidth)
        this.setGuestId();
        this.updateGenres();
    }

    componentDidUpdate(prevProps, prevState) {
        const { query, page, currentTab, guestId} = this.state;
        if (prevState.query !== query || prevState.page !== page || prevState.currentTab !== currentTab) {
            if (currentTab === 'search') this.updateMovies(query, page);
            if (currentTab === 'rated') this.updateRatedFilms(guestId, page, 'en');
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWidth);
    }

    updateRatedFilms(guestId, page, language) {
        this.movieService
            .getRatedFilms(guestId, page, language)
            .then((response) => {
                this.setState({
                    movies: !response.results ? [] : response.results,
                    loading: false,
                    totalMoviesResults: response.total_results,
                });
            })
            .catch(this.onError);
    }

    updateMovies(query, page){
        if (!query) {
            return this.setState((state) =>{
                return {
                    movies: [],
                    loading: false,
                    totalMoviesResults: null,
                }
            });
        }
        this.movieService.getMovies(query, page).then((res) =>{
            const movies = this.renovation(!res.results ? [] : res.results, this.cache);
            this.setState((state) =>{
                return {
                    movies,
                    loading: false,
                    totalMoviesResults: res.total_results
                }
            })
        }).catch(this.onError);
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

    updateCache = (movie, value) => {
        const formatCard = { ...movie, rating: value };
        const index = this.cache.findIndex((o) => o.id === formatCard.id);
        if (index === -1) {
            this.cache.push(formatCard);
        } else {
            this.cache[index] = formatCard;
        }
    };

    updateWidth = () =>{
        this.setState({windowWidth: window.innerWidth})
    }

    setGuestId(){
        this.movieService.getGuestSessionId()
            .then((res) =>{
            this.setState({
                guestId: res
            });
        })
        .catch(this.onError)
    }

    getQuery = (word) =>{
        const {query} = this.state;
        if(word === query) return;
        this.setState((state) =>{
            return {
                query: word,
                error: false,
                loading: true,
                page: 1,
            }
        })
    };

    changeTab = ({key}) =>{
        this.setState({
            currentTab: key,
            loading:true,
            error: false
        })
    }

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

    renovation(arr1, arr2) {
        if (!arr2.length) return arr1;
        return arr1.map((obj) => arr2.find((o) => o.id === obj.id) || obj);
    }

    render(){
        const {Sider, Content } = Layout;
        const{movies, genres, loading, error, loadingGenres,
            query, totalMoviesResults, page, currentTab, guestId, windowWidth} = this.state;

        const spinner = loading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 55 }}/>}
                              className="spinner" tip= "Loading..."/> : null;
        const errorMessage = error ? <ErrorIndicator/> : null;
        const hasData = !(error || loading);
        const content = hasData ? (
            <>
                <MovieList movies={movies} genres={genres} loadingGenres={loadingGenres}
                           query={query} guestId={guestId}  updateCache={this.updateCache}
                           currentTab={currentTab}/>
                <Pagination className="pagination" current={page} total={totalMoviesResults}
                            onChange={this.onChangePage} pageSize={20} size="small"
                            showSizeChanger={false} hideOnSinglePage/>
            </>
        ) : null;
        const sliderWidth = windowWidth >= 670 ? '14.93%' : windowWidth >= 530 ? '6%' : '0%';
        return (
            <Layout className='main-content '>
                <Sider className="sider" width={sliderWidth}/>
                <Content>
                    <Header getQuery={this.getQuery} query={query} selectTab={this.changeTab} current={currentTab}/>
                    {spinner}
                    {errorMessage}
                    {content}
                </Content>
                <Sider className="sider" width={sliderWidth}/>
            </Layout>
        );
    }

}
