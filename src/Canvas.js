import React, { useRef, useEffect, useState } from 'react';
import DrawPolygon from './draw-polygon';
import { fabric } from 'fabric';
import CropImage from './CropImage';
import cv from './opencv';

const Canvas = props => {
    // to pass ref property to get dom element
    //  const drawPolygon = new DrawPolygon ();
    let canvasRef = useRef(null);
    let canvasOutRef = useRef(null);

    let circleArr = [
        { left: 25, top: 45 },
        { left: 75, top: 45 },
        { left: 75, top: 90 },
        { left: 25, top: 90 },
    ];
    let [x1, setX1] = useState(25);
    let [y1, setY1] = useState(45);
    let [x2, setX2] = useState(75);
    let [y2, setY2] = useState(45);
    let [x3, setX3] = useState(75);
    let [y3, setY3] = useState(90);
    let [x4, setX4] = useState(25);
    let [y4, setY4] = useState(90);
    let [isCrop, setIsCrop] = useState(false);
    let [cropWidth, setCropWidth] = useState(0);
    let [cropHeight, setCropHeight] = useState(0);

    const showNewImage = () => {
        //Show image via openCV
        let src = cv.imread('my-image');
        let dst = new cv.Mat();
        let dsize = new cv.Size(src.rows, src.cols);

        let srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, [56, 65, 368, 52, 28, 387, 389, 390]);
        let dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, 50, 0, 0, 50, 300, 300]);
        let M = cv.getPerspectiveTransform(srcTri, dstTri);
        // You can try more different parameters
        cv.warpPerspective(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
        cv.imshow('canvasOutput', dst);
        src.delete(); dst.delete(); M.delete(); srcTri.delete(); dstTri.delete();
    }

    useEffect(


        () => {

            // let src = cv.imread('canvas');
            // let dsize = new cv.Size(src.rows, src.cols);

            // console.log (dsize);

            //Draw image in polygon canvas
            // const context = canvasRef.current;
            // const ctx = context.getContext('2d');

            // var imageObj = new Image();
            // console.log('my img' + imageObj);

            // imageObj.src = 'https://getpremium.s3.ap-southeast-1.amazonaws.com/1540523912629-795457242.jpg'
            // imageObj.alt = 'cats'
            // imageObj.id = 'my-image'
            // imageObj.onload = function () {
            //     ctx.drawImage(imageObj, 0, 0, context.width, context.height);
            // }




            // var canvas = new fabric.Canvas('canvas');
            // var fillColor = "rgba(46, 240, 56, 0.5)";
            // let polygonCount = 1;
            // let circle;



            // circleArr.forEach(cir => {
            //     circle = new fabric.Circle({
            //         left: cir.left,
            //         top: cir.top,
            //         radius: 7,
            //         hasBorders: false,
            //         hasControls: false,
            //         polygonNo: polygonCount,
            //         name: "draggableCircle",
            //         circleNo: circleArr.indexOf(cir) + 1,
            //         fill: "rgba(0, 0, 0, 0.5)",
            //         hasRotatingPoint: false,
            //         originX: 'center',
            //         originY: 'center'
            //     });

            //     canvas.add(circle);
            //     canvas.bringToFront(circle);
            //     canvas.renderAll();
            // });

            // let polygon = new fabric.Polygon([{
            //     x: 0,
            //     y: 0
            // }, {
            //     x: 0.5,
            //     y: 0.5
            // }], {
            //     fill: fillColor,
            //     PolygonNumber: polygonCount,
            //     name: "Polygon",
            //     type: 'normal',
            //     noofcircles: 4,
            //     objectCaching: false
            // });
            // canvas.add(polygon);
            // for (var i = 0; canvas.getObjects().length > i; i++) {
            //     if (canvas.getObjects()[i].polygonNo === polygonCount) {
            //         var points = polygon.get("points");
            //         if (canvas.getObjects()[i].circleNo == 1) {
            //             points[0].x = canvas.getObjects()[i].left - polygon.get("left");
            //             points[0].y = canvas.getObjects()[i].top - polygon.get("top");
            //         } else if (canvas.getObjects()[i].circleNo == 2) {
            //             points[1].x = canvas.getObjects()[i].left - polygon.get("left");
            //             points[1].y = canvas.getObjects()[i].top - polygon.get("top");
            //         } else {
            //             points.push({
            //                 x: canvas.getObjects()[i].left - polygon.get("left"),
            //                 y: canvas.getObjects()[i].top - polygon.get("top"),
            //             });

            //         }

            //         polygon.set({
            //             points: points
            //         });
            //         canvas.renderAll();
            //     }
            // }
            // for (var i = 0; canvas.getObjects().length > i; i++) {
            //     if (canvas.getObjects()[i].name == "draggableCircle") {
            //         canvas.bringForward(canvas.getObjects()[i]);
            //         canvas.renderAll();
            //     }
            // }
            // canvas.renderAll();
            // canvas.on('object:moving', function (option) {
            //     console.log('I am moving')
            //     var startY = option.e.offsetY,
            //         startX = option.e.offsetX;

            //     for (var i = 0; i < canvas.getObjects().length; i++) {
            //         if (canvas.getObjects()[i].name == "Polygon") {
            //             if (canvas.getObjects()[i].PolygonNumber == option.target.polygonNo) {
            //                 var points = polygon.get("points");
            //                 points[option.target.circleNo - 1].x = startX - polygon.get("left");
            //                 points[option.target.circleNo - 1].y = startY - polygon.get("top");
            //                 //To show change points in input fields
            //                 switch (option.target.circleNo) {
            //                     case 1: setX1(points[option.target.circleNo - 1].x);
            //                         setY1(points[option.target.circleNo - 1].y); break;
            //                     case 2: setX2(points[option.target.circleNo - 1].x);
            //                         setY2(points[option.target.circleNo - 1].y); break;
            //                     case 3: setX3(points[option.target.circleNo - 1].x);
            //                         setY3(points[option.target.circleNo - 1].y); break;
            //                     case 4: setX4(points[option.target.circleNo - 1].x);
            //                         setY4(points[option.target.circleNo - 1].y); break;
            //                 }
            //                 //Get crop width and height
            //                 setCropWidth(x2 - x1);
            //                 setCropHeight(y3 - y2);
            //                 polygon.set({
            //                     points: points
            //                 });


            //                 canvas.renderAll();
            //             }
            //         }

            //         if (canvas.getObjects()[i].name == "draggableCircle") {
            //             canvas.bringForward(canvas.getObjects()[i]);
            //         }

            //     }
            //     canvas.renderAll();
            // })
        }
        , [])
    if (isCrop) {
        return (
            <div>
                <div className="polygon-canvas">
                    {/* <canvas ref={canvasRef} {...props} className='canvas' id='canvas' /> */}
                    <img id="my-image" alt="No Image" src="./images/cat.jpg" />

                    <canvas ref={canvasOutRef} {...props} className='canvasOutput' id='canvasOutput' />
                    <button onClick={() => showNewImage()}> Preview</button>
                </div>
                <div>
                    <label> X1 :</label>
                    <input type='text' value={x1} onChange={(text) => setX1(text)} />
                    <label> Y1 :</label>
                    <input type='text' value={y1} onChange={(text) => setY1(text)} />
                </div>
                <div>
                    <label> X2 :</label>
                    <input type='text' value={x2} onChange={(text) => setX2(text)} />

                    <label> Y2 :</label>
                    <input type='text' value={y2} onChange={(text) => setY2(text)} />
                </div>
                <div>
                    <label> X3 :</label>
                    <input type='text' value={x3} onChange={(text) => setX3(text)} />

                    <label> Y3 :</label>
                    <input type='text' value={x3} onChange={(text) => setY3(text)} />
                </div>
                <div>
                    <label> X4 :</label>
                    <input type='text' value={x4} onChange={(text) => setX4(text)} />

                    <label> Y4 :</label>
                    <input type='text' value={y4} onChange={(text) => setY4(text)} />
                </div>
                {/* <CropImage cropWidth={cropWidth} cropHeight={cropHeight} /> */}
            </div >
        );
    } else {
        return (
            <div>
                <div className="polygon-canvas">
                    <canvas ref={canvasRef} {...props} className='canvas' id='canvas' />
                    <canvas ref={canvasOutRef} {...props} className='canvasOutput' id='canvasOutput' />

                    <button onClick={() => setIsCrop(true)}> Preview</button>
                </div>
                <div>
                    <label> X1 :</label>
                    <input type='text' value={x1} onChange={(text) => setX1(text)} />
                    <label> Y1 :</label>
                    <input type='text' value={y1} onChange={(text) => setY1(text)} />
                </div>
                <div>
                    <label> X2 :</label>
                    <input type='text' value={x2} onChange={(text) => setX2(text)} />

                    <label> Y2 :</label>
                    <input type='text' value={y2} onChange={(text) => setY2(text)} />
                </div>
                <div>
                    <label> X3 :</label>
                    <input type='text' value={x3} onChange={(text) => setX3(text)} />

                    <label> Y3 :</label>
                    <input type='text' value={x3} onChange={(text) => setY3(text)} />
                </div>
                <div>
                    <label> X4 :</label>
                    <input type='text' value={x4} onChange={(text) => setX4(text)} />

                    <label> Y4 :</label>
                    <input type='text' value={y4} onChange={(text) => setY4(text)} />
                </div>
            </div >
        );
    }
}

export default Canvas;