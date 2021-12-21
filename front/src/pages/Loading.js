import React from 'react';
import Loader from "react-loader-spinner";


function Loading(props) {
    return (
        <div style={{marginTop:'20%',marginLeft:"45%"}}>
        <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
      />
            
        </div>
    );
}

export default Loading;