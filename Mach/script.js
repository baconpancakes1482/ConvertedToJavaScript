"use strict";
//=======================================================================================
//
//                          Mach and Speed of Sound Calculator
//
//                Interactive Program to solve Standard Atmosphere Equations
//                             for mach and speed of sound
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
// $jQuery$
//=======================================================================================

//=======================================================================================
$(document).ready(function(){

    // Making a selection from the drop down list will get a pointer for the cursor
    $("selector, select").css( "cursor", "pointer");
    // Initializing the button
    $( "button" ).button();

  var computation = function ( event ){
    //  Checks user input first before running the computation
      ( checkUserInput() ) ? compute() :  err();
  };

  var updateDiv = function ( event ){
    //  If the user makes any selection, the div elements on the page will update
      changeDiv();
  };

  var defaultVal = function ( event ){
    //  If the user makes any selection, the default values will be used for the
    //  variables to perform computation. This is followed by udpateDiv.
    var units = userUnit();
    var altitudeOrTemperature = userSelection1();
    var speedOrMach = userSelection2();
      userSelected( units, altitudeOrTemperature, speedOrMach, event );
      computation();
      updateDiv();
  };

  var userSelected = function ( units, altitudeOrTemperature, speedOrMach,  event ){
    //  Based on the units we are in, the default values to execute once a selection is
    //  changed are set here
      if ( units == 0 ){

        if ( altitudeOrTemperature == 0 ){
          $("#input1").val(0);
        }
        if ( altitudeOrTemperature == 1 ){
          $("#input1").val(58);
        }
        if ( speedOrMach == 0 ){
          $("#input2").val(999);
        }
        if ( speedOrMach == 1 ){
          $("#input2").val(1.313);
        }

      } else {

        if ( altitudeOrTemperature == 0 ){
          $("#input1").val(0);
        }
        if ( altitudeOrTemperature == 1 ){
          $("#input1").val(15);
        }
        if ( speedOrMach == 0 ){
          $("#input2").val(446);
        }
        if ( speedOrMach == 1 ){
          $("#input2").val(1.313);
        }

      }

    };

    // These are event-triggers that will run given a specific event
    $("button").on("click", computation );
    $("select").on("change", updateDiv );
    $("select").on("change", defaultVal );
    //  Default values in input fields when the program is first run
    $("#input1").val( 0 );
    $("#input2").val(500);
    //  The initial computation with the default values
    computation();
    //  The initial div elements that are displayed *units*
    updateDiv();

});
//=======================================================================================

//=======================================================================================
function checkUserInput (){
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  +Description:
  //            ~>  The checkUserInput function takes no parameters and determines whether the
  //            ~>  values entered in the input fields are valid by utilizing the filterFloat
  //            ~>  function and a conditional statement that will return boolean
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var firstInput = document.getElementById('input1').value;
  var secondInput = document.getElementById('input2').value;

    return ( (!isNaN(filterFloat(firstInput))) && (!isNaN(filterFloat(secondInput))) )  ? true : false;

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

  var temp = "Invalid Input! Please try again!";

  document.getElementById("output1").innerHTML = temp;
  document.getElementById("output2").innerHTML = temp;
  document.getElementById("output3").innerHTML = temp;

};
//=======================================================================================

//=======================================================================================
function compute (){
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  +Description:
  //            ~>  The compute function takes no parameters and handles the process of
  //            ~>  computation. It then sends the speed, mach, and speed of sound for output
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  var inputOne = document.getElementById('input1').value;
  var inputTwo = document.getElementById('input2').value;
  var userChoice1 = userSelection1();
  var userChoice2 = userSelection2();

  if ( userChoice1 == 0 ){
      inputOne = checkAltitude ( inputOne );
  }

  if ( userChoice1 == 1 ){
      inputOne = checkTemperature( inputOne );
  }

  if ( userChoice2 == 0 ){
      inputTwo = checkSpeed ( inputTwo );
  }

  if ( userChoice2 == 1 ){
      inputTwo = checkMach( inputTwo );
  }

  if ( userChoice1 == 0 ){
    var resultFromOtherVariable1 = altitudeToTemperature ( inputOne );
  }

  if ( userChoice1 == 0 ){
    // If the user selected altitude for the first input, use resultFromOtherVariable1
    var speedOfSound = setSpeedOfSound ( resultFromOtherVariable1 );
 }

  if ( userChoice1 == 1 ){
    // If the user selected a temperature for the first input, use the first input
    var speedOfSound = setSpeedOfSound ( inputOne );
  }

  if ( userChoice2 == 0 ){
    // If the user selected a speed for the second input, use that input as well as speedOfSound
    var resultFromOtherVariable2 = speedToMach ( inputTwo, speedOfSound );
  }

  if ( userChoice2 == 1 ){
    // If the user seleceted a Mach for the second input, use that input as well as speedOfSound
    var resultFromOtherVariable2 = machToSpeed ( inputTwo, speedOfSound );
  }

    toString ( inputTwo, resultFromOtherVariable2, speedOfSound );

};
//=======================================================================================

//=======================================================================================
function numberFormat ( num ){
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  +Description:
  //            ~>  The numberFormat function takes 1 parameter and formats a variable to a
  //            ~>  fixed decimal point range
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  return parseFloat(Math.round( num * 100 ) / 100 ).toFixed(2);
};
//=======================================================================================

//=======================================================================================
function toString( inputTwo, resultFromOtherVariable2, speedOfSound ){
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  +Description:
  //            ~>  The toString function takes 5 parameters and formats our variables to a
  //            ~>  fixed decimal point range as well as convert them to a string. With this
  //            ~>  string, we can send it to another function to display the results via
  //            ~>  document.getElementById("element_id").innerHTML = string;
  //            ~>  We need to have the boolean from the user selection in order to know what
  //            ~>  the user entered. So if userChoice1 == 1, we can be sure the user entered
  //            ~>  a temperature value in the first input box
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  var userChoice1 = userSelection1();
  var userChoice2 = userSelection2();
  var speedString = "";
  var speedOfSoundString = "";
  var machSring = "";

  // Format output values
      inputTwo = numberFormat( inputTwo );
      resultFromOtherVariable2 = numberFormat( resultFromOtherVariable2 );
      speedOfSound = numberFormat( speedOfSound );

  if ( userChoice1 == 0 && userChoice2 == 0) {
    speedString += inputTwo;
    machSring += resultFromOtherVariable2;
  }

  if ( userChoice1 == 0 && userChoice2 == 1 ) {
    speedString += resultFromOtherVariable2;
    machSring += inputTwo;
  }

  if ( userChoice1 == 1 && userChoice2 == 0 ) {
    speedString += inputTwo;
    machSring += resultFromOtherVariable2;
  }

  if ( userChoice1 == 1 && userChoice2 == 1 ) {
    speedString += resultFromOtherVariable2;
    machSring += inputTwo;
  }

    speedOfSoundString += speedOfSound;
      results ( speedString, speedOfSoundString, machSring );

};
//=======================================================================================

//=======================================================================================
function results (speed, speedOfSound, mach ){
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  +Description:
  //            ~>  The results function takes 3 parameters and requests the document elements
  //            ~>  associated with the output to change to these 3 parameter values. This
  //            ~>  causes the final results from computation to be displayed in their
  //            ~>  respective output box
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  document.getElementById("output1").innerHTML = speed;
  document.getElementById("output2").innerHTML = speedOfSound;
  document.getElementById("output3").innerHTML = mach;

};
//=======================================================================================

//=======================================================================================
function changeDiv(){
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  +Description:
  //            ~>  The changeDiv function takes no parameters and therefore can be called
  //            ~>  at any point of the program to update the div elements for the program
  //            ~>  This function assigns variables to the current values of the element_id
  //            ~>  and the selection from the drop down list currently active as well as the
  //            ~>  unit system. Additionally, there is strings to hold the udpated strings to
  //            ~>  display the correct units for corresponding selections
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      var altitudeOrTemperatureUnit = document.getElementById("input1Unit");
      var speedOrMachUnit = document.getElementById("input2Unit");
      var speedUnit = document.getElementById("output1Unit");
      var speedofSoundUnit = document.getElementById("output2Unit");
      var units = userUnit();
      var altitudeOrTemperature = userSelection1();
      var speedOrMach = userSelection2();
      var altitudeOrTemperatureString = "";
      var speedOrMachString = "";
      var speedString = "";
      var speedOfSoundString = "";

      if  ( units == 0 ){

        if ( altitudeOrTemperature == 0 ){

            altitudeOrTemperatureString += " feet";
            altitudeOrTemperatureUnit.innerHTML = altitudeOrTemperatureString;

        } else if ( altitudeOrTemperature == 1 ){

            altitudeOrTemperatureString += " degrees F";
            altitudeOrTemperatureUnit.innerHTML = altitudeOrTemperatureString;

        }

        if ( speedOrMach == 0 ){

          $("#input2Unit").css("visibility", "visible");
            speedOrMachString += "mph";
            speedOrMachUnit.innerHTML = speedOrMachString;

        } else {

          $("#input2Unit").css("visibility", "hidden");

        }

        speedString += "mph";
        speedUnit.innerHTML = speedString;
        speedOfSoundString += "mph";
        speedofSoundUnit.innerHTML = speedOfSoundString;

      } else {

        if ( altitudeOrTemperature == 0 ){

          altitudeOrTemperatureString += " meters";
          altitudeOrTemperatureUnit.innerHTML = altitudeOrTemperatureString;

        } else if ( altitudeOrTemperature == 1){

            altitudeOrTemperatureString += " degrees C";
            altitudeOrTemperatureUnit.innerHTML = altitudeOrTemperatureString;

        }

          if( speedOrMach == 0 ){

            $("#input2Unit").css("visibility", "visible");
              speedOrMachString += " m/sec";
              speedOrMachUnit.innerHTML = speedOrMachString;

        } else {

            $("#input2Unit").css("visibility", "hidden");

        }

        speedString += "m/sec";
        speedUnit.innerHTML = speedString;
        speedOfSoundString += "m/sec";
        speedofSoundUnit.innerHTML = speedOfSoundString;

      }

};
//=======================================================================================

//=======================================================================================
//   +Description:
//          ~>  Earth - Standard day
//=======================================================================================

//=======================================================================================
var earth = {

  rgas: 1718,     // feet^2 / seconds^2
  gamma: 1.40     // unit-less

};
//=======================================================================================

//=======================================================================================
//  +Description:
//        ~>   Mars - Curve fit of orbiter data
//=======================================================================================

//=======================================================================================
var mars = {

  rgas: 1149.0,   // feet^2 / seconds^2
  gamma: 1.29     // unit-less

};
//=======================================================================================

//=======================================================================================
//  +Description:
//          ~>  Functions that will check the range of the variable in question
//          ~>  and set it to a new variable based on the result of the checking
//          ~>  bounds functions
//
//  +Parameters: 1
//  +Expected Output: var
//
//  +Contains:
//          ->  checkAltitude()
//          ->  checkTemperature()
//          ->  checkSpeed()
//          ->  checkMach()
//=======================================================================================

//=======================================================================================
function checkAltitude ( userAltitude ){

  var altitude = checkAltitudeRange ( userAltitude );

    return altitude;

};
//=======================================================================================

//=======================================================================================
function checkTemperature ( userTemperature ){

  var temperature = 0;

    temperature = checkTemperatureRange ( userTemperature );

    return temperature;

};
//=======================================================================================

//=======================================================================================
function checkSpeed  ( userSpeed ){

  var speed = checkSpeedRange ( userSpeed );

    return speed;

};
//=======================================================================================

//=======================================================================================
function checkMach ( userMach ){

  var mach = checkMachRange ( userMach );

    return mach;

};
//=======================================================================================

//=======================================================================================
//  +Description:
//          ~>  Functions that return a specific variable that is needed to
//          ~>  help complete computation of other variables
//  +Contains:
//          ->  altitudeToTemperature()
//          ->  machToSpeed()
//          ->  speedToMach()
//          ->  setSpeedOfSound()
//          ->  setTemperature()
//          ->  computeSpeedOfSound()
//=======================================================================================

//=======================================================================================
function altitudeToTemperature ( altitude ){
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  +Description:
  //            ~>  Obtain a temperature in rankine units with an altitude that is either in
  //            ~>  feet or meters. The inequalities evaluating altitude in each case statement
  //            ~>  are only in feet so there is an if statement to convert from meters to feet
  //            ~>  These altitude inequalities cover Earth and Mars and are obtained from
  //            ~>  Tom Benson's original Mach and Speed of Sound Calculator Java Applet
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  var planet = userPlanet();
  var units = userUnit();
  var temperature;
  var key = true;

  if ( units == 1 ){

    altitude = toFeet( altitude );              // If in metrics, convert to feet

  }

  if ( planet == 0 ){

    switch ( key ){                           //  Earth

        case ( altitude <= 36152. ):          //  Altitude is in feet       // Troposphere
          temperature = 518.6 - 3.56 * ( altitude / 1000. );
          break;
        case ( altitude >= 36152. && altitude <= 82345. ):                  // Stratosphere
          temperature = 389.98;
          break;
        case ( altitude >= 82345. && altitude <= 155348. ):
          temperature = parseFloat( 389.98 ) + parseFloat( 1.645 ) * parseFloat( altitude - 82345. ) / 1000.;
          break;
        case ( altitude >= 155348. && altitude <= 175346. ):
          temperature = 508.788;
          break;
        case ( altitude >= 175346. && altitude <= 262448. ):
          temperature = 508.788 - 2.46888 * ( altitude - 175346. ) / 1000.;
          break;

        }

    } else {

      switch ( key ){                           //  Mars

        case ( altitude <= 22960. ):
          temperature = 434.02  - .548  * ( altitude / 1000. );
          break;
        case ( altitude >= 22960. ):
          temperature = 449.36 - 1.217 * ( altitude / 1000. );
          break;

      }

    }

    return temperature;

};
//=======================================================================================

//=======================================================================================
function machToSpeed ( mach, speedOfSound ){
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~> Mach = Speed / SpeedOfSound
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  return mach * speedOfSound;
};
//=======================================================================================

//=======================================================================================
function speedToMach ( speed, speedOfSound){
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~> Mach = Speed / SpeedOfSound
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  return speed / speedOfSound;
};
//=======================================================================================

//=======================================================================================
function setSpeedOfSound ( temperature ){
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  +Description:
  //         ~>Obtain speed of sound based on temperature and set it to respective unit
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    var units = userUnit();
    var speedOfSound = computeSpeedOfSound( temperature );


    if ( units == 0 ) {
      speedOfSound = fromftPerSecToMPH ( speedOfSound );
    }

    if ( units == 1 ){
      speedOfSound = fromftPerSecToMetersPerSecond ( speedOfSound );
    }

    return speedOfSound;

};
//=======================================================================================

//=======================================================================================
function setTemperature ( temperature ){
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  +Description:
  //        ~>  Obtain the temperature in Rankine units and convert to either
  //        ~>  Fahrenheit or Celsius to return it as a two digit whole number
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    var units = userUnit();

    if ( units == 0 ){
      temperature = rankineToFahrenheit ( temperature );
    }

    if ( units == 1 ){
      temperature = rankineToCelsius ( temperature );
    }

  return  parseFloat( Math.round( temperature * 100 ) / 100 ).toFixed(2);

  };
//=======================================================================================

//=======================================================================================
function computeSpeedOfSound ( temperature ){
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  +Description:
  //        ~>  Obtain the speed of sound based on the planet selected and using the Equations
  //        ~>  speed of sound = sqrt( specific heat ratio * ideal gas constant * temperature )
  //        ~>  Then return the computed speed of sound value for the specific planet
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      var planet = userPlanet();

      var speedOfSoundEarth = Math.sqrt( parseFloat( earth.gamma ) * parseFloat( earth.rgas ) * parseFloat( temperature ) );
      var speedOfSoundMars = Math.sqrt( parseFloat( mars.gamma ) * parseFloat( mars.rgas ) * parseFloat( temperature ) );

      if ( planet == 0){
        return speedOfSoundEarth;
      }

      if ( planet == 1){
        return speedOfSoundMars;
      }

};
//=======================================================================================

//=======================================================================================
//  +Description:
//        ~>  Conversion Functions used for Imperial and Metric Units
//  +Parameter: 1
//  +Expected Output: Float
//
//  +Contains:
//        ->  toFeet()
//        ->  toMeters()
//        ->  fromftPerSecToMPH()
//        ->  fromftPerSecToMetersPerSecond()
//        ->  rankineToFahrenheit()
//        ->  fahrenheitToRankine()
//        ->  celsiusToRankine()
//        ->  rankineToCelsius()
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
function fromftPerSecToMetersPerSecond ( ftPerSec ){

  return ( parseFloat( 3.281 ) * parseFloat( ftPerSec ) );

};
//=======================================================================================

//=======================================================================================
function rankineToFahrenheit ( rankine ){

            /* Rankine = Fahrenheit + 459.67 */
  return ( parseFloat( rankine ) - parseFloat( 459.67 ) );

};
//=======================================================================================

//=======================================================================================
function fahrenheitToRankine ( fahrenheit ){

            /* Rankine = Fahrenheit + 459.67 */
  return ( parseFloat( fahrenheit ) + parseFloat( 459.67 ) );

};
//=======================================================================================

//=======================================================================================
function celsiusToRankine ( celsius ){

                    /* Rankine = Fahrenheit + 459.67 */
  return ( ( parseFloat( 1.8 ) * parseFloat( celsius ) ) + parseFloat( 491.67 ) );

};
//=======================================================================================

//=======================================================================================
function rankineToCelsius ( rankine ){

                  /* Rankine = (1.8)(Celsius) + 491.67 */
  return ( ( parseFloat( rankine ) - parseFloat( 491.67 ) ) / ( parseFloat( 1.8 ) ) );

};
//=======================================================================================

//=======================================================================================
//  +Description:
//      ~>  Functions that obtain user choices by obtaining the
//      ~>  respective html element #id-value-attribute
//
//  +Parameters: 0
//  +Expected output: 0 or 1
//
//  +Contains:
//        ->  userPlanet()
//        ->  userUnit()
//        ->  userSelection1()
//        ->  userSelection2()
//
//=======================================================================================

//=======================================================================================
function userPlanet (){

  var temp = document.getElementById('planet').value;

  return temp;

};
//=======================================================================================

//=======================================================================================
function userUnit (){

  var temp = document.getElementById('unit').value;

  return temp;

};
//=======================================================================================

//=======================================================================================
function userSelection1 (){

  var temp = document.getElementById('selection1').value;

  return temp;

};
//=======================================================================================

//=======================================================================================
function userSelection2 (){

  var temp = document.getElementById('selection2').value;

  return temp;

};
//=======================================================================================

//=======================================================================================
//
//  +Description:
//         ~>  Functions to check the range of variables and set it to their
//         ~>  respective range if they are out of bounds based on the unit
//         ~>  system that the user selected.
//         ~>  $("#element_id").val(variable) updates the input value
//
//  +Parameters: 1
//  +Expected Output: temperature variable that is in RANKINE!
//
//  +Contains:
//       ->   checkAltitudeRange()
//       ->   checkTemperatureRange()
//       ->   checkSpeedRange()
//       ->   checkMachRange()
//
//=======================================================================================

//=======================================================================================
function checkAltitudeRange ( altitude ){

  var units = userUnit();

  if ( units == 1){

     // Metric Units (meters)
      if ( altitude < 0 ){
        altitude = 0;
      }
      if ( altitude > 76200 ){
        altitude = 76200;
      }

      $("#input1").val( altitude );

        return altitude;

     } else {

      // Imperial Units (feet)
      if ( altitude < 0 ){
        altitude = 0;
      }
      if ( altitude > 250000 ){
        altitude = 250000;
      }

      $("#input1").val( altitude );

      return altitude;

    }

};
//=======================================================================================

//=======================================================================================
function checkTemperatureRange ( temperature ){

  var units = userUnit();

  if ( units == 1){

     // Celsius
      if ( temperature < -100 ){
        temperature = -100;
      }
      if ( temperature > 20 ){
        temperature = 20;
      }

      $("#input1").val( temperature );

        temperature = celsiusToRankine ( temperature );

        return temperature;

     } else {

      // Fahrenheit
      if ( temperature < -150 ){
        temperature = -150;
      }
      if ( temperature > 100 ){
        temperature = 100;
      }

      $("#input1").val( temperature );

        temperature = fahrenheitToRankine ( temperature );

      return temperature;

    }

};
//=======================================================================================

//=======================================================================================
function checkSpeedRange ( speed ){

  var units = userUnit();
  if ( units == 1){

     // Metric Units  (meters/second)
    if ( speed < 0 ){
      speed = 0;
    }
    if ( speed > 7867 ){
      speed = 7867;
    }

      $("#input2").val( speed );

      return speed;

   } else {

    // Imperial Units  (feet/second)
    if ( speed < 0 ){
      speed = 0;
    }
    if ( speed > 17600 ){
      speed = 17600;
    }

      $("#input2").val( speed );

      return speed;

  }

};
//=======================================================================================

//=======================================================================================
function checkMachRange ( mach ){

  if ( mach < 0 ){
    mach = 0;
  }
  if ( mach > 25 ){
    mach = 25;
  }

    $("#input2").val( mach );

    return mach;

};
//=======================================================================================
