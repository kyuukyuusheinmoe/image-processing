import React, { useRef, useEffect } from 'react';
import DrawPolygon from './draw-polygon';
import { fabric } from 'fabric';


const Canvas = props => {
    // to pass ref property to get dom element
    const canvasRef = useRef(null);
    //  const drawPolygon = new DrawPolygon ();

    useEffect(


        () => {
            //  Getting dom element of canvas
            //  const canvas = canvasRef.current;
            var canvas = new fabric.Canvas('canvas', {
                width: 100,
                height: 100
            });
            var fillColor = "rgba(46, 240, 56, 0.5)";

            let circle;
            let circleArr = [
                { left: 25, top: 45 },
                { left: 75, top: 45 },
                { left: 25, top: 90 },
                { left: 75, top: 90 }
            ]
            circleArr.forEach(cir => {
                circle = new fabric.Circle({
                    //left: canvas.getPointer(option.e).x,
                    //top: canvas.getPointer(option.e).y,
                    left: cir.left,
                    top: cir.top,
                    radius: 7,
                    hasBorders: false,
                    hasControls: false,
                    //polygonNo: polygonCount,
                    name: "draggableCircle",
                    circleNo: circleArr.indexOf(cir) + 1,
                    fill: "rgba(0, 0, 0, 0.5)",
                    hasRotatingPoint: false,
                    originX: 'center',
                    originY: 'center'
                });
                console.log('I am circle' + circle)

                canvas.add(circle);
                canvas.bringToFront(circle);
                canvas.renderAll();

                let polygon = new fabric.Polygon([{
                    x: 0,
                    y: 0
                }, {
                    x: 0.5,
                    y: 0.5
                }], {
                    fill: fillColor,
                   // PolygonNumber: polygonCount,
                    name: "Polygon",
                    type: 'normal',
                    noofcircles: 4
                });
                canvas.add(polygon);
                console.log ('total obj' + canvas.getObjects().length);
                for (var i = 0; canvas.getObjects().length > i; i++) {
                        var points = polygon.get("points");
                        console.log ('original points' + points);
                        console.log ('circle no' + canvas.getObjects()[i].circleNo);
                        if (canvas.getObjects()[i].circleNo == 1) {
                            points[0].x = canvas.getObjects()[i].left - polygon.get("left");
                            points[0].y = canvas.getObjects()[i].top - polygon.get("top");
                        } else if (canvas.getObjects()[i].circleNo == 2) {
                            points[1].x = canvas.getObjects()[i].left - polygon.get("left");
                            points[1].y = canvas.getObjects()[i].top - polygon.get("top");
                        } else {
                            points.push({
                                x: canvas.getObjects()[i].left - polygon.get("left"),
                                y: canvas.getObjects()[i].top - polygon.get("top"),
                            });

                        }
                        polygon.set({
                            points: points
                        });
                        canvas.renderAll();
                }
                for (var i = 0; canvas.getObjects().length > i; i++) {
                    if (canvas.getObjects()[i].name == "draggableCircle") {
                        canvas.bringForward(canvas.getObjects()[i]);
                        canvas.renderAll();
                    }
                }

            });

            //     console.log('canvas Ref ' + canvasRef.current)

            //     const context = canvas.getContext('2d')
            //     context.fillStyle = '#000000'
            //     context.fillRect(0, 0, context.canvas.width, context.canvas.height)
        }
        // DrawPolygon()
        , [])

    return <canvas ref={canvasRef} {...props} className='canvas' id='canvas' />
}

export default Canvas;