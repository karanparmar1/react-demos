import React from 'react';

const ClickBtn = ({ isOn, clicker }) => (
    <button className={`btn btn-lg border h1 ${isOn ? ' bg-info' : ' bg-warning'}`} onClick={clicker}>
        {isOn ? 'ON' : 'OFF'}
    </button>
);

export default ClickBtn;
