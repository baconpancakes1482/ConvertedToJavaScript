"use strict"
$(document).ready(function(){

    $("#angleShapeSlider").slider({});
    $("#camberShapeSlider").slider({});
    $("#thicknessShapeSlider").slider({});
    $("#spinShapeSlider").slider({});
    $("#radiusShapeSlider").slider({});
    $("#spanShapeSlider").slider({});
    $("#chordSizeSlider").slider({});
    $("#spanSizeSlider").slider({});
    $("#areaSizeSlider").slider({});
    $("#speedFlightSlider").slider({});
    $("#altitudeFlightSlider").slider({});

    var trace1 = {
      x: [0, 1, 2, 3, 4],
      y: [8, 10, 15, 13, 17],
      type: 'scatter',
      mode: 'lines',
      name: 'Upper',
      line: {
        color: 'purple',
        width: 1,
        shape: 'spline'
      }
    };

    var trace2 = {
      x: [0, 1, 2, 3, 4],
      y: [4, 16, 5, 2, 7],
      type: 'scatter',
      mode: 'lines',
      name: 'Lower',
      line: {
        color: 'yellow',
        width: 1,
        shape: 'spline'
      }
    };

    var trace3 = {
      x: [0, 1, 2, 3, 4],
      y: [10, 10, 10, 10, 10],
      type: 'scatter',
      mode: 'lines',
      name: 'placeholder3',
      line: {
        color: 'green',
        width: 1,
        shape: 'spline'
      }
    };

    var layout = {
      title: 'Free Stream',
      autosize: false,
      width: 350,
      height: 220,
      titlefont: {
        color: 'green',
        size: 10,
      },
      font: { color: 'white', size: 8},
      paper_bgcolor: 'black',
      plot_bgcolor: 'black',
      paper: {
        width: 400,
        height: 400,
        color: 'green'
      },
      xaxis: {
        title: 'placeholder',
        showgrid: false,
        titlefont: {
          color: 'blue',
          size: 10
        }
      },

      yaxis: {
        title: 'placeholder',
        titlefont: {
          color: 'yellow',
           size: 10
        },
        showgrid: false,
        showline: true,

      },

      legend: {
        x: 1,
        y: 1,
        font: {size: 8},
      }
    };

    var data = [trace1, trace2, trace3];

   Plotly.newPlot("graph", data, layout);

   var standardButtonStyleChange = function(event) {

    // The parent of the element is acquired here
    // var parent = $(this).parent();
      var parent = getParent( $(this) );

    // The parent will have all the backgrounds for the children set to white
    //  $(parent).children().css("background", "white");
      var children = getChildren(parent);
        $(children).css("background", "white");

    // The child element that triggered this event will have it's background changed to yellow
      $(this).css("background", "yellow");

    // Set the parent of the element to hold the element value
    //  $(parent).prop("value", this.value);
    //  var buttonValue = getButtonValue( $(this) );

    //  console.log(this);
    //  console.log(parent);

   };

   var evaluateClickedButton = function(event){
     console.log($(this));
     var value = getButtonValue( $(this) );
     var parent = getParent( $(this) );
    // var temp = $(".inputButtons");
      //if (parent == temp ){
      //  console.log("parent of flight");
      //}
     var children = getChildren(parent);
     $(children).css("background", "white");

     $(this).css("background", "yellow");
          console.log("My value is: " + value);
      if ( value == 101){
        console.log("reset triggers default settings");
      }
      if ( value == 102 ){
        console.log(" turn off the gauge");
      }
      if ( value == 0 ){
          console.log("flightbutton!");
          // $(".module3").css("visibility", "hidden"); doesnt work for some reason
          $(".module3").children().css("visibility", "hidden"); //works
          $(".flight-wrapper").css("visibility", "visible");
      }
      if ( value == 1 ){
          console.log("shapeButton");
          $(".module3").children().css("visibility", "hidden");
          $(".shape-wrapper").css("visibility", "visible");
      }
      if ( value == 2 ){
          console.log("sizeButton");
          $(".module3").children().css("visibility", "hidden");
          $(".size-wrapper").css("visibility", "visible");
      }
      if ( value == 3 ){
          console.log("analysisButton");
          $(".module3").children().css("visibility", "hidden");
          $(".analysis-wrapper").css("visibility", "visible");
      }
      if ( value == 4 ){
          console.log("selectPlotButton");
          $(".module3").children().css("visibility", "hidden");
          $(".selectPlot-wrapper").css("visibility", "visible");
      }
      if ( value == 5 ){
          console.log("probeButton");
          // $(".module4").css("visibility", "hidden"); doesnt work for some reason
          $(".module4").children().css("visibility", "hidden"); //works
          $(".probe-wrapper").css("visibility", "visible");
      }
      if ( value == 6 ){
          console.log("gagesButton");
          $(".module4").children().css("visibility", "hidden");
          $(".gages-wrapper").css("visibility", "visible");
      }
      if ( value == 7 ){
          console.log("geometryButton");
          $(".module4").children().css("visibility", "hidden");
          $(".geometryAndData-wrapper").css("visibility", "visible");
      }
      if ( value == 8 ){
          console.log("dataButton");
          $(".module4").children().css("visibility", "hidden");
          $(".geometryAndData-wrapper").css("visibility", "visible");
      }
      if ( value == 9 ){
          console.log("plotButton");
          $(".module4").children().css("visibility", "hidden");
          $(".graph-wrapper").css("visibility", "visible");
      }

   };

   $("button").button();
   // Why children()? To access the children of the parent class
   // Why unbind("click").bind("click")? So that DOM doesn't excute the button
   // twice *bug with buttons*
   $(".inputButtons").children().unbind("click").bind("click", evaluateClickedButton);
   $(".outputButtons").children().unbind("click").bind("click", evaluateClickedButton);
   $(".buttons4Shape").children().unbind("click").bind("click", evaluateClickedButton);
   $(".surfaceButtons").children().unbind("click").bind("click", evaluateClickedButton);
   $(".topRowButtons").children().unbind("click").bind("click", evaluateClickedButton);
   $(".bottomRowButtons").children().unbind("click").bind("click", evaluateClickedButton);
   $(".resetButton").children().unbind("click").bind("click", evaluateClickedButton);
   $(".conditionalAnalysisButtons").children().unbind("click").bind("click", evaluateClickedButton);
   $(".geometrySettingAnalysisButtons").children().unbind("click").bind("click", evaluateClickedButton);
   $(".buttons4").children().unbind("click").bind("click", evaluateClickedButton);

  // $(".inputButtons").children().unbind("click").bind("click", standardButtonStyleChange);
  // $(".outputButtons").children().unbind("click").bind("click", standardButtonStyleChange);
   //$(".buttons4Shape").children().unbind("click").bind("click", standardButtonStyleChange);
   //$(".surfaceButtons").children().unbind("click").bind("click", standardButtonStyleChange);
   //$(".topRowButtons").children().unbind("click").bind("click", standardButtonStyleChange);
   //$(".bottomRowButtons").children().unbind("click").bind("click", standardButtonStyleChange);
  // $("#flightButton").unbind("click").bind("click", standardButtonStyleChange);
   /*$("#shapeButton").unbind("click").bind("click", clicked);
   $("#sizeButton").unbind("click").bind("click", clicked);
   $("#analysisButton").unbind("click").bind("click", clicked);
   $("#selectPlotButton").unbind("click").bind("click", clicked);

   $("#probeButton").unbind("click").bind("click", clicked);
   $("#gagesButton").off("click").on("click", clicked);
   $("#geometryButton").off("click").on("click", clicked);
   $("#dataButton").off("click").on("click", clicked);
   $("#plotButton").off("click").on("click", clicked);

   $("#plotPressureButton").unbind("click").bind("click", clicked);
   $("#plotVelocityButton").unbind("click").bind("click", clicked);
   $("#plotDragPolarButton").unbind("click").bind("click", clicked);

   $("#plotAngleButton").unbind("click").bind("click", clicked);
   $("#plotCamberButton").unbind("click").bind("click", clicked);
   $("#plotThicknessButton").unbind("click").bind("click", clicked);

   $("#plotSpeedButton").unbind("click").bind("click", clicked);
   $("#plotAltitudeButton").unbind("click").bind("click", clicked);
   $("#plotWingAreaButton").unbind("click").bind("click", clicked);
   $("#plotDensityButton").unbind("click").bind("click", clicked);
*/
//  $("button").unbind("click").bind("click", clicked);


});

function isEquivalent(a,b){
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  if (aProps.length != bProps.length){
    return false;
  }

  for (var i = 0; i < aProps.length; i++){
    var propName = aProps[i];

    if (a[propName] !== b[propName]){
      return false;
    }
  }
  return true;
}

function getButtonValue( child ){
  // allows to acquire the value of the button for logical operations
    var temp = child.val();
      console.log(temp);
    return parseFloat(temp);
};

function getParent( child ){
    var parent = child.parent();

    return parent;
};

function getChildren( parent ){
  var children = parent.children();

  return children;
}

function userUnitList(){
  var temp = document.getElementById("unitList").value;

  return parseFloat(temp);
};

function userFlightButton(){
  var temp = document.getElementById("flightButton").value;

  return parseFloat(temp);
}

function userProbeButton(){
  var temp = document.getElementById("probeButton").value;

  return parseFloat(temp);
}
