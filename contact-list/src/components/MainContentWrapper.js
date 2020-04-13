import React from 'react';
import MainContent from "./MainContent";

const MainContentWrapper = (props) => {

    const [data, setData] = React.useState(props.localData);
    const changeData = (records) => setData([...records]);

    return (
        <MainContent
            data={data}
            setData={changeData}
            {...props} />);
};

export default MainContentWrapper;
