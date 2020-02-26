import React from 'react';

const Image = ({ src, uploader, alt }) =>
    (
        <div className="img-wrapper" >
            <img src={src} alt={alt} />
            <div className="img-overlay h6">{uploader}</div>
        </div>
    );

export default Image;
