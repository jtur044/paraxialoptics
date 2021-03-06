  var lens = { prescription: null, 
               tabledata : null,
               table : null,
               modal: { group:       "",
                        type:        "",
                        description: "",
                        radius:      "",
                        height:      "",
                        index:       "",
                        thickness:   "",
                        stop:        "",
                        aperture:    "" 
                      } 
            };



  var paper; // store the paper here 
  var viewBoxWidth  = 80;
  var viewBoxHeight = 40;
  var paperWidth    = 900;
  var paperHeight   = 600;
  var oX,oY;
  var oWidth,oHeight;


  var ps, cd_set, axis_set;
  var cp_set, optics_set;


  function startDrawing(canvasID) {

        // create the canvas
        paper = new Raphael(document.getElementById(canvasID), paperWidth, paperHeight);

        // objects are stored in sets that are cleared  
        ps          = paper.set();
        cd_set      = paper.set();
        axis_set    = paper.set(); 
        cp_set      = paper.set();
        optics_set  = paper.set();

        
        oWidth = viewBoxWidth, oHeight = viewBoxHeight;
        var oX = -viewBoxWidth/2, oY = -viewBoxHeight/2, oWidth = viewBoxWidth, oHeight = viewBoxHeight;        
        viewBox   = paper.setViewBox(oX, oY, viewBoxWidth, viewBoxHeight);
        viewBox.X = oX; viewBox.Y = oY;

        // draw the axis 
        drawAxis(paper, true,0);

  }




/* draw axis on a raphael canvas
  r - the Raphael canvas to draw on
  grid - true/false draws a grid or not
  offset - how far from 0,0 to draw the axis - they show better at 2
*/

var axis_set; 

var drawAxis = function (r, grid, offset) {
  
  var g = grid || false;
  var o = offset || 0.1;


  // use divisions of 1, 5, 10, 15, 20  (try to keep as close to x number of divisions)

  // viewBox.X, viewBox.Y, viewBoxWidth, viewBoxHeight

  // Width 
  var left    = viewBox.X;
  var top     = viewBox.Y;
  var width   = viewBoxWidth;
  var height  = viewBoxHeight;
  var right   = left + width;
  var bottom  = top + height;

  
  console.log("left = " + viewBox.X + " top = " + viewBox.Y + " width = " + viewBoxWidth + " height = " + viewBoxHeight);

  // divSize 
  var divs    = Math.floor ( width / 20 );           // 20 divs on screen  
  var divSize = Math.max(1, 5*Math.floor(divs/5) );  // approximate div. size 



  // X 
  var startX = -divSize * divs;
  var endX   = +divSize * divs;

  // Y 
  var startY = -divSize * divs;
  var endY   = +divSize * divs;


  var grid_attributes   = { "stroke" : "gray", "stroke-width" : "5", 'stroke-opacity': 0.1 };
  var border_attributes = { "stroke" : "red", "stroke-width" : "5", 'stroke-opacity': 0.1 };


  var dX = 2*width;
  var dY = 2*height;

  if (grid) {

      axis_set.remove();
      axis_set = paper.set();
      

      // Draws a border 
      // axis_set.push( r.rect(left, top, width, height).attr(border_attributes) );

      // grid vertical       
      X = 0; 
      while (X <= right + dX) {
        axis_set.push( r.path("M"+X+","+(top-dY)+"L"+X+","+(bottom+dY)).attr(grid_attributes) );
        axis_set.push( r.path("M"+-X+","+(top-dY)+"L"+-X+","+(bottom+dY)).attr(grid_attributes) );        
        X = X + divSize;
      }

      // grid horizontal
      Y = 0;
      while (Y <= bottom + dY) {
        axis_set.push( r.path("M"+(left-dX)+","+-Y+"L"+(right+dX)+","+-Y).attr(grid_attributes) );
        axis_set.push( r.path("M"+(left-dX)+","+Y+"L"+(right+dX)+","+Y).attr(grid_attributes) );
        Y = Y + divSize;
      }

    }


 }

/*
var drawAxis = function (r, grid, offset) {
  var g = grid || false;
  var o = offset || 0.1;

  var viewBox = r._viewBox;

  var left    = viewBox[0];
  var top     = viewBox[1];  
  var width   = viewBox[2];
  var height  = viewBox[3];
  var bottom  = top + height;
  var right   = left + width;


  //r.path("M"+-w+","+o+"L0,"+o+"L"+o+","+h).attr("stroke", "red");
  //r.path("M"+w+","+o+"L"+(w-5)+",5").attr("stroke", "red");
  //r.path("M"+o+","+h+"L5,"+(h-5)).attr("stroke", "red");
  //console.log("left = " + left + " top="+top);

  if (grid) {

      var s = 1;

      // grid vertical 
      for (var i = left; i<= (left + width); i=i+s) {
        r.path("M"+i+","+top+"L"+i+","+bottom).attr({ "stroke" : "gray", "stroke-width" : "5", 'stroke-opacity': 0.1 });
        // if(i%2 == 0) r.text(i*50-10,10,i*50).attr("fill", "blue");

        // minor ticks 
        r.path("M"+i+",0.05 L"+i+",-0.05").attr({ "stroke" : "black", "stroke-width" : "5", 'stroke-opacity': 0.25 });

        if (i % 5 == 0) {          
        r.path("M"+i+",0.2 L"+i+",-0.2").attr({ "stroke" : "black", "stroke-width" : "5", 'stroke-opacity': 0.25 });
        r.text(i, +0.75, i).attr({fill: 'gray', 'font-size':1, "stroke-opacity": 0.1 }).scale(0.75);
        }

      }

      // grid horizontal 
      for (var i = top; i<= top + height; i=i+s) {
        r.path("M"+left+","+i+"L"+right+","+i).attr({ "stroke" : "gray", "stroke-width" : "5", 'stroke-opacity': 0.1 });
        //if(i%2 == 0) r.text(10,i*50-10,i*50).attr("fill", "blue");

        r.path("M-0.05,"+i+" L0.05,"+i).attr({ "stroke" : "black", 'stroke-opacity': 0 });
        if (i % 5 == 0) {          
          r.path("M-0.2,"+i+" L0.2,"+i).attr({ "stroke" : "black", 'stroke-opacity': 0 });
          r.text(-0.75, i, i).attr({fill: 'gray', 'font-size':1, "stroke-opacity": 0.1 }).scale(0.75);

        }

      }

      // line horizontal 
      r.path("M"+left+",0 L"+right+",0").attr({ "stroke" : "black", "stroke-width" : "5", 'stroke-opacity': 0.25 });

      // minor ticks 


      // major ticks 


      // line vertical 
      r.path("M0,"+top+" L0,"+bottom).attr({ "stroke" : "black", "stroke-width" : "5", 'stroke-opacity': 0.25 });

      // minor ticks 

      // major ticks 




  }
}
*/


  function drawCardinalPoints(x, y, systemPoints, displayOptions) {

    console.log("Updated cardinal points.");


    cp_set.remove();
    cp_set = paper.set();

    var cp;


    var v1 = x + 0;
    var v2 = x + systemPoints.L;
    var h  = displayOptions.height * 2.0;

    console.log(systemPoints);

    // cardinal points 
    if (displayOptions.showCardinalPoints) {

        // focal points
        if (displayOptions.showFocalPoints) {
          var pf1 = systemPoints.cardinal.PF1;
          var pf2 = systemPoints.cardinal.PF2;
          var vp1 = systemPoints.cardinal.VP1;
          var vp2 = systemPoints.cardinal.VP2;
          
          var x1 = v1 + vp1 + pf1;
          var x2 = v2 + vp2 + pf2;
          var y1 = y - h/2;
          var y2 = y + h/2;

          cp1 = drawPoint(x1, y, "magenta");
          cp2 = drawPoint(x2, y, "magenta");
          cp_set.push(cp1, cp2);

          cp1 = paper.path( ["M", x1, y1, "L", x1, y2 ] ).attr({"gray": "#000000", "stroke-opacity": 0.5, "stroke": "gray", "stroke-width": "1", "stroke-dasharray":"--"});
          cp2 = paper.path( ["M", x2, y1, "L", x2, y2 ] ).attr({"gray": "#000000", "stroke-opacity": 0.5, "stroke": "gray", "stroke-width": "1", "stroke-dasharray":"--"});
          cp_set.push(cp1, cp2);

        }

        // nodal points
        if (displayOptions.showNodalPoints) {
          
          var vn1 = systemPoints.cardinal.VN1;
          var vn2 = systemPoints.cardinal.VN2;

          cp1 = drawPoint(v1 + vn1, y, "blue");
          cp2 = drawPoint(v2 + vn2, y, "blue");
          cp_set.push(cp1, cp2);

          var x1 = v1 + vn1;
          var x2 = v2 + vn2;
          var y1 = y - h/2;
          var y2 = y + h/2;

          cp1 = paper.path( ["M", x1, y1, "L", x1, y2 ] ).attr({"fill": "gray", "stroke-opacity": 0.5, "stroke": "gray", "stroke-width": "1", "stroke-dasharray":"--"});
          cp2 = paper.path( ["M", x2, y1, "L", x2, y2 ] ).attr({"fill": "gray", "stroke-opacity": 0.5, "stroke": "gray", "stroke-width": "1", "stroke-dasharray":"--"});
          cp_set.push(cp1, cp2);

        }

        // nodal points
        if (displayOptions.showPrincipalPoints) {

          var vp1 = systemPoints.cardinal.VP1;
          var vp2 = systemPoints.cardinal.VP2;

          cp1 = drawPoint(v1 + vp1, y, "red");
          cp2 = drawPoint(v2 + vp2, y, "red");
          cp_set.push(cp1, cp2);

          var x1 = v1 + vp1;
          var x2 = v2 + vp2;
          var y1 = y - h/2;
          var y2 = y + h/2;

          cp1 = paper.path( ["M", x1, y1, "L", x1, y2 ] ).attr({"fill": "gray", "stroke-opacity": 0.5, "stroke": "gray", "stroke-width": "1", "stroke-dasharray":"--"});
          cp2 = paper.path( ["M", x2, y1, "L", x2, y2 ] ).attr({"fill": "gray", "stroke-opacity": 0.5, "stroke": "gray", "stroke-width": "1", "stroke-dasharray":"--"});
          cp_set.push(cp1, cp2);

        }

        // vertices
        if (displayOptions.showVertices) {

          cp1 = drawPoint(v1 + vn1, y, "green");
          cp2 = drawPoint(v2 + vn2, y, "green");
          cp_set.push(cp1, cp2);

          var y1 = y - h/2;
          var y2 = y + h/2;

          cp1 = paper.path( ["M", v1, y1, "L", v1, y2 ] ).attr({"fill": "gray", "stroke-opacity": 0.5, "stroke": "gray", "stroke-width": "1", "stroke-dasharray":"--"});
          cp2 = paper.path( ["M", v2, y1, "L", v2, y2 ] ).attr({"fill": "gray", "stroke-opacity": 0.5, "stroke": "gray", "stroke-width": "1", "stroke-dasharray":"--"});
          cp_set.push(cp1, cp2);

        }

    }


  }


  function drawThinLens(x, y, F, displayOptions) {

    var lens = paper.set();

    // draw a path 
    var h = displayOptions.height; 
    c = paper.path( ["M", x, y-h/2, "L", x, y+h/2  ] );
    lens.push(c);


    if (F < 0) {   // negative lens 

      y1 = y-h/2; y2 = y+h/2;

      c1 = paper.path( ["M", x, y2, "L", x+h/30, y2+h/30  ] );
      c2 = paper.path( ["M", x, y2, "L", x-h/30, y2+h/30  ] );

      c3 = paper.path( ["M", x, y1, "L", x-h/30, y1-h/30  ] );
      c4 = paper.path( ["M", x, y1, "L", x+h/30, y1-h/30  ] );

      lens.push(c1, c2, c3, c4);


    } else if (F > 0) {   // positive lens

      y1 = y+h/2; y2 = y-h/2;

      c1 = paper.path( ["M", x, y2, "L", x+h/30, y2+h/30  ] );
      c2 = paper.path( ["M", x, y2, "L", x-h/30, y2+h/30  ] );

      c3 = paper.path( ["M", x, y1, "L", x-h/30, y1-h/30  ] );
      c4 = paper.path( ["M", x, y1, "L", x+h/30, y1-h/30  ] );

      lens.push(c1, c2, c3, c4);


    } else { // afocal
      
      c1 = paper.circle(x, y + h/2, 0.1);
      c2 = paper.circle(x, y - h/2, 0.1);      

      lens.push(c1, c2);

    }

    return lens;
  }



  /* ---------------------------------------------------------------------------------------------------------------

    draggable points - render the finite object / image conjugates given a processed pointList

    TO DO:

    dataOption - ignore intermediate object/image points 
               - intermediate rays 


    displayOptions : { showAll : true }               
  
   --------------------------------------------------------------------------------------------------------------- */


   var ox, oy, lx, ly; 


    //Pane
   dragPointStart = function (e) {

        console.log("point dragger start");

        // storing original coordinates
        this.ox = this.attr("x");
        this.oy = this.attr("y");

    };

  dragPointMove = function (dx, dy) {
        
        console.log("point dragger move");

        nowX = this.ox + dx;
        nowY = this.oy + dy;
        this.attr({ X: nowX, y: nowY });

    };

  dragPointUp = function () {

        console.log("point dragger up");

    };




  function drawPoint(x, y, color) {
  
    var c = paper.circle(x, y, 0.5).attr({"fill": color, "fill-opacity": 1.0, "stroke": "#000000", "stroke-width": "1"});
    c.drag(dragPointMove, dragPointStart, dragPointUp);
    
    // c.drag(dragPointMove, dragPointStart, dragPointUp);
    return c;
  } 




  /* ---------------------------------------------------------------------------------------------------------------

    renderCardinalRays - render the finite object / image conjugates given a processed pointList

    TO DO:

    dataOption - ignore intermediate object/image points 
               - intermediate rays 


    displayOptions : { showAll : true }               
  
   --------------------------------------------------------------------------------------------------------------- */


  function drawCardinalRays(lens, conjObject, displayOptions) {

     // console.log(lens);

     console.log("draw cardinal rays.");


     cd_set.remove ();
     cd_set = paper.set();


     var N1 = lens.cardinal.VN1;
     var N2 = lens.L + lens.cardinal.VN2;
     var P1 = lens.cardinal.VP1;
     var P2 = lens.L + lens.cardinal.VP2;
     var F1 = lens.cardinal.VF1;
     var F2 = lens.L + lens.cardinal.VF2;

     // check if the system is AFOCAL 


     var X1 = conjObject.X1;
     var Y1 = conjObject.Y1;
     var X2 = conjObject.X2;
     var Y2 = conjObject.Y2;

     // display the nodal rays (Obect => N1 N2 => Image )

     var attributes     = { "fill": "gray", "stroke-opacity": 0.5, "stroke": "black", "stroke-width": "1" };
     var virtual        = { "fill": "gray", "stroke-opacity": 0.5, "stroke": "black", "stroke-width": "1", "stroke-dasharray":"--" };
     var real           = { "fill": "gray", "stroke-opacity": 0.5, "stroke": "black", "stroke-width": "1" };
     var extend         = { "fill": "red", "stroke-opacity": 0.5, "stroke": "red", "stroke-width": "1" };
     var extend_object  = { "fill": "green", "stroke-opacity": 0.5, "stroke": "green", "stroke-width": "1" };


     // FINITE INFORMATION 

     var X1_attributes; 
     var X2_attributes;

     // nodal ray 
     var N1_attributes, N2_attributes; 
     N1_attributes = (X1 <= N1) ? real : virtual;
     N2_attributes = (N2 <= X2) ? real : virtual;
     p1 = paper.path( ["M", X1, Y1, "L", N1, 0 ] ).attr(N1_attributes);
     p2 = paper.path( ["M", X2, Y2, "L", N2, 0 ] ).attr(N2_attributes);
     cd_set.push(p1, p2);


     var P2_attributes, F2_attributes; 
     P2_attributes = (X1 <= P2) ? real : virtual;
     F2_attributes = (P2 <= F2) ? real : virtual;
     X2_attributes = (F2 <= X2) ? real : virtual;

     p3 = paper.path( ["M", X1, Y1, "L", P2, Y1] ).attr(P2_attributes);
     p4 = paper.path( ["M", P2, Y1, "L", F2, 0 ] ).attr(F2_attributes); // should apss through F2
     cd_set.push(p3, p4);


     if (F2 <= X2) {  // real image  
        
        p = paper.path( ["M", F2, 0, "L", X2, Y2 ] ).attr(X2_attributes); // should pass through F2
        cd_set.push (p);

     } else { // virtual image 
        
        p = paper.path( ["M", P2, Y1, "L", X2, Y2 ] ).attr(X2_attributes); // should apss through F2
        cd_set.push (p);
     }

     // first principal ray (goes thorugh F1)
     var P1_attributes, F1_attributes; 
     F1_attributes = (X1 <= F1) ? real : virtual;
     P1_attributes = (F1 <= P1) ? real : virtual;
     X2_attributes = (P1 <= X2) ? real : virtual;

     p1 = paper.path( ["M", X1, Y1, "L", F1, 0 ] ).attr(F1_attributes);



     p2 = paper.path( ["M", X1, Y1,  "L", P1, Y2 ] ).attr(P1_attributes); // this one needs to be modified 
     p3 = paper.path( ["M", P1, Y2, "L", X2, Y2 ] ).attr(X2_attributes);
     cd_set.push(p1, p2, p3);


     // Virtual Image : extension rays for virtual images  
     if (X2 < P2) { // virtual 

        // virtual image - add extension ray 

        // F1 ray         
        var m = (Y2-0)/(X2-F2);
        p = paper.path( ["M", F2, 0, "L",  F2 + 20, 0 + m*20 ] ).attr(extend); // should apss through F2
        cd_set.push(p);

        // F2 ray 
        p = paper.path( ["M", P1, Y2, "L",  P1 + 20, Y2 ] ).attr(extend); // should apss through F2
        cd_set.push(p);
        
        // N2 ray 
        var m = (Y2-0)/(X2-N2);
        console.log("m = " + m);
        p = paper.path( ["M", N2, 0, "L",  N2 + 20, 0 + m*20 ] ).attr(extend); // should apss through F2
        cd_set.push(p);

     }



     // Virtual Object : extension rays for virtual objects   
     if (X1 > P1) { // virtual 

        // virtual image - add extension ray 

        // F1 ray         
        var m = (Y1-0)/(X1-F1);
        p = paper.path( ["M", F1, 0, "L",  F1 - 20, 0 - m*20 ] ).attr(extend_object); // should pass through F1
        cd_set.push(p);

        // F2 ray 
        p = paper.path( ["M", P2, Y1, "L",  P2 - 20, Y1 ] ).attr(extend_object);      // should apss through F2
        cd_set.push(p);
        
        // N1 ray 
        var m = (Y1-0)/(X1-N1);
        console.log("m = " + m);
        p = paper.path( ["M", N1, 0, "L",  N1 - 20, 0 - m*20 ] ).attr(extend_object); // (X1, Y1) => (N1,0)
        cd_set.push(p);

     }





      // display the two focal rays 
      // 
      // F2: (Object => PF2 PF2 => Image )
      // F1: (Object => PF1 PF1 => Image )
      //




  }



  /* ---------------------------------------------------------------------------------------------------------------

    renderPointToPoint - render the finite object / image conjugates given a processed pointList

    TO DO:

    dataOption - ignore intermediate object/image points 
               - intermediate rays 
  
   --------------------------------------------------------------------------------------------------------------- */


  function drawPointToPoint(data, dataOptions) {

    ps.remove ();
    ps = paper.set();

    // show the object points for all points 
    for (var i = 0; i < data.length; i++ ) {

        var X1 = data[i].X1;
        var Y1 = data[i].Y1;
        if (isFinite(X1) & isFinite(Y1)) {
          console.log('X1 = ' + X1 + ' Y1 = '+ Y1);
          c = drawPoint(X1, Y1, "cyan");         
          ps.push(c); 
        }
   }

   var X2 = data[data.length-1].X2;
   var Y2 = data[data.length-1].Y2;
   if (isFinite(X2) & isFinite(Y2)) {
      console.log('X2 = ' + X2 + ' Y2 = '+ Y2);
      c = drawPoint(X2, Y2, "cyan");          
      ps.push(c); 
    }



  }


  /* ---------------------------------------------------------------------------------------------------------------

    renderOptics - render the lens list with cardinal points 

    TO DO:

    dataOption - ignore intermediate object/image points 
               - intermediate rays 
  
   --------------------------------------------------------------------------------------------------------------- */


  function drawOptics(data) {

    optics_set.remove();
    optics_set = paper.set();

    displayOptions = { height               : 15, 
                       showCardinalPoints   : true,
                       showFocalPoints      : true,
                       showNodalPoints      : true, 
                       showPrincipalPoints  : true, 
                       showVertices         : true };


    var cardinalPoints = [];

    console.log(data);

    // only render surface elements 
    for (var i=1; i< data.elem.length; i=i+2) {

      axialPosition   = data.elem[i].Z;
      cardinalPoints  = data.elem[i].cardinal; 
      equivalentPower = data.elem[i].F;


      // only thin lenses as of today 
      l = drawThinLens(axialPosition, 0, equivalentPower, displayOptions);
      optics_set.push(l);

    }

    // show the overall cardinal points not the individual ones 
    //systemPoints = data.total;
    //c = drawCardinalPoints (0, 0, systemPoints, displayOptions);
    //optics_set.push(c);

  }



  /* ---------------------------------------------------------------------------------------------------------------

    MOUSE-HANDLER FOR SETTING UP THE SYSTEM 

    Setup and show the system  
  
   --------------------------------------------------------------------------------------------------------------- */


  var paper;
  var viewBoxWidth;
  var viewBoxHeight;
  var canvasID = "#canvas_container";
  var viewBox;
  var startX, startY;
  var mousedown = false;
  var dX, dY;
  var gridLayer;


    //Pane
   dragStart = function (e) {

        console.log("Mouse down");

        if (paper.getElementByPoint(e.pageX, e.pageY) != null) {
            return;
        }
        mousedown = true;
        startX = e.pageX;
        startY = e.pageY;
    };

  dragMove = function (e) {
        
        if (mousedown == false) {
            return;
        }
        dX = startX - e.pageX;
        dY = startY - e.pageY;
        x = viewBoxWidth / paper.width;
        y = viewBoxHeight / paper.height;

        dX *= x;
        dY *= y;
        //alert(viewBoxWidth +" "+ paper.width );

        paper.setViewBox(viewBox.X + dX, viewBox.Y + dY, viewBoxWidth, viewBoxHeight);

       

        // bgRect.translate(dX, dY);

    };

  dragEnd = function (e) {
        if (mousedown == false) return;
        viewBox.X += dX;
        viewBox.Y += dY;
        mousedown = false;

    };


 /** This is high-level function.
     * It must react to delta being more/less than zero.
     */
    function handle(delta) {
        
        vBHo = viewBoxHeight;
        vBWo = viewBoxWidth;
        if (delta < 0) {
            viewBoxWidth *= 0.95;
            viewBoxHeight *= 0.95;
        } else {
            viewBoxWidth *= 1.05;
            viewBoxHeight *= 1.05;
        }
       
        viewBox.X -= (viewBoxWidth - vBWo) / 2;
        viewBox.Y -= (viewBoxHeight - vBHo) / 2;
        paper.setViewBox(viewBox.X, viewBox.Y, viewBoxWidth, viewBoxHeight);

        drawAxis(paper, true,0);

    }

    /** Event handler for mouse wheel event.
     */
    function wheel(event) {
        var delta = 0;
        if (!event) /* For IE. */
        event = window.event;
        if (event.wheelDelta) { /* IE/Opera. */
            delta = event.wheelDelta / 120;
        } else if (event.detail) { /** Mozilla case. */
            /** In Mozilla, sign of delta is different than in IE.
             * Also, delta is multiple of 3.
             */
            delta = -event.detail / 3;
        }
        /** If delta is nonzero, handle it.
         * Basically, delta is now positive if wheel was scrolled up,
         * and negative, if wheel was scrolled down.
         */
        if (delta) handle(delta);
        /** Prevent default actions caused by mouse wheel.
         * That might be ugly, but we handle scrolls somehow
         * anyway, so don't bother here..
         */
        if (event.preventDefault) event.preventDefault();
        event.returnValue = false;
    }




    /** Initialization code. 
     * If you use your own event management code, change it as required.
     */

    if (window.addEventListener) {


      /** DOMMouseScroll is for mozilla. */
      window.addEventListener('DOMMouseScroll', wheel, false);
      /** IE/Opera. */
      window.onmousewheel = document.onmousewheel = wheel;



    };  


/* --------------------------------------------------------------

OLDER STUFF 

------------------------------------------------------------------ */


function arc(center, radius, startAngle, endAngle) {
    angle = startAngle;
    coords = toCoords(center, radius, angle);
    path = "M " + coords[0] + " " + coords[1];
    while(angle<=endAngle) {
        coords = toCoords(center, radius, angle);
        path += " L " + coords[0] + " " + coords[1];
        angle += 1;
    }
    return path;
}

function toCoords(center, radius, angle) {
    var radians = (angle/180) * Math.PI;
    var x = center[0] + Math.cos(radians) * radius;
    var y = center[1] + Math.sin(radians) * radius;
    return [x, y];
}


