import React, { useState } from 'react';

const PointForm = () => {
    let [x1, setX1] = useState ('');

    return (
        <div id='container'> 
            <label> Point 1 : X </label>
            <input onChange> </input>
        </div>
    )
}

export default PointForm;