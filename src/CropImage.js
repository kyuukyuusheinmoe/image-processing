import React, { useRef, useEffect } from 'react';

const CropImage = props => {
    const canvasCropRef = useRef(null);

    useEffect(() => {
        const url = 'http://localhost:3001/static/media/ACM.16d0a392.PNG';
        console.log ('crop width : ' + props.cropWidth + ' height: ' + props.cropHeight);
        const aspectRatio = props.cropWidth/props.cropHeight;

            // this image will hold our source image data
            const inputImage = new Image();
            inputImage.width = 300;
            inputImage.height = 300;

            // we want to wait for our image to load
            inputImage.onload = () => {

                console.log ('natural width' +  inputImage.width);
                console.log ('natural height' +  inputImage.height);

                // let's store the width and height of our image
                const inputWidth = inputImage.width;
                const inputHeight = inputImage.height;

                // get the aspect ratio of the input image
                const inputImageAspectRatio = inputWidth / inputHeight;

                // if it's bigger than our target aspect ratio
                let outputWidth = inputWidth;
                let outputHeight = inputHeight;
                if (inputImageAspectRatio > aspectRatio) {
                    outputWidth = inputHeight * aspectRatio;
                } else if (inputImageAspectRatio < aspectRatio) {
                    outputHeight = inputWidth / aspectRatio;
                }

                // calculate the position to draw the image at
                const outputX = (outputWidth - inputWidth) * .5;
                const outputY = (outputHeight - inputHeight) * .5;

                // create a canvas that will present the output image
              //  const outputImage = document.createElement('canvas');
                const canvas = canvasCropRef.current;


                // set it to the same size as the image
                canvas.width = outputWidth;
                canvas.height = outputHeight;

                // draw our image at position 0, 0 on the canvas
                const ctx = canvas.getContext('2d');
                ctx.drawImage(inputImage, outputX, outputY);
            };

            // start loading our image
            inputImage.src = url;
    }, [])
    return <canvas ref={canvasCropRef} id="crop-canvas" />
}

export default CropImage;