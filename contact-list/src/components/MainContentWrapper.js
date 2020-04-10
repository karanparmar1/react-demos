import React from 'react';
import MainContent from "./MainContent";

const MainContentWrapper = ({ localData, objRule, setLocalData, classes, open, handleDrawerOpen, heading, error }) => {

    const [data, setData] = React.useState(localData);
    const changeData = (records) => setData([...records]);

    return (
        <MainContent
            localData={localData}
            setLocalData={setLocalData}
            data={data}
            setData={changeData}
            objRule={objRule}
            classes={classes}
            open={open}
            heading={heading}
            handleDrawerOpen={handleDrawerOpen}
            error={error} />);
};

export default MainContentWrapper;
