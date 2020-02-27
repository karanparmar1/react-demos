import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchBar from './SearchBar';
import './style.css';


class Wrapper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            apiData: [],
            per_page: 16,
            page: 1,
            query: '',
            error: false
        };
        this.input = '';
        this.typingTimer = 0;
    }


    isBlank = (value) => (value.trim() === null ||
        value.trim() === undefined ||
        value.trim() === ' ' ||
        value.trim().length === 0);


    //clientId = "HWciOOv6d81L7UzgoqBnrNllU4EgYL9n4BBGe-jWPt0";
    clientId = "BGtUVlndC8IQAjSFGDKUMPBTCNNO9fvRaczJH3KuUms";
    //clientId = "HqJ3aeJfSkUfgqvaO3otpmniy_vaQXyn3lOS8KYXSgo";
    //clientId = "HgyIReDaPCDFba86F_F4E8ELnbcg8s3PdxWnHq292ZM";
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
            let updatedData = query === '' ? response.data : response.data.results; //(this.state.apiData).concat
            this.setState((prevState) => ({
                apiData: (!scroll) ? updatedData : (this.state.apiData).concat(...updatedData),
                query: query,
                error: false
            }));
            console.log(query + "  page:" + this.state.page + " per_page:" + this.state.per_page);
            console.log(this.state.apiData);
        }).catch(error => {
            this.setState({ error: true });
            console.log("->ERROR->" + error);
        });
    };

    componentDidMount() {
        // this.setState({
        //     apiData: [],
        //     page: 1
        // });
        this.getData();
    }


    onChange = (e) => {
        clearTimeout(this.typingTimer);
        this.setState({
            apiData: [],
            page: 1
        });

        this.input = e.target.value;
        this.typingTimer = setTimeout(this.getData(e.target.value), 2000);

    };

    render() {

        let { apiData, error } = this.state;

        let cols = apiData.length;
        console.log(this.state.page);
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
                    dataLength={this.state.apiData.length}
                    next={() => {
                        this.setState({
                            page: this.state.page + 1
                        });
                        this.getData(this.input, true)
                    }}
                    hasMore={true}
                    loader={<div className="loading mx-auto"></div>}
                    style={{ overflow: 'hidden' }}
                    scrollThreshold={0.98}
                >
                    {
                        <div className="row justify-content-center align-items-around flex-wrap"
                            id="image-gallery">
                            {(!error) ?
                                <div className="masonry-grid">
                                    {apiData.map((row, i) => (

                                        <div className="img-wrapper" key={i}>
                                            <img src={row.urls.small} key={i} alt={row.alt_description} />
                                            <div className="img-overlay">{row.user.name}</div>
                                        </div>

                                    ))}
                                </div>
                                : <div className="errorDiv">Internal Error!</div> //When Limit reached : 403
                            }
                        </div>
                    }
                </InfiniteScroll>
            </div >


        );
    }
}
export default Wrapper;
