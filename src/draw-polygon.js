import {fabric} from 'fabric';


function DrawPolygon() {
   console.log ('I am in Draw Polygon')
    var canvas = new fabric.Canvas('canvas');
    var polygonCount = 1;
    var startDrawingPolygon;
    var ArrayLength;
    var addTexture = false;
    var circleCount = 1;
    var fillColor = "rgba(46, 240, 56, 0.5)";

    function done() {
        startDrawingPolygon = false;
        ArrayLength = circleCount;
        circleCount = 1;
        var tempCount = 0;
        window["polygon" + polygonCount] = new fabric.Polygon([{
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
            noofcircles: ArrayLength
        });
        canvas.add(window["polygon" + polygonCount]);
        for (var i = 0; canvas.getObjects().length > i; i++) {
            if (canvas.getObjects()[i].polygonNo === polygonCount) {
                var points = window["polygon" + polygonCount].get("points");
                if (canvas.getObjects()[i].circleNo == 1) {
                    points[0].x = canvas.getObjects()[i].left - window["polygon" + polygonCount].get("left");
                    points[0].y = canvas.getObjects()[i].top - window["polygon" + polygonCount].get("top");
                } else if (canvas.getObjects()[i].circleNo == 2) {
                    points[1].x = canvas.getObjects()[i].left - window["polygon" + polygonCount].get("left");
                    points[1].y = canvas.getObjects()[i].top - window["polygon" + polygonCount].get("top");
                } else {
                    points.push({
                        x: canvas.getObjects()[i].left - window["polygon" + polygonCount].get("left"),
                        y: canvas.getObjects()[i].top - window["polygon" + polygonCount].get("top"),
                    });

                }
                window["polygon" + polygonCount].set({
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
        polygonCount++;
        canvas.renderAll();
    }

    function Addpolygon() {
        startDrawingPolygon = true;

    }
    canvas.on('object:moving', function (option) {
        var startY = option.e.offsetY,
            startX = option.e.offsetX;
        for (var i = 0; i < canvas.getObjects().length; i++) {
            if (canvas.getObjects()[i].name == "Polygon") {
                if (canvas.getObjects()[i].PolygonNumber == option.target.polygonNo) {
                    var points = window["polygon" + option.target.polygonNo].get("points");
                    points[option.target.circleNo - 1].x = startX - window["polygon" + option.target.polygonNo].get("left");
                    points[option.target.circleNo - 1].y = startY - window["polygon" + option.target.polygonNo].get("top");
                    window["polygon" + option.target.polygonNo].set({
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
    canvas.on('mouse:down', function (option) {
        let circle;
        if (typeof option.target != "undefined") {
            return;
        } else {
            if (addTexture) {
                console.log(option);
            }
            if (startDrawingPolygon) {
                circle = new fabric.Circle({
                    left: canvas.getPointer(option.e).x,
                    top: canvas.getPointer(option.e).y,
                    radius: 7,
                    hasBorders: false,
                    hasControls: false,
                    polygonNo: polygonCount,
                    name: "draggableCircle",
                    circleNo: circleCount,
                    fill: "rgba(0, 0, 0, 0.5)",
                    hasRotatingPoint: false,
                    originX: 'center',
                    originY: 'center'
                });
                canvas.add(circle);
                canvas.bringToFront(circle);
                circleCount++;
                canvas.renderAll();
            }
        }
    });
}

export default DrawPolygon;