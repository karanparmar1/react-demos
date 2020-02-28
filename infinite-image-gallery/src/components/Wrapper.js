import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
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
        this.total_items=0;
        this.hasMore = false;
    }


    isBlank = (value) => (value.trim() === null ||
        value.trim() === undefined ||
        value.trim() === ' ' ||
        value.trim().length === 0);

    clientId = "HgyIReDaPCDFba86F_F4E8ELnbcg8s3PdxWnHq292ZM";
    //clientId = "HWciOOv6d81L7UzgoqBnrNllU4EgYL9n4BBGe-jWPt0";
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
            //this.total_pages = (query === '') ? true : (this.state.page <= response.data.total_pages);
            this.total_items = (query === '') ? this.total_items : response.data.total;
            this.hasMore = query === '' ? true :   response.data.total > this.state.apiData.length;
            this.setState({
                apiData: (scroll) ? (this.state.apiData).concat(...updatedData) : updatedData,
                error: false
            });
            console.log("query:" + query + "  page:" + this.state.page + " items:" + this.state.apiData.length + " hasMore:" + this.hasMore);
            console.log(this.state.apiData);
        }).catch(error => {
            this.setState({ error: true });
            console.log("->ERROR->" + error);
        });
    };

    componentDidMount() {
        this.getData();
    }

    onChange = (e) => {
        this.input = e.target.value;
        clearTimeout(this.typingTimer);
        this.setState({
            apiData: [],
            page: 1
        });
        this.typingTimer = setTimeout(() => {
            this.getData(this.input)
        }, 500);

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
                {(!error) ?

                    <InfiniteScroll
                        dataLength={apiData.length}
                        next={() => {
                            clearTimeout(this.typingTimer);
                            this.setState({
                                page: this.state.page + 1
                            });
                            this.typingTimer = setTimeout(() => {
                                this.getData(this.input, true)
                            }, 600 + (this.state.page * 200));
                        }}
                        hasMore={this.hasMore}
                        loader={<div className="loading mx-auto"></div>}
                        style={{ overflow: 'hidden' }}
                        scrollThreshold={0.98}
                        endMessage={<div className="mx-auto">You've reached THE END.</div>}
                    >
                        {
                            <div className="row justify-content-center align-items-around flex-wrap"
                                id="image-gallery">

                                <div className="masonry-grid">
                                    {apiData.map((data, index) => (
                                        <Image data={data} key={index} />
                                    ))}
                                </div>

                            </div>
                        }
                    </InfiniteScroll>

                    : <div className="errorDiv">Internal Error! {error}</div> //When Limit reached : 403
                }
            </div>
        );
    }
}
export default Wrapper;
