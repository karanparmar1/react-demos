import React from 'react';
import Image from './Image';
let i = 0;
function ImageRow(props) {
    const { apiData, from, to } = props;

    let element = '';
    let error = false;
    let imgIndex = [];
    for (i = from; i < to; i++) {
        imgIndex.push(i);
    }

    const img = imgIndex.map((index, i) => {
        if (apiData[index]) {
            element = <Image src={apiData[index].urls.small} uploader={apiData[index].user.name} alt={apiData[index].alt_description} key={apiData[index].id} />
        }
        else {
            element = ''; //<div className="loading" id={'err'} key={i}></div>
            error=true;
        }
        return element;
    });

    if(error){
        console.log(" IMAGE NOT FOUND");
    }
    return <React.Fragment>{img}</React.Fragment>;
}

export default ImageRow;
