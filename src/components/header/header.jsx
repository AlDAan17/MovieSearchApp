import React from "react";
import './header.css';
import {Input, Menu} from "antd";
import debounce from 'lodash/debounce'
export default class Header extends React.Component{
    state = {
        value: this.props.query,
    };

    componentDidMount() {
        const {getQuery} = this.props;
        this.queryDebounce = debounce(getQuery, 1000)
    }

    changeField = (event) => {
        const {value} = event.target;
        this.setState({ value });
        this.queryDebounce(value.trim());
    };

    onSubmit = (e) =>{
        e.preventDefault();
    }

    render(){
        const {value} = this.state;
        const {current, selectTab} = this.props

        const searchBar = current === 'search' ? (
            <form onSubmit={this.onSubmit} className="menu__form">
                <Input style={{width: '92.87%'}} placeholder="Type to search..."
                       value={value}
                       onChange={this.changeField}
                       allowClear/>
            </form>
        ) : null;

        return(
            <div className="menu">
                <Menu onSelect={selectTab} selectedKeys={[current]} mode="horizontal" className='menu__item'>
                    <Menu.Item  key="search">Search</Menu.Item>
                    <Menu.Item key="rated">Rated</Menu.Item>
                </Menu>
                {searchBar}
            </div>
        );
    }
}