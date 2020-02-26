import React from 'react';
import ImageRow from './ImageRow';

let columns = [2, 3, 3, 2];

const ImageColumns = ({ apiData }) => {
    let to = 0;
    return (apiData.length) ?   //IF Api has Data
        columns.map((count, i) => {
            var element = (<div className="col-12 col-sm-6 col-md-3" key={"col-" + i} >
                <ImageRow key={i} apiData={apiData} from={to} to={to + count} />
            </div>);
            to = to + count;
            return element;
        })
        : <div className="loading"> </div>;   //Else show Loader //WillEven show even data Not Found But There is No Internal error

}


export default ImageColumns;
