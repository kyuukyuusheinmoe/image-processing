import React, { useRef, useEffect } from 'react';

const ImageCanvas = props => {
    //add ref to get DOM
    const canvasImgRef = useRef(null);

    useEffect(() => {
        //  Getting dom element of canvas
        const context = canvasImgRef.current;
        const ctx = context.getContext('2d');

        var imageObj = new Image();
        console.log('my img' + imageObj);

        imageObj.src = 'https://getpremium.s3.ap-southeast-1.amazonaws.com/1540523912629-795457242.jpg'
        imageObj.alt = 'cats'
        imageObj.id = 'my-image'
        imageObj.onload = function () {
            ctx.drawImage(imageObj, 0, 0, context.width, context.height);
        }

    }, [])
    return <canvas ref={canvasImgRef} {...props} className='img-canvas' id='img-canvas' />;
    
}

export default ImageCanvas;