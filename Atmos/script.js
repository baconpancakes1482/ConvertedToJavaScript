"use strict";
//=======================================================================================
//
//                                AtmosModeler Simulator
//
//                Interactive Program to solve Standard Atmosphere Equations
//                      using an altitude, gamma, velocity, or mach
//                        value to obtain dynamic pressure effects
//
//                          Original Java Applet Written By:
//
//                                    Tom Benson
//                              NASA Glenn Research Center
//
//                          Converted to JavaScript App By:
//
//                                  Austin E. Alava
//                      NASA Glenn Research Center Intern Spring 2017
//                            University of Central Florida
//
//
//                                      NOTICE
//  ~>  This software is in the Public Domain.  It may be freely copied and used in
//  ~>  non-commercial products, assuming proper credit to the author is given.  IT
//  ~>  MAY NOT BE RESOLD.  If you want to use the software for commercial
//  ~>  products, contact the author.
//  ~>  No copyright is claimed in the United States under Title 17, U. S. Code.
//  ~>  This software is provided "as is" without any warranty of any kind, either
//  ~>  express, implied, or statutory, including, but not limited to, any warranty
//  ~>  that the software will conform to specifications, any implied warranties of
//  ~>  merchantability, fitness for a particular purpose, and freedom from
//  ~>  infringement, and any warranty that the documentation will conform to the
//  ~>  program, or any warranty that the software will be error free.
//  ~>  In no event shall NASA be liable for any damages, including, but not
//  ~>  limited to direct, indirect, special or consequential damages, arising out
//  ~>  of, resulting from, or in any way connected with this software, whether or
//  ~>  not based on warranty, contract, tort or otherwise, whether or not injury
//  ~>  was sustained by persons or property or otherwise, and whether or not loss
//  ~>  was sustained from, or arose out of the results of, or use of, the software
//  ~>  or services provided hereunder.
//
//=======================================================================================

//=======================================================================================
// jQuery
//=======================================================================================

//=======================================================================================
$(document).ready(function(){

    //  Making a selection from the drop down list will get a pointer for the cursor
      $("selector").css( "cursor", "pointer");

    //  Default value Initializing
      $("#userVelocity").attr("value", 0);
      $("#userMach").attr("value", 0.0);
      $("#userAltitude").attr("value", 0);
      $("#userGamma").attr("value", 1.4);

    //  Set errorString to visible
      $("#errorString").css("visibility", "visible");
//=======================================================================================
var styleChange = function ( event ){
    //  Changes color of background for velocity or mach input fields
      $("#userVelocity").css({ background: "white", color: "black" });
      $("#userMach").css({ background: "black", color: "yellow" });
};
//=======================================================================================

//=======================================================================================
var computation = function ( event ){
  //  computation event-trigger
    tryCompute();

};
//=======================================================================================

//=======================================================================================
var planetChanged = function ( event ){
  //  The gamma input field value updates to its default-planet-value
  if ( $("#planet").val() == 0 ){

    $("#userGamma").attr("value", earth.gamma);

  } else {

    $("#userGamma").attr("value", mars.gamma);

  }
  // Computation update
  computation();

};
//=======================================================================================

//=======================================================================================
var updateDiv = function ( event ){
  //  If the user makes any selection, the div elements on the page will update
  changeDiv();

};
//=======================================================================================

//=======================================================================================
var inputField = function ( event ) {
  //  Event that triggers when a radio-button selection is made for velocity or mach
    machOrVelocityInput();

};
//=======================================================================================

//=======================================================================================
  $("#slider").slider({
    //  Altitude Slider
        orientation: "vertical",
        min: 0,
        max: 500,
        step: 1,
        value: 0,

        start: function(event, ui){

        },

        slide: function(event, ui){

          //  As the slider slides, the altitude field will update
            $("#slider").slider("option", "value");

          //  This is how the altitude field will change with the slider
            document.getElementById("userAltitude").value = ui.value;

          // Perform computation
            computation();

          // Update the div elements
            updateDiv();

        },

        change: function(event, ui){

            if ( event.originalEvent ){

              //  Changes the altitude attribute to the changed ui.value
                $("#slider").attr("value", ui.value);

              //  Perform computation
                computation();

            } else {

            }

        },

        stop: function( event, ui ){

          }

        });
//=======================================================================================

//=======================================================================================
  $("#slider2").slider({
      //  Velocity Slider
        orientation: "vertical",
        min: 0,
        max: 500,
        step: 1,
        value: 0,

        start: function(event, ui){

        },

        slide: function(event, ui){

          //  As the slider slides, the velocity field will update
            $("#slider2").slider("option", "value");

          //  This is how the velocity field will change with the slider
            document.getElementById("userVelocity").value = ui.value;

          // Perform computation
            computation();

          // Update the div elements
            updateDiv();
        },

        change: function(event, ui){

            if ( event.originalEvent ){

              //  Changes the velocity attribute to the changed ui.value
                $("#slider2").attr("value", ui.value);

              //  Perform computation
                computation();

            } else {

            }

        },

        stop: function( event, ui ){

          }

        });
//=======================================================================================

//=======================================================================================
var updateSlider = function ( event ) {
  //  When an altitude is entered, the slider will adjust to the corresponding value
    $("#slider").slider("value", $(this).val() );

};
//=======================================================================================


//=======================================================================================
var updateSlider2 = function ( event ) {
  //  When a velocity is entered, the slider will adjust to the corresponding value
    $("#slider2").slider("value", $(this).val() );

};
//=======================================================================================

//=======================================================================================
$("select").on("change", function ( event ){
  //  Selecting units/planets/output types 1-2 will update the units displayed on the page
    updateDiv();
    $("input").on("change", computation );

});
//=======================================================================================

//=======================================================================================
  //  The altitude input field will update with altitude slider
    var alt = $("#slider").slider("option", "value");
    document.getElementById("userAltitude").value = alt;
//=======================================================================================

//=======================================================================================
  //  The velocity input field will update with velocity slider
    var vel = $("#slider2").slider("option", "value");
    document.getElementById("userVelocity").value = vel;
//=======================================================================================

//=======================================================================================
$("input").on("input", function( event ){
    //  Reads the input field live and determines if the values in the input field are valid
    //  Proceeds to computation if successful
      computation();
     $("select").on("change", computation );

});
//=======================================================================================

//=======================================================================================
  // On intial program run, these functions will execute
    computation();
    planetChanged();
    updateDiv();
    styleChange();
//=======================================================================================

//=======================================================================================
    //  When the user selects a planet, the planet will update
      $("#planet").on("change", planetChanged );
    //  When the user selects a unit, the units will update
      $("#unit").on("change", computation );
    //  When the user enters an altitude, the altitude slider will update
      $("#userAltitude").change( updateSlider );
    //  When the user enters a velocity, the velocity slider will update
      $("#userVelocity").change( updateSlider2 );
    //  When the user changes an output selection, a computation will occur
      $("#output1").on("change", computation );
    //  When the user selects velocity or mach, this will disable the correct input field
      $("#radioOptions input").on("change", inputField );
//=======================================================================================

});
//=======================================================================================

//=======================================================================================
function tryCompute(){
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  +Description:
  //            ~>  The tryCompute function takes no parameters and runs the check sequence
  //            ~>  which will run computation if all input is valid. the variable radioKey
  //            ~>  lets the checkUserInput know what it is looking at
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    var radioKey = machOrVelocity();

  ( checkUserInput( radioKey ) ) ? compute() : err();
};
//=======================================================================================

//=======================================================================================
//   +Description:
//          ~>  Earth - Standard day
//=======================================================================================

//=======================================================================================
var earth = {

  rgas: 1718,     // feet^2 / seconds^2
  gamma: 1.40

};
//=======================================================================================

//=======================================================================================
//  +Description:
//        ~>   Mars - Curve fit of orbiter data
//=======================================================================================

//=======================================================================================
var mars = {

  rgas: 1149.0,   // feet^2 / seconds^2
  gamma: 1.29

};
//=======================================================================================

//=======================================================================================
function planetRgas( ){

      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  +Description:
    //            ~>  The planetRgas function takes no parameters and returns the specific
    //            ~>  gas constant ratio for Earth or Mars
      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   var planet = userPlanet();

   if ( planet == 0 ){

     var rgas = earth.rgas;

   } else {

     var rgas = mars.rgas;

   }

   return rgas;

};
//=======================================================================================

//=======================================================================================
function changeDiv(){

      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  +Description:
    //            ~>  The changeDiv function takes no parameters and updates the div elements
    //            ~>  dealing with selections made such as units, and values.
      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      var planet = userPlanet();
      var unitNum = userUnit();
      var unitString = "";
      var outputType1 = userOutput1();
      var outputType2 = userOutput2();

        divAltitude( unitNum, unitString );
          divVelocity( unitNum, unitString );
            divSlider( unitNum );
              divPlanet( planet );
            divSelectOutput1( unitNum, unitString, outputType1 );
        divSelectOutput2( planet, unitNum, unitString, outputType2 );

};
//=======================================================================================

//=======================================================================================
function machOrVelocityInput (){

      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //  +Description:
    //            ~>  The machOrVelocityInput function takes no parameters and handles disabling
    //            ~>  the ability to enter in a value for either velocity or mach. This is linked
    //            ~>  to the radio-button selection that the user makes. This function also styles
    //            ~>  the input field of velocity and mach when it is enabled/disabled.
      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    var radioSelection = userRadio();

        if ( radioSelection == 0){

         $("input#userVelocity").prop("disabled", false);
         $("input#userMach").prop("disabled", true);

           $("#userVelocity").css({
              background: "white",
              color: "black"
            });

           $("#userMach").css({
             background: "black",
             color: "yellow"
            });

        } else {

          $("input#userMach").prop("disabled", false);
          $("input#userVelocity").prop("disabled", true);

            $("#userVelocity").css({
              background: "black",
              color: "yellow"
            });

            $("#userMach").css({
              background: "white",
              color: "black"
            });

        }

};
//=======================================================================================

//=======================================================================================
function machOrVelocity (){

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  +Description:
  //            ~>  The machOrVelocity function takes no parameters and determines if the
  //            ~>  user has selected the radio-button for velocity or mach. Then the function
  //            ~>  will return a boolean.
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    var radioSelection =  userRadio();
    var radioKey = true;

        if ( radioSelection == 0){

           return radioKey;

        } else {

        radioKey = false;

        return radioKey;

      }

};
//=======================================================================================

//=======================================================================================
function checkUserInput ( radioKey ){

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  +Description:
  //            ~>  The checkUserInput function takes 1 parameter and determines whether the
  //            ~>  values entered in the input fields are valid by utilizing the filterFloat
  //            ~>  function and a conditional statement that will return boolean. The radioKey
  //            ~>  is used to evaluate either a velocity or mach value based on radio-selection
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  var altitude = userAltitude();
  var gamma = userGamma();

  if ( radioKey ){

    var velOrMach = userVelocity();

  } else {

    var velOrMach = userMach();

  }

    return ( (!isNaN(filterFloat( altitude ))) && (!isNaN(filterFloat( gamma ))) && (!isNaN(filterFloat( velOrMach ))) )  ? true : false;

};
//=======================================================================================

//=======================================================================================
function filterFloat ( value ){
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  +Description:
  //            ~>  The filterFloat function takes 1 parameter and strictly parses the value
  //            ~>  in question to determine whether it is a number.
  //            ~>  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    return (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value) ) ? Number(value) : NaN;

};
//=======================================================================================

//=======================================================================================
function err (){
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  +Description:
  //            ~>  The err function takes no parameters and displays an error prompt to the
  //            ~>  user when the input is not valid
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  $("#errorString").css("visibility", "visible");
  var temp = "Invalid Input! Please try entering numbers in all the input fields.";
  document.getElementById("errorString").innerHTML = temp;

};
//=======================================================================================

//=======================================================================================
function compute(){
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 //  +Description:
 //        ~>  The compute function handles the bulk of the processing involved to acquire
 //        ~>  the variables of interest
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  //  After successful entries, the errorString is set to hidden
    $("#errorString").css("visibility", "hidden");

  //  Initializing Variables
    var altitude = userAltitude();
    var gamma = userGamma();
    var radioKey = userRadio();
    var unitNum = userUnit();
    var planet = userPlanet();
    var outputValue = userOutput1();

   //  Checking Ranges for altitude and gamma
      altitude = checkAltitudeRange( unitNum, altitude );
      gamma = checkGammaRange( gamma );

    //  Initializing more variables
      var staticTemperature = getStaticTemperature( altitude, planet, unitNum );             // Rankine
      var staticPressure = getStaticPressure( altitude, planet, staticTemperature, unitNum );// pounds per square inch
      var speedOfSound = getSpeedOfSound ( gamma, staticTemperature, unitNum );              // ft/s
      var dynamicDensity = getDynamicDensity( staticTemperature, staticPressure, unitNum );  // slug/ft^3
      var staticDensity = getStaticDensity( unitNum );                                       // slug/ft^3
      var forceRatio = getForceRatio( dynamicDensity, staticDensity );

      if ( radioKey == 0 ){

        //  If the radio-button is set to "Velocity"
          //  Initialize velocity
            var velocity = userVelocity();
            //  Get velocity back in float and in proper range
              velocity = parseFloat( checkVelocityRange( unitNum, velocity ) );
              //  Set velocity to whole number
                velocity = velocity.toFixed(0);
                //  Update velocity field with result
                  $("#userVelocity").attr("value", velocity );
                //  Initialize Mach
              var mach = parseFloat( getMach( speedOfSound, velocity ) );
            //  Set Mach to a decimal number
          mach = mach.toFixed(1);
        //  Update mach field with result
      $("#userMach").attr("value", mach );

      } else {

        //  If the radio-button is set to "Mach"
          //  Initialize mach
            var mach = userMach();
              //  Get mach back in float and in proper range
                mach = parseFloat( checkMachRange( mach ) );
                  //  Set mach to decimal number
                    mach = mach.toFixed(1);
                      //  Update mach field with result
                        $("#userMach").attr("value", mach );
                      //  Initialize velocity
                    var velocity = parseFloat( getVelocity ( speedOfSound, mach ) );
                  //  Set velocity to whole number
                velocity = velocity.toFixed(0);
              //  Update velocity field with result
            $("#userVelocity").attr("value", velocity );

      }

    //  Initialize more variables
      var dynamicPressure = getDynamicPressure( gamma, staticPressure, mach );  // pounds per square foot
      var factor = getFactorForTotalVariables( gamma, mach );                   //
      var totalTemperature = getTotalTemperature( staticTemperature, factor );  // rankine
      var totalPressure = getTotalPressure( gamma, staticPressure, factor );    // pounds per square foot

      if ( unitNum == 0 ){
            //  Set some variables to appropriate units (Imperial)
          staticTemperature = rankineToFahrenheit( staticTemperature );         // rankine ==> fahrenheit
            staticPressure  = fromIbPerSqFootToIbPerSqInch( staticPressure );   // Ib/ft^2 == > Ib/in^2
          totalTemperature = rankineToFahrenheit( totalTemperature );           // rankine ==> fahrenheit

      } else {
            //  Set some variables to appropriate units (Metric)
          staticTemperature = rankineToCelsius( staticTemperature );            // rankine == > celsius
            staticPressure = fromIbPerSqFootToKiloPascal( staticPressure );     // Ib/ft^2 == > kPa
            dynamicPressure = fromIbPerSqFootToKiloPascal( dynamicPressure );   // Ib/ft^2 == > kPa
            totalTemperature = rankineToCelsius( totalTemperature );            // rankine ==> celsius
          totalPressure = fromIbPerSqFootToKiloPascal( totalPressure );         // Ib/ft^2 == > kPa
      }

    //  Format variables
      staticTemperature = staticTemperature.toFixed(0);
      staticPressure = staticPressure.toFixed(3);
      dynamicDensity = dynamicDensity.toExponential(5);
      speedOfSound = speedOfSound.toFixed(0);
      dynamicPressure = dynamicPressure.toFixed(0);
      forceRatio = forceRatio.toFixed(0);
      totalPressure = totalPressure.toFixed(0);
      totalTemperature = totalTemperature.toFixed(0);

    //  Update input fields with results
      $("#userAltitude").val( altitude );
      $("#userGamma").val( gamma );
      $("#userVelocity").val( velocity );
      $("#userMach").val( mach );

  //  Route out of computation sequence and send variables to other functions
    var variableValString = " ";
    divAdjustTherometer( staticTemperature );
    divAdjustPressureGauge( planet, unitNum, staticPressure );
    divDataVariables( outputValue, variableValString, staticTemperature, staticPressure, dynamicDensity,
         speedOfSound, dynamicPressure, forceRatio, totalPressure, totalTemperature );


};
//=======================================================================================

//=======================================================================================
//
//  +Description:
//         ~>  Functions that will get the variables through computation and then
//         ~>  return them for further use
//
//  +Contains:
//       ->   getStaticTemperature()
//       ->   getStaticPressure()
//       ->   getSpeedOfSound()
//       ->   getDynamicDensity()
//       ->   getStaticDensity()
//       ->   getForceRatio()
//       ->   getVelocity()
//       ->   getMach()
//       ->   getDynamicPressure()
//       ->   getFactorForTotalVariables()
//       ->   getTotalTemperature()
//       ->   getTotalPressure()
//
//=======================================================================================

//=======================================================================================
function getStaticTemperature ( altitude, planet, unitNum ){

  if ( unitNum == 1 ){

    altitude = toFeet ( altitude );

  }   //  altitude is now in feet even if we were in meters
    if ( planet == 0 ){
          // Earth Standard Day
      if ( altitude <= 36152 ){                                   // Troposphere
        var staticTemperature = 518.6 - 3.56 * altitude / 1000.0;
      } else if ( altitude >= 36152.0 && altitude <= 82345.0 ){   // Stratosphere
        var staticTemperature = 389.98;
      } else if ( altitude >= 82345.0 ){
        var staticTemperature = 389.98 + 1.645 * ( altitude - 82345 ) / 1000.0 ;
      }
    } else {
          // Mars - curve fit of orbiter data
      if ( altitude <= 22960 ){
        var staticTemperature = 434.02 - 0.548 * ( altitude / 1000.0 );
      } else if ( altitude > 22960 ){
        var staticTemperature = 449.36 - 1.217 * ( altitude / 1000.0 );
      }

    }
    //  returns static temperature in rankine
    return staticTemperature;
};
//=======================================================================================

//=======================================================================================
function getStaticPressure ( altitude, planet, staticTemperature, unitNum ){

  if ( unitNum == 1 ){

          altitude = toFeet ( altitude );

      }   //  altitude is now in feet even if we were in meters

    if ( planet == 0 ){
           // Earth Standard Day
      if ( altitude <= 36152 ){                                   // Troposphere
        var staticPressure = 2116.217 * Math.pow( staticTemperature / 518.6, 5.256 );
      } else if ( altitude >= 36152.0 && altitude <= 82345.0 ){   // Stratosphere
        var staticPressure = 2116.217 * 0.2236 * Math.exp( ( 36000.0 - altitude ) / ( 53.35 * 389.98 ) );
      } else if ( altitude >= 82345.0 ){
        var staticPressure = 2116.217 * 0.02456 * Math.pow( staticTemperature / 389.98, -11.388 );
      }
    } else {
          // Mars - curve fit of orbiter data
      if ( altitude <= 22960 ){
        var staticPressure = 14.62 * Math.pow( 2.71828, -0.00003 * altitude ) ;
      } else if ( altitude > 22960){
         var staticPressure = 14.62 * Math.pow( 2.71828, -0.00003 * altitude ) ;
      }

    }
    //  static pressure is in psi!
    return staticPressure;
};
//=======================================================================================

//=======================================================================================
function getSpeedOfSound ( gamma, staticTemperature, unitNum ){

    var rgas = planetRgas();
    var speedOfSound = Math.sqrt( gamma * rgas * staticTemperature );

    if ( unitNum == 0 ){
      speedOfSound = fromftPerSecToMPH ( speedOfSound );
    } else {
      speedOfSound = fromftPerSecToKmHr ( speedOfSound );
    }
    //  speedOfSound is either in mph or km/hr
    return speedOfSound;

};
//=======================================================================================

//=======================================================================================
function getDynamicDensity ( staticTemperature, staticPressure, unitNum ){

  var rgas = planetRgas();

  var dynamicDensity = ( staticPressure ) / ( rgas * staticTemperature );

  if ( unitNum == 1 ){

    dynamicDensity = slugCubicFeetToKilogramCubicMeter ( dynamicDensity );

  }
    // dynamicDensity is either in slug / ft^3 or kg / m^3
     return  dynamicDensity;

};
//=======================================================================================

//=======================================================================================
function getStaticDensity ( unitNum ){
    /* Sea Level Static */
  if ( unitNum == 0 ){
      var staticDensity = 0.00237;  // slug / ft^3
  } else {
      var staticDensity = 1.229;    // kg / m^3
  }
      return staticDensity;

};
//=======================================================================================

//=======================================================================================
function getForceRatio ( dynamicDensity, staticDensity ){
  return ( 100.0 * ( dynamicDensity / staticDensity ) );
};
//=======================================================================================

//=======================================================================================
function getVelocity ( speedOfSound, mach ){
   return ( mach * speedOfSound );
};
//=======================================================================================

//=======================================================================================
function getMach ( speedOfSound, velocity ){
  return ( velocity / speedOfSound );
};
//=======================================================================================

//=======================================================================================
function getDynamicPressure ( gamma, staticPressure, mach ){
  //  dynamic pressure = (1/2)(gam)(staticPressure)(mac^2)
  return ( 0.5 * gamma * staticPressure * Math.pow( mach, 2) );
};
//=======================================================================================

//=======================================================================================
function getFactorForTotalVariables ( gamma, mach ){
  // Part of the equation to solve for total temperature and total pressure.
    // factor = [ 1 + ( 1/2 )( gam - 1 )( mac^2 ) ]
  return ( parseFloat( 1.0 ) + parseFloat( 0.5 * ( gamma - 1.0 ) *  Math.pow( mach, 2 ) ) );
};
//=======================================================================================

//=======================================================================================
function getTotalTemperature ( staticTemperature, factor ){
  //  total temperature = ( staticTemperature )( factor )
    //  total temperature = ( staticTemperature )( [ 1 + ( 1/2 )( gam -1 )( mac^2 ) ] )
  return ( staticTemperature * factor );
};
//=======================================================================================

//=======================================================================================
function getTotalPressure ( gamma, staticPressure, factor ){
 //  total pressure = ( staticPressure )( factor^( ( gam ) / ( gam - 1 ) ) )
 // total pressure = ( staticPressure )( [ 1 + ( 1/2 )( gam -1 )( mac^2 ) ]^( ( gam ) / ( gam - 1 ) ) )
  return ( staticPressure * Math.pow( factor, ( gamma / ( gamma - 1.0 ) ) ) );
};
//=======================================================================================

//=======================================================================================
//
//  +Description:
//         ~>  Functions that obtain the values from selections or input fields
//         ~>  and return them to help logical operations.
//
//  +Contains:
//       ->   userPlanet()
//       ->   userUnit()
//       ->   userOutput1()
//       ->   userOutput2()
//       ->   userAltitude()
//       ->   userGamma()
//       ->   userVelocity()
//       ->   userMach()
//       ->   userRadio()
//
//=======================================================================================

//=======================================================================================
function userPlanet (){

  var temp = document.getElementById("planet").value;

  return temp;

};
//=======================================================================================

//=======================================================================================
function userUnit (){

  var temp = document.getElementById("unit").value;

  return temp;

};
//=======================================================================================

//=======================================================================================
function userOutput1 (){

  var temp = document.getElementById("output1").value;

  return temp;

};
//=======================================================================================

//=======================================================================================
function userOutput2 (){

  var temp = document.getElementById("output2").value;

  return temp;

};
//=======================================================================================

//=======================================================================================
function userAltitude (){

  var temp = document.getElementById("userAltitude").value;

  return temp;

};
//=======================================================================================

//=======================================================================================
function userGamma (){

  var temp = document.getElementById("userGamma").value;

  return temp;

};
//=======================================================================================

//=======================================================================================
function userVelocity (){

  var temp = document.getElementById("userVelocity").value;

  return temp;

};
//=======================================================================================

//=======================================================================================
function userMach (){

  var temp = document.getElementById("userMach").value;

  return temp;

};
//=======================================================================================

//=======================================================================================
function userRadio (){

    var temp =  $("input[name='radio-1']:checked", "#radioOptions").val();

    return temp;

};
//=======================================================================================

//=======================================================================================
//
//  +Description:
//         ~>  Functions that will take the input values and set them to the maximum or
//         ~>  minimum range values if they are out of bounds
//
//  +Contains:
//       ->   checkAltitudeRange()
//       ->   checkGammaRange()
//       ->   checkVelocityRange()
//       ->   checkMachRange()
//
//=======================================================================================

//=======================================================================================
function checkAltitudeRange ( unitNum, altitude ){

    if ( altitude < 0 ){

      altitude = 0;

    }

  if ( unitNum == 0){
     // Imperial Units (feet)

      if ( altitude > 100000 ){

        altitude = 100000;

      }

     } else {
      // Metric Units (meters)

      if ( altitude > 30480 ){

        altitude = 30480;

      }

    }

    return altitude;

};
//=======================================================================================

//=======================================================================================
function checkGammaRange ( gamma ){

    if ( gamma < 1.0 ){

          gamma = 1.0;

    }
      if ( gamma > 1.5 ){

        gamma = 1.5;

    }

    return gamma;

};
//=======================================================================================

//=======================================================================================
function checkVelocityRange ( unitNum, velocity ){


    if ( velocity < 0){

      velocity = 0;

    }

    if ( unitNum == 0 ){

        // Imperial Units ( mph )
      if ( velocity > 5000 ){

        velocity = 5000;

      }

    } else {

        // Metric Units ( km / hr )
      if ( velocity > 8046 ){

        velocity = 8046;

      }

    }

    return velocity;

};
//=======================================================================================

//=======================================================================================
function checkMachRange ( mach ){

    if ( mach < 0 ){
      mach = 0;
    }
    if ( mach > 7){
      mach = 7;
    }
      return mach;

};
//=======================================================================================

//=======================================================================================
//
//  +Description:
//         ~>  *See each function for description*
//
//  +Contains:
//       ->   divDataVariables()
//       ->   divAdjustTherometer()
//       ->   divAdjustPressureGauge()
//       ->   divSelectOutput1Var()
//
//=======================================================================================

//=======================================================================================
function divDataVariables( outputValue, variableValString, staticTemperature, staticPressure,
 dynamicDensity, speedOfSound, dynamicPressure, forceRatio, totalPressure, totalTemperature ){

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   //  +Description:
   //        ~>  The divDataVariables function handles displaying the variables for the selection
   //        ~>  made including those for the data table
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      divSelectOutput1Var( outputValue, variableValString, staticTemperature, staticPressure,
      dynamicDensity, speedOfSound, dynamicPressure, forceRatio, totalPressure, totalTemperature );
      divStaticTemperatureVar( variableValString, staticTemperature );
      divStaticPressureVar( variableValString, staticPressure );
      divDynamicDensityVar( variableValString, dynamicDensity );
      divSpeedOfSoundVar( variableValString, speedOfSound );
      divDynamicPressureVar( variableValString, dynamicPressure );
      divForceRatioVar( variableValString, forceRatio );
      divTotalPressureVar( variableValString, totalPressure );
      divTotalTemperatureVar( variableValString, totalTemperature );

};
//=======================================================================================

//=======================================================================================
function divAdjustTherometer( staticTemperature ){

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  +Description:
  //        ~>  The divAdjustTherometer function handles the positioning of the ".fluid"
  //        ~>  for the therometer. The interval is 50 degrees and is spaced 16.25% from each
  //        ~>  interval mark. If we wanted to have the fluid go to 0 degrees, we need to find
  //        ~>  the midway % which turns out to be 52.5% for height and 47.5% for top. Then we
  //        ~>  develop some equations knowing the interval and its spacing :)
  //        ~>  So if staticTemperature = 0; ==> ( 16.25 / 50 ) * 0 + x; x needs to equal 52.5
  //        ~>  so that we make it a string with "%" to use for css styling; For the top, its
  //        ~>  almost exactly the same but instead of addition, its subtraction.
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  var height = ( 16.25 / 50 ) * staticTemperature + 52.5;
  var top = 47.5 - ( staticTemperature * ( 16.25 / 50 ) );
  // @ 0 degrees, the height is 52.5% and the top is 47.5%
  //  Each interval of 50 degrees is 16.25% from 100 to -100 degrees
    height += "%";
    top += "%";
    $(".fluid").css({ height: height , top: top });

};
//=======================================================================================

//=======================================================================================
function divAdjustPressureGauge( planet, unitNum, staticPressure ){

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  +Description:
  //        ~>  The divAdjustPressureGauge function handles the positioning of the "pressureLine"
  //        ~>  for the pressure gauge. Based on the specific planet and unit, a custom pressure
  //        ~>  gauge is displayed with a unique interval. In order to get it working, I "calibrated"
  //        ~>  the "pressureLine" to align with values displayed in the pressure gauge ui. The
  //        ~>  variable named "bottom" is defined for each of the 4 scenarios and is added to
  //        ~>  a string to be set as a css attribute, "bottom".
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  if ( planet == 0 && unitNum == 0 ){
    var bottom = ( ( 19 / 5 ) * staticPressure ) + parseFloat(10);
  }
  if ( planet == 0 && unitNum == 1 ){
    var bottom = ( ( 19 / 25 ) * staticPressure ) + parseFloat(10);
  }
  if ( planet == 1 && unitNum == 0 ){
    var bottom = ( ( 19 / 0.02 ) * staticPressure ) - 7;
      if ( staticPressure <= 0.012 ){
        var bottom = 2;
      }
  }
  if ( planet == 1 && unitNum == 1 ){
    var bottom = ( ( 19 / 0.14 ) * staticPressure ) - 9;
      if ( staticPressure <= 0.07 ){
        var bottom = 2;
      }
  }
      bottom += "%";
    $("#pressureLine").css({ bottom: bottom });

};
//=======================================================================================

//=======================================================================================
function divSelectOutput1Var( outputValue, variableValString, staticTemperature, staticPressure,
  dynamicDensity, speedOfSound, dynamicPressure, forceRatio, totalPressure, totalTemperature ){

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  +Description:
  //        ~>  The divSelectOutput1Var function outputs the selected variable by evaluating
  //        ~>  what the value is for "selectedOutput"
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    var temp = document.getElementById("selectedOutput");

    if ( outputValue == 0 ){
        variableValString += staticTemperature;
    } else if ( outputValue == 1 ){
        variableValString += staticPressure;
    } else if ( outputValue == 2 ){
        variableValString += dynamicDensity;
    } else if ( outputValue == 3 ){
        variableValString += speedOfSound;
    } else if ( outputValue == 4 ){
        variableValString += dynamicPressure;
    } else if ( outputValue == 5 ){
        variableValString += forceRatio;
    } else if ( outputValue == 6 ){
        variableValString += totalPressure;
    } else if ( outputValue == 7 ){
        variableValString += totalTemperature;
    }

    temp.innerHTML = variableValString;

};
//=======================================================================================

//=======================================================================================
//
//  +Description:
//         ~>  Functions that will display the variables values for display
//         ~>  by acquiring the element_id through html and setting it to a string.
//         ~>  This string is then outputted.
//
//  +Parameters: 2
//
//  +Contains:
//       ->   divStaticTemperatureVar()
//       ->   divStaticPressureVar()
//       ->   divDynamicDensityVar()
//       ->   divSpeedOfSoundVar()
//       ->   divDynamicPressureVar()
//       ->   divForceRatioVar()
//       ->   divTotalPressureVar()
//       ->   divTotalTemperatureVar()
//
//=======================================================================================

//=======================================================================================
function divStaticTemperatureVar( variableValString, staticTemperature ){

    var temp = document.getElementById("staticTemperatureVar");

    variableValString += staticTemperature;
    temp.innerHTML = variableValString;

};
//=======================================================================================

//=======================================================================================
function divStaticPressureVar( variableValString, staticPressure ){

    var temp = document.getElementById("staticPressureVar");

    variableValString += staticPressure;
    temp.innerHTML = variableValString;

};
//=======================================================================================

//=======================================================================================
function divDynamicDensityVar( variableValString, dynamicDensity ){

    var temp = document.getElementById("densityVar");

    variableValString += dynamicDensity;
    temp.innerHTML = variableValString;

};
//=======================================================================================

//=======================================================================================
function divSpeedOfSoundVar( variableValString, speedOfSound ){

    var temp = document.getElementById("speedOfSoundVar");

    variableValString += speedOfSound;
    temp.innerHTML = variableValString;

};
//=======================================================================================

//=======================================================================================
function divDynamicPressureVar( variableValString, dynamicPressure ){

    var temp = document.getElementById("dynamicPressureVar");

    variableValString += dynamicPressure;
    temp.innerHTML = variableValString;

};
//=======================================================================================

//=======================================================================================
function divForceRatioVar( variableValString, forceRatio ){

    var temp = document.getElementById("forceRatioVar");

    variableValString += forceRatio;
    temp.innerHTML = variableValString;

};
//=======================================================================================

//=======================================================================================
function divTotalPressureVar( variableValString, totalPressure ){

    var temp = document.getElementById("totalPressureVar");

    variableValString += totalPressure;
    temp.innerHTML = variableValString;

};
//=======================================================================================

//=======================================================================================
function divTotalTemperatureVar( variableValString, totalTemperature ){

    var temp = document.getElementById("totalTemperatureVar");

    variableValString += totalTemperature;
    temp.innerHTML = variableValString;

};
//=======================================================================================

//=======================================================================================
//
//  +Description:
//         ~>  *See each function for description*
//
//  +Contains:
//       ->   divSlider()
//       ->   divPlanet()
//       ->   divSelectOutput1()
//       ->   divSelectOutput2()
//       ->   divGraph()
//       ->   divDataTable()
//
//=======================================================================================

//=======================================================================================
function divSlider( unitNum ){

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  +Description:
  //        ~>  The divSlider function checks what units the user selected and then sets the
  //        ~>  sliders to the appropriate value range. It also handles the visibility of the
  //        ~>  slider ui for the current units.
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    if ( unitNum == 0 ){

      $("#slider").slider("option", "max", 100000);
      $("#slider2").slider("option", "max", 5000);
      $(".imperialUI").css("visibility", "visible");
      $(".metricUI").css("visibility", "hidden");

    } else {

      $("#slider").slider("option", "max", 30840);
      $("#slider2").slider("option", "max", 8046);
      $(".imperialUI").css("visibility", "hidden");
      $(".metricUI").css("visibility", "visible");

    }
};
//=======================================================================================

//=======================================================================================
function divPlanet( planet ){

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  +Description:
  //        ~>  The divPlanet function handles the background for the sliderBackground div
  //        ~>  and also the gamma value for both Earth and Mars.
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    if ( planet == 0 ){
      $("#userGamma").val( earth.gamma );

      $("#sliderBackground").css({
          background: "blue"
      });

    } else {
      $("#userGamma").val( mars.gamma );

      $("#sliderBackground").css({
          background: "orange"
      });

    }

};
//=======================================================================================

//=======================================================================================
function divSelectOutput1( unitNum, unitString, outputValue ){

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  +Description:
  //        ~>  The divSelectOutput1 function corresponds to the "Select Output" dropdown list.
  //        ~>  Based on the value obtained from the element_id, the outputValue will be used
  //        ~>  to determine what unit to display.
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      var temp = document.getElementById("selectedOutputUnit");

      if ( outputValue == 0 || outputValue == 7 ){
        unitString = divUnitTemp( unitNum, unitString);
      } else if ( outputValue == 1 ){
        unitString = divUnitPressure1( unitNum, unitString );
      } else if ( outputValue == 4 || outputValue == 6 ){
        unitString = divUnitPressure2( unitNum, unitString );
      } else if ( outputValue == 2 ){
        unitString = divUnitDensity( unitNum, unitString );
      } else if ( outputValue == 3 ){
        unitString = divUnitSpeedOfSound( unitNum, unitString );
      } else if ( outputValue == 5 ){
        unitString = divUnitForceRatio( unitString );
      }

      temp.innerHTML = unitString;

};
//=======================================================================================

//=======================================================================================
function divSelectOutput2( planet, unitNum, unitString, outputValue ){
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  +Description:
  //        ~>  The divSelectOutput2 function first makes sure that any remaning ui displayed
  //        ~>  is now hidden before evaluating whether the user selected "Graph" or "Data"
  //        ~>  Then it proceeds to make sure the visibility is set correctly before displaying
  //        ~>  either the "Graph" or "Data" div.
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    $(".pressureImperialUI").css( { visibility: "hidden" } );
    $(".pressureMetricUI").css( { visibility: "hidden" } );
    $(".pressureImperialUIMars").css( { visibility: "hidden" } );
    $(".pressureMetricUIMars").css( { visibility: "hidden" } );

      if ( outputValue == 0 ){

         $(".outputGraph").css("visibility", "visible");
         $(".outputData").css("visibility", "hidden");
         divGraph( planet, unitNum, unitString );


      } else {

        $(".outputGraph").css("visibility", "hidden");
        $(".outputData").css("visibility", "visible");
        divDataTable( unitNum, unitString );

      }

};
//=======================================================================================

//=======================================================================================
function divGraph( planet, unitNum, unitString ){
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  +Description:
  //        ~>  The divGraph function handles the ui visibility for the pressure gauge based
  //        ~>  on the planet and unit selected. It also calls two gauges to display their
  //        ~>  units such as fahrenheit and psi.
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      if ( unitNum == 0){
          // Imperial
          $(".pressureImperialUI").css( { visibility: "visible" } );
          if ( planet == 1 ){
            $(".pressureImperialUIMars").css( { visibility: "visible" } );
            $(".pressureImperialUI").css( { visibility: "hidden" } );
          }
          divAtmosphericTemperature( unitNum, unitString );
          divPressureGauge( unitNum, unitString );

      } else {
          // Metric
          $(".pressureMetricUI").css( { visibility: "visible" } );
          if ( planet == 1 ){
            $(".pressureMetricUIMars").css( { visibility: "visible" } );
            $(".pressureMetricUI").css( { visibility: "hidden" } );
          }
          divAtmosphericTemperature( unitNum, unitString );
          divPressureGauge( unitNum, unitString );

      }
};
//=======================================================================================

//=======================================================================================
function divDataTable( unitNum, unitString ){
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  +Description:
  //        ~>  The divDataTable function calls it's data variables to be displayed based on
  //        ~>  the unit their in
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      divStaticTemperature( unitNum, unitString );
      divStaticPressure( unitNum, unitString );
      divDensity( unitNum, unitString );
      divSpeedOfSound( unitNum, unitString );
      divDynamicPress( unitNum, unitString );
      divForceRatio( unitString );
      divTotalPress( unitNum, unitString );
      divTotalTemp( unitNum, unitString );

};
//=======================================================================================

//=======================================================================================
//
//  +Description:
//         ~>  Functions that will display variables for the data table with
//         ~>  their respective units by acquiring the element_id through html.
//         ~>  Then the passed string from the arguments will receive a string
//         ~>  with the correct units for a variable to be displayed
//
//  +Parameters: 2 *excluding divForceRatio() with 1 parameter*
//
//  +Contains:
//       ->   divAltitude()
//       ->   divVelocity()
//       ->   divStaticTemperature()
//       ->   divStaticPressure()
//       ->   divDensity()
//       ->   divSpeedOfSound()
//       ->   divDynamicPress()
//       ->   divForceRatio()
//       ->   divTotalPress()
//       ->   divTotalTemp()
//       ->   divAtmosphericTemperature()
//       ->   divPressureGauge()
//
//=======================================================================================

//=======================================================================================
function divAltitude( unitNum, unitString ){

  var temp = document.getElementById("altitude");

    unitString = divUnitAltitude( unitNum, unitString );
    temp.innerHTML = unitString;

};
//=======================================================================================

//=======================================================================================
function divVelocity( unitNum, unitString ){

  var temp = document.getElementById("velocity");

    unitString = divUnitSpeedOfSound( unitNum, unitString );
    temp.innerHTML = unitString;

};
//=======================================================================================

//=======================================================================================
function divStaticTemperature( unitNum , unitString ){

    var temp = document.getElementById("staticTemp");

    unitString = divUnitTemp( unitNum, unitString );
    temp.innerHTML = unitString;

};
//=======================================================================================

//=======================================================================================
function divStaticPressure( unitNum , unitString ){

    var temp = document.getElementById("staticPress");

      unitString = divUnitPressure1( unitNum, unitString );
      temp.innerHTML = unitString;

};
//=======================================================================================

//=======================================================================================
function divDensity( unitNum , unitString ){

    var temp = document.getElementById("density");

    unitString = divUnitDensity( unitNum, unitString );
      temp.innerHTML = unitString;

};
//=======================================================================================

//=======================================================================================
function divSpeedOfSound( unitNum , unitString ){

    var temp = document.getElementById("speedOfSound");

    unitString = divUnitSpeedOfSound( unitNum, unitString );
      temp.innerHTML = unitString;

};
//=======================================================================================

//=======================================================================================
function divDynamicPress( unitNum , unitString ){

    var temp = document.getElementById("dynamicPress");

    unitString = divUnitPressure2( unitNum, unitString );
      temp.innerHTML = unitString;

};
//=======================================================================================

//=======================================================================================
function divForceRatio( unitString ){

    var temp = document.getElementById("forceRatio");

      unitString = divUnitForceRatio( unitString );
      temp.innerHTML = unitString;

};
//=======================================================================================

//=======================================================================================
function divTotalPress( unitNum , unitString ){

    var temp = document.getElementById("totalPress");

    unitString = divUnitPressure2( unitNum, unitString );
      temp.innerHTML = unitString;


};
//=======================================================================================

//=======================================================================================
function divTotalTemp( unitNum , unitString ){

    var temp = document.getElementById("totalTemp");

    unitString = divUnitTemp( unitNum, unitString );
      temp.innerHTML = unitString;

};
//=======================================================================================

//=======================================================================================
function divAtmosphericTemperature( unitNum, unitString ){

    var temp = document.getElementById("atmosphericTemperature");

      unitString = divUnitTemp( unitNum, unitString );
      temp.innerHTML = unitString;


};
//=======================================================================================

//=======================================================================================
function divPressureGauge( unitNum, unitString ){

    var temp = document.getElementById("pressureGauge");

      unitString = divUnitPressure1( unitNum, unitString );
      temp.innerHTML = unitString;

};
//=======================================================================================

//=======================================================================================
//
//  +Description:
//         ~>  Functions that will obtain the units based on unit selection for
//         ~>  each data table variable and then returns a string
//
//  +Parameters: 2 *excluding divUnitForceRatio() with 1 parameter*
//
//  +Contains:
//       ->   divUnitAltitude()
//       ->   divUnitTemp()
//       ->   divUnitPressure1()
//       ->   divUnitPressure2()
//       ->   divUnitDensity()
//       ->   divUnitSpeedOfSound()
//       ->   divUnitForceRatio()
//
//=======================================================================================

//=======================================================================================
function divUnitAltitude( unitNum, unitString ){

    if ( unitNum == 0 ){

      unitString += "feet";
      return unitString;

    } else {

      unitString += "meters";
      return unitString;

    }

};
//=======================================================================================

//=======================================================================================
function divUnitTemp( unitNum, unitString ){

    if ( unitNum == 0 ){

      unitString += " F<code>&deg</code>";
      return unitString;

    } else {

      unitString += " C<code>&deg</code>";
      return unitString;

    }

};
//=======================================================================================

//=======================================================================================
function divUnitPressure1( unitNum, unitString ){

      if ( unitNum == 0 ){

        unitString += " psi";
        return unitString;

      } else {

        unitString += " kPa";
        return unitString;

      }

}
//=======================================================================================

//=======================================================================================
function divUnitPressure2( unitNum, unitString ){

      if ( unitNum == 0 ){

        unitString += " psf";
        return unitString;

      } else {

        unitString += " kPa";
        return unitString;

      }

}
//=======================================================================================

//=======================================================================================
function divUnitDensity( unitNum, unitString ){

      if ( unitNum == 0 ){

        unitString += " slug/cu ft";
        return unitString;

      } else {

        unitString += " kg/cu m";
        return unitString;

      }

};
//=======================================================================================

//=======================================================================================
function divUnitSpeedOfSound( unitNum, unitString ){

      if ( unitNum == 0 ){

        unitString += " mph";
        return unitString;

      } else {

        unitString += " km/hr";
        return unitString;

      }

};
//=======================================================================================

//=======================================================================================
function divUnitForceRatio( unitString ){
    unitString += "%";
    return unitString;
};
//=======================================================================================

//=======================================================================================
//
//  +Description:
//         ~>  Conversion Functions that are used to change the units of a variable
//
//  +Parameters: 1
//  +Expected Output: var
//
//  +Contains:
//       ->   toFeet()
//       ->   toMeters()
//       ->   fromftPerSecToMPH()
//       ->   fromftPerSecToKmHr()
//       ->   rankineToFahrenheit()
//       ->   rankineToCelsius()
//       ->   slugCubicFeetToKilogramCubicMeter()
//       ->   fromIbPerSqFootToIbPerSqInch()
//       ->   fromIbPerSqFootToKiloPascal()
//
//=======================================================================================

//=======================================================================================
function toFeet ( meters ){

  return ( parseFloat( 100 / 30.48 ) * parseFloat( meters ) );

 };
//=======================================================================================

//=======================================================================================
function toMeters ( feet ){

  return ( parseFloat( 30.48 / 100 ) * parseFloat( feet ) );

};
//=======================================================================================

//=======================================================================================
function fromftPerSecToMPH ( ftPerSec ){

  /* Or ( ft / s ) (3600s / 5280ft) = (mile / hour)*/
  return ( parseFloat( 15 / 22 ) * parseFloat( ftPerSec ) );

};
//=======================================================================================

//=======================================================================================
function fromftPerSecToKmHr ( ftPerSec ){

  /* ft/s ==> mi/hr ==> km/hr */
  return ( ftPerSec * (15 / 22) * 1.609 );

};
//=======================================================================================

//=======================================================================================
function rankineToFahrenheit ( rankine ){

  /* Rankine = Fahrenheit + 459.67 */
  return ( parseFloat( rankine ) - parseFloat( 459.67 ) );

};
//=======================================================================================

//=======================================================================================
function rankineToCelsius ( rankine ){

  /* Rankine = (1.8)(Celsius) + 491.67 */
  return ( ( parseFloat( rankine ) - parseFloat( 491.67 ) ) / ( parseFloat( 1.8 ) ) );

};
//=======================================================================================

//=======================================================================================
function slugCubicFeetToKilogramCubicMeter( slugCubicFeet ){

  /* slug/ft^3 ==> kg/m^3 */
  return ( slugCubicFeet * 14.59 * Math.pow( 3.281, 3 ) );

};
//=======================================================================================

//=======================================================================================
function fromIbPerSqFootToIbPerSqInch( IbPerSqFoot ){

  return ( IbPerSqFoot / 144.0 );

};
//=======================================================================================

//=======================================================================================
function fromIbPerSqFootToKiloPascal( IbPerSqFoot ){

  /* Ib/ft^2 ==> kPa  1 Ib/ft^2 = 1 Pa*/
  return ( IbPerSqFoot * 0.04788 );

};
//=======================================================================================
