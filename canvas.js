(function() {

  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  var y = 50;
  var triangleCount = 0;

  var getParam = function (name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
  };

  var levels;
  (typeof (getParam ("levels")) === "undefined") ? levels = 1 : levels = getParam ("levels");
  var lines;
  (typeof (getParam ("lines")) === "undefined") ? lines = false : lines = true;
  var rectangles;
  (typeof (getParam ("rectangles")) === "undefined") ? rectangles = false : rectangles = true;

  var drawLine = function (start, end, depth, yCoord) {
    //First
    if (depth > 1) {
      drawLine (start, start+(end-start)/3, depth-1, yCoord);
      drawLine (start+2*(end-start)/3, end, depth-1, yCoord);
    }
    else {
      ctx.moveTo(start,yCoord);
      ctx.lineTo(start+(end-start)/3,yCoord);
      ctx.stroke();
      //Second
      ctx.moveTo(start+2*(end-start)/3,yCoord);
      ctx.lineTo(end,yCoord);
      ctx.stroke();
    }
  };

  var drawTriangle = function (startX, startY, size, depth) {
    //Triangle up
    if (depth > 1) {
      // console.log ("left(" + depth + ")");
      drawTriangle (startX, startY, size/2, depth-1);
      // console.log ("right(" + depth + ")");
      drawTriangle (startX + size/2, startY, size/2, depth-1);
      // console.log ("top(" + depth + ")");
      drawTriangle (startX + size/4, startY-(Math.sqrt(3)*size/4), size/2, depth-1);
    }
    else {
      ctx.moveTo (startX, startY);
      ctx.lineTo (startX + size, startY)
      ctx.lineTo (startX + size/2, startY-(Math.sqrt(3)*size/2));
      ctx.lineTo (startX, startY);
      // console.log ("big(" + depth + ")");
      //Triangle down
      ctx.moveTo (startX + size/4, startY-(Math.sqrt(3)*size/4));
      ctx.lineTo (startX + 3*size/4, startY-(Math.sqrt(3)*size/4));
      ctx.lineTo (startX + size/2, startY);
      ctx.lineTo (startX + size/4, startY-(Math.sqrt(3)*size/4));
      ctx.stroke();
      triangleCount++;
      // console.log ("small(" + depth + ")");
    }
  };

  if (lines) {
    for (var i=1; i<=levels;   i++) {
      drawLine (10, 1810, i, i*50);
    } ;
  };

  if (rectangles) {
    drawTriangle (500, 900, 900, levels);
  };

  document.getElementById ("levels").value=getParam('levels');
  document.getElementById ("lines").checked=!(typeof (getParam ("lines")) === "undefined");
  document.getElementById ("rectangles").checked=!(typeof (getParam ("rectangles")) === "undefined");

  // console.log ("Number of triangles: " + triangleCount);

}());
