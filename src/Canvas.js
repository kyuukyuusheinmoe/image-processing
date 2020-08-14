import React, { useRef, useEffect, useState } from 'react';
import DrawPolygon from './draw-polygon';
import { fabric } from 'fabric';


const Canvas = props => {
    // to pass ref property to get dom element
    //  const drawPolygon = new DrawPolygon ();
    let canvasRef = useRef(null);
    
    useEffect(


        () => {
           
            var canvas = new fabric.Canvas('canvas', {
                width: 500,
                height: 500
            });
            var fillColor = "rgba(46, 240, 56, 0.5)";
            let polygonCount = 1;
            let circle;
            let circleArr = [
                { left: 25, top: 45 },
                { left: 75, top: 45 },
                { left: 75, top: 90 },
                { left: 25, top: 90 },
            ];
          

            circleArr.forEach(cir => {
                circle = new fabric.Circle({
                    left: cir.left,
                    top: cir.top,
                    radius: 7,
                    hasBorders: false,
                    hasControls: false,
                    polygonNo: polygonCount,
                    name: "draggableCircle",
                    circleNo: circleArr.indexOf(cir) + 1,
                    fill: "rgba(0, 0, 0, 0.5)",
                    hasRotatingPoint: false,
                    originX: 'center',
                    originY: 'center'
                });

                canvas.add(circle);
                canvas.bringToFront(circle);
                canvas.renderAll();
            });

            let polygon = new fabric.Polygon([{
                x: 0,
                y: 0
            }, {
                x: 0.5,
                y: 0.5
            }], {
                fill: fillColor,
                PolygonNumber: polygonCount,
                name: "Polygon",
                type: 'normal',
                noofcircles: 4,
                objectCaching: false
            });
            canvas.add(polygon);
            for (var i = 0; canvas.getObjects().length > i; i++) {
                if (canvas.getObjects()[i].polygonNo === polygonCount) {
                    var points = polygon.get("points");
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
            }
            for (var i = 0; canvas.getObjects().length > i; i++) {
                if (canvas.getObjects()[i].name == "draggableCircle") {
                    canvas.bringForward(canvas.getObjects()[i]);
                    canvas.renderAll();
                }
            }
            canvas.renderAll();
            canvas.on('object:moving', function (option) {
                console.log ('I am moving')
                var startY = option.e.offsetY,
                    startX = option.e.offsetX;

                for (var i = 0; i < canvas.getObjects().length; i++) {
                    if (canvas.getObjects()[i].name == "Polygon") {
                        if (canvas.getObjects()[i].PolygonNumber == option.target.polygonNo) {
                            var points = polygon.get("points");
                            points[option.target.circleNo - 1].x = startX - polygon.get("left");
                            points[option.target.circleNo - 1].y = startY - polygon.get("top");
                            polygon.set({
                                points: points
                            });
                            canvas.renderAll();
                        }
                    }

                    if (canvas.getObjects()[i].name == "draggableCircle") {
                        canvas.bringForward(canvas.getObjects()[i]);
                    }

                }
                canvas.renderAll();
            })
        }
        , [])

    return <canvas ref={canvasRef} {...props} className='canvas' id='canvas' />
}

export default Canvas;