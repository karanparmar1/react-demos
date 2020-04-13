import React from 'react';
import MainContentWrapper from "./MainContentWrapper";


const MyApiWrapper = (props) => {
  const [localData, setLocalData] = React.useState(props.apiData);
  const changeData = (records) => setLocalData([...records]);

  return (
    <MainContentWrapper
      localData={localData}
      setLocalData={changeData}
     {...props} />);
}

export default MyApiWrapper;