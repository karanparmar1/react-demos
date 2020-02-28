import React from 'react';

const Image = ({ data }) => {
    return (

        <div className="img-wrapper" >
            <img src={data.urls.small} alt={data.alt_description} />
            <div className="img-overlay">{data.user.name}</div>
        </div>
    )
}

export default Image;
