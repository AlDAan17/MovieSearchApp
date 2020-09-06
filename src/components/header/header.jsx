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
        value: '',
    };

    debounce = (fn, ms) =>{
      let timeout;
      return function (trim) {
        const fnCall = () => {fn.apply(this, arguments)};
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, ms);
      }
    };

    componentDidMount() {
        const {getQuery} = this.props;
        this.queryDebounce = this.debounce(getQuery, 1000)
    }

    changeField = (e) => {
        const {value} = e.target;
        this.queryDebounce(value.trim());
        this.setState({ value });
    };

    onSubmit = (e) =>{
        e.preventDefault();
    }

    render(){
        const {current, value} = this.state;
        return(
            <span className="span">
                <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" className='menu'>
                    <Menu.Item  key="mail">Search</Menu.Item>
                    <Menu.Item>Rated</Menu.Item>
                </Menu>

                <form onSubmit={this.onSubmit} className="header__form">
                    <Input style={{width: ' 92.87%'}} placeholder="Type to search..."
                           value={value}
                           onChange={this.changeField}
                           // ref={this.editInput}
                           allowClear/>
                </form>
            </span>
        );
    }
}