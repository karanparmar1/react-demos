import React from 'react';
import MainContentWrapper from "./MainContentWrapper"


const MyApiWrapper = ({ apiData, objRule, classes, heading, open, handleDrawerOpen, error }) => {
  const [localData, setLocalData] = React.useState(apiData);
  const changeData = (records) => setLocalData([...records]);

  return (
    <MainContentWrapper
      localData={localData}
      objRule={objRule}
      setLocalData={changeData}
      classes={classes}
      open={open}
      handleDrawerOpen={handleDrawerOpen}
      heading={heading}
      error={error} />);
}

export default MyApiWrapper;