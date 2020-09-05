import React from "react";
import './header.css';
import {Input, Menu} from "antd";
// import MovieList from "../movie-list";
// import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
// import MovieService from './../../services/movie-service'
export default class Header extends React.Component{
    editInput = React.createRef();

    state = {
        current: 'mail',
    };
    changeField = (e) => {
        console.log(e.target.value);
        this.setState({ query: e.target.value });
    };

    render(){
        const {current} = this.state;

        return(
            <span className="span">
                <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" className='menu'>
                    <Menu.Item  key="mail">Search</Menu.Item>
                    <Menu.Item>Rated</Menu.Item>
                </Menu>

                <form onSubmit={this.searchMovies} className="header__form">
                    <Input style={{width: ' 92.87%'}} placeholder="Type to search..."
                           // value={query}
                           // onChange={this.changeField}
                           // ref={this.editInput}
                           allowClear/>
                </form>
                {/*{this.state.rows}*/}
                {/*<MovieList movies={movies}/>*/}
                {/*{movies}*/}
            </span>
        );
    }
}