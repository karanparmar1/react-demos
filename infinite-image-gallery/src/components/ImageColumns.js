import React from 'react'
import SingleColumn from './SingleColumn';


const ImageColumns = ({ apiData, index, per_page }) => {
    let per_column = 4;
    if (apiData.length) {//IF Api has Data
        per_column = apiData.length / 4;
        return apiData.map((row, i) => (

            <div className="col-12 col-sm-6 col-md-3" key={"col-" + i} >
                <img src={row.urls.small} />
                <SingleColumn per_column={per_column} />
            </div>
        )
        )
    }
    else {
        return <div className="loading"> </div>;  //Else show Loader //WillEven show even data Not Found But There is No Internal error
    }


}
export default ImageColumns;
