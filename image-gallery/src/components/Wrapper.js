import React from 'react';
import SearchBar from './SearchBar';
import ImageColumns from './ImageColumns';
import './style.css';
const axios = require('axios');

class Wrapper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            apiData: [],
            error: false
        };
    }

    isBlank = (value) => (value.trim() === null ||
        value.trim() === undefined ||
        value.trim() === ' ' ||
        value.trim().length === 0);

    getData = (query = '') => {
        let url = '';
        if (this.isBlank(query)) {
            url = 'https://api.unsplash.com/photos/?client_id=HgyIReDaPCDFba86F_F4E8ELnbcg8s3PdxWnHq292ZM'; //Default URL for random Images//AuthKey//BGtUVlndC8IQAjSFGDKUMPBTCNNO9fvRaczJH3KuUms
        }
        else {
            url = 'https://api.unsplash.com/search/photos/?client_id=HgyIReDaPCDFba86F_F4E8ELnbcg8s3PdxWnHq292ZM&query=' + query;
        }

        axios({
            method: 'GET',
            url: url,
            responseType: 'json'
        }).then(response => {
            this.setState({
                apiData: query === '' ? response.data : response.data.results,
                error: false
            });
            console.log("---AxiosCall start");
            console.log(this.state);
            console.log("End Axios ---");
        }).catch((error) => {
            console.log("->ERRROR : " + error);
            this.setState({
                error: true
            });
        });

    };

    componentDidMount() {
        this.getData();
    }

    onChange = (e) => {
        this.getData(e.target.value);
    };

    render() {
        const { apiData, error } = this.state;
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

                <div className="row justify-content-center align-items-around flex-wrap"
                    id="image-gallery">
                    {
                        (!error) ? <ImageColumns apiData={apiData} /> : <div className="errorDiv">Internal Error!</div> //When Limit reached : 403
                    }
                </div>

            </div>
        );
    }//End Of Render


}

export default Wrapper;
