import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Wrapper from './components/Wrapper';

function App() {
    return (
        <div className="App" key="app"> 
            <div className="container-md my-3 text-center" >
                <Wrapper key="wrapper" />
            </div>
        </div>
    );
}

export default App;
