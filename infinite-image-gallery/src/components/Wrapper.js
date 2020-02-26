import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchBar from './SearchBar';
import ImageColumns from './ImageColumns';
import './style.css';

export class Wrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiData: [],
            per_page: 16,
            page: 1,
            error: false
        };
    }

    isBlank = (value) => (value.trim() === null ||
        value.trim() === undefined ||
        value.trim() === ' ' ||
        value.trim().length === 0);

    setURL = (query) =>
        (this.isBlank(query)) ?
            `https://api.unsplash.com/photos/?client_id=BGtUVlndC8IQAjSFGDKUMPBTCNNO9fvRaczJH3KuUms&auto=compress&per_page=16` //Default URL for random Images//AuthKey//HgyIReDaPCDFba86F_F4E8ELnbcg8s3PdxWnHq292ZM

            : `https://api.unsplash.com/search/photos/?client_id=BGtUVlndC8IQAjSFGDKUMPBTCNNO9fvRaczJH3KuUms&auto=compress&per_page=16&query=${query}`;
    ;

    getData = (query = '') => {
        let url = this.setURL(query);

        axios({
            method: 'GET',
            url: url,
            responseType: 'json'
        }).then(response => {
            let updatedData = (query === '' ? response.data : response.data.results); //(this.state.apiData).concat
            this.setState({
                apiData: updatedData,
                error: false
            });
        }).catch(error => {
            console.log("->ERROR->" + error);
        });
    };

    componentDidMount() {
        this.getData();
    }
    onChange = (e) => {
        this.getData(e.target.value);
    };

    render() {
        let { apiData, error } = this.state;

        let cols = apiData.length;
        console.log(cols);

        return (
            <div className="container-md ">
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
                < div className="row justify-content-center align-items-around flex-wrap"
                    id="image-gallery">
                    {
                        <div className="masonry-grid">
                            {apiData.map((row, i) =>
                                (!error) ? <img src={row.urls.small} key={i} /> : <div className="errorDiv">Internal Error!</div> //When Limit reached : 403
                            )
                            }
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Wrapper;
