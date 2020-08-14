import React, { useRef, useEffect } from 'react';

const ImageCanvas = props => {
    //add ref to get DOM
    const canvasImgRef = useRef(null);

    useEffect(() => {
        //  Getting dom element of canvas
        const canvas = canvasImgRef.current;
        const context = canvasImgRef.current;
        const ctx = context.getContext('2d');

        var imageObj = new Image();
        console.log('my img' + imageObj);

        imageObj.src = 'http://localhost:3001/static/media/ACM.16d0a392.PNG'
        imageObj.alt = 'cats'
        imageObj.id = 'my-image'
        imageObj.onload = function () {
            ctx.drawImage(imageObj, 0, 0, 500, 500);
        }
    }, [])
    return
    (<canvas ref={canvasImgRef} {...props} className='img-canvas' id='img-canvas' />
    )
}

export default ImageCanvas;