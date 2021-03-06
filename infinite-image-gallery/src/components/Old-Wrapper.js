import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import SearchBar from './SearchBar';
import Image from './Image';
import './style.css';

class Wrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiData: [],
            per_page: 16,
            page: 1,
            error: false
        };
        this.input = '';
        this.typingTimer = 0;
    }


    isBlank = (value) => (value.trim() === null ||
        value.trim() === undefined ||
        value.trim() === ' ' ||
        value.trim().length === 0);



    //clientId = "HgyIReDaPCDFba86F_F4E8ELnbcg8s3PdxWnHq292ZM";
    clientId = "HWciOOv6d81L7UzgoqBnrNllU4EgYL9n4BBGe-jWPt0";
    //clientId = "BGtUVlndC8IQAjSFGDKUMPBTCNNO9fvRaczJH3KuUms";
    // clientId = "HqJ3aeJfSkUfgqvaO3otpmniy_vaQXyn3lOS8KYXSgo";
    //clientId = "qQUb2bZt1zaTi9LFAH_2EUfHaZ0jF9GB8gTGERPfzC4";
    //clientId = "dOv9RyHpP3AORgU8RmcMqIqVVk_Xtc3lcTaIH0pA5bs";
    setURL = (query) =>
        (this.isBlank(query)) ?
            `https://api.unsplash.com/photos/?client_id=${this.clientId}&auto=compress&per_page=${this.state.per_page}&page=${this.state.page}` //Default URL for random Images

            : `https://api.unsplash.com/search/photos/?client_id=${this.clientId}&auto=compress&per_page=${this.state.per_page}&page=${this.state.page}&query=${query}`;
    ;

    getData = (query = '', scroll = false) => {
        let url = this.setURL(query);
        axios({
            method: 'GET',
            url: url,
            responseType: 'json'
        }).then(response => {
            console.log("inGetData Query:" + query + " , srcoll:" + scroll);

            let updatedData = query === '' ? response.data : response.data.results; //(this.state.apiData).concat
            this.setState({
                apiData: (scroll) ? (this.state.apiData).concat(updatedData) : updatedData,
                page: (scroll) ? this.state.page + 1 : 2,
                error: false
            });
            console.log("query:" + query + "  page:" + this.state.page + " items:" + this.state.apiData.length);
            console.log(this.state.apiData);
        }).catch(error => {
            this.setState({ error: true });
            console.log("->ERROR->" + error);
        });
    };

    componentDidMount() {
        this.typingTimer = setTimeout(() => {
            this.getData(this.input)
        }, 1000);
    }


    onChange = (e) => {
        clearTimeout(this.typingTimer);
        this.input = e.target.value;
        this.setState({
            apiData: [],
            page: 1
        });
        this.typingTimer = setTimeout(() => {
            this.getData(this.input, false)
        }, 1000);

    };

    render() {

        let { apiData, error } = this.state;
        return (
            <div className="container-md mx-auto">
                <header className="container-md border my-2 p-2">
                    <div className="row">
                        <div className="col"><h6>Image Search</h6></div>
                    </div>
                    <div className="row text-center">
                        <div className="col searchDiv">
                            <SearchBar onChange={this.onChange} />
                        </div>
                    </div>
                </header>

                <InfiniteScroll
                    pageStart={0}
                    loader={<div className="loading mx-auto" key={0}></div>}
                    useWindow={true}
                    hasMore={true}
                    threshold={1}
                    initialLoad={false}
                    loadMore={() => {
                        clearTimeout(this.typingTimer);
                        this.typingTimer = setTimeout(() => {
                            this.getData(this.input, true)
                        }, 600+(this.state.page*200));
                    }}

                >
                    {(!error) ?
                        (<div className="row justify-content-center align-items-around flex-wrap"
                            id="image-gallery">
                            <div className="masonry-grid">
                                {apiData.map((data, index) => (
                                    <Image data={data} key={index} />
                                ))}
                            </div>
                        </div>)
                        : <div className="errorDiv">Internal Error!</div> //When Limit reached : 403
                    }
                </InfiniteScroll>

            </div>
        );
    }
}
export default Wrapper;
