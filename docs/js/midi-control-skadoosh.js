var knobHandler = function (knobID,containerID) {
  return function (event) {
    // event and extra_data will be available here
    
//    var theThing = document.querySelector(knobID);
//     var container = document.querySelector(containerID);
     var parentPosition = getPosition(event.currentTarget);
      
      
      //     var xPosition = event.clientX - parentPosition.x - (theThing.clientWidth / 2);
      //     var yPosition = event.clientY - parentPosition.y - (theThing.clientHeight / 2);

       var ex = event.clientX - parentPosition.x;
       var ey = event.clientY - parentPosition.y;

       var ex2 = event.clientX;
       var ey2 = event.clientY;
       var cx = $(this).width()/2;
       var cy = $(this).height()/2;
       var angle = getAngle(cx, cy, ex, ey,90);
      // Debug angle - send to console
//       console.log(ex + ' ' + ey + ' ' + cx  + ' ' + cy + ' DEG: ' + angle
//        + $(this).offset().left + ' ' + $(this).offset().top + ' ' + ex2 + ' ' + ey2
//        //                      + xPosition + ' ' + yPosition
//                       );
     
       progressBarUpdate(parseInt(angle),360,knobID);
  };
};

// Assign CallBacks - the arrows below point to numbers that change
//                          \/                                              \/       \/
document.getElementById('knob1').addEventListener("click", knobHandler('#knob1','#knob1_container'));
document.getElementById('knob2').addEventListener("click", knobHandler('#knob2','#knob2_container'));
document.getElementById('knob3').addEventListener("click", knobHandler('#knob3','#knob3_container'));
document.getElementById('knob4').addEventListener("click", knobHandler('#knob4','#knob4_container'));
document.getElementById('knob5').addEventListener("click", knobHandler('#knob5','#knob5_container'));
document.getElementById('knob6').addEventListener("click", knobHandler('#knob6','#knob6_container'));
document.getElementById('knob7').addEventListener("click", knobHandler('#knob7','#knob7_container'));
document.getElementById('knob8').addEventListener("click", knobHandler('#knob8','#knob8_container'));
document.getElementById('knob9').addEventListener("click", knobHandler('#knob9','#knob9_container'));
document.getElementById('knob10').addEventListener("click", knobHandler('#knob10','#knob10_container'));
document.getElementById('knob11').addEventListener("click", knobHandler('#knob11','#knob11_container'));
document.getElementById('knob12').addEventListener("click", knobHandler('#knob12','#knob12_container'));


function getAngle(cx, cy, ex, ey, offset) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  if (typeof offset != 'undefined')
		theta+=offset;
  if (theta < 0) theta = 360 + theta; // range [0, 360)
	
	return theta;
}
    progressBarUpdate(0,360,0);

//    function midiKnobUpdate(event){
       //progressBarUpdate(parseInt(Math.random()*100),100);

  
function angle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}
  

function rotate(element, degree) {
    element.css({
        '-webkit-transform': 'rotate(' + degree + 'deg)',
        '-moz-transform': 'rotate(' + degree + 'deg)',
        '-ms-transform': 'rotate(' + degree + 'deg)',
        '-o-transform': 'rotate(' + degree + 'deg)',
        'transform': 'rotate(' + degree + 'deg)',
        'zoom': 1
    });
}

function progressBarUpdate(x, outOf,knobID) {
    var firstHalfAngle = 180;
    var secondHalfAngle = 0;
  if (knobID == 0) {
      var oldAngle = parseInt($(".pie").attr('data-angle')); 
    } else {
//      var theThing = document.querySelector(knobID);
      var oldAngle = parseInt($(document.querySelector(knobID)).attr('data-angle'));
    }
    
  
    // caluclate the angle
    var drawAngle = x / outOf * 360;

    // calculate the angle to be displayed if each half
    if (drawAngle <= 180) {
        firstHalfAngle = drawAngle;
    } else {
        secondHalfAngle = drawAngle - 180;
    }
        
    if (drawAngle > 180 && oldAngle < 180){
       $(".slice1, .slice2").css({
      	'transition-duration':'0.15s',
        '-webkit-transition-duration':'0.15s'
      });
    	$(".slice1").css({
      	'transition-delay':'0s',
        '-webkit-transition-delay':'0s'
      });
      $(".slice2").css({
      	'transition-delay':'0.15s',
        '-webkit-transition-delay':'0.15s'
      });
    } else if (drawAngle < 180 && oldAngle > 180){
        $(".slice1, .slice2").css({
      	'transition-duration':'0.15s',
        '-webkit-transition-duration':'0.15s'
      });
    	$(".slice2").css({
      	'transition-delay':'0s',
        '-webkit-transition-delay':'0s'
      });
      $(".slice1").css({
      	'transition-delay':'0.15s',
        '-webkit-transition-delay':'0.15s'
      });
    } else {
      $(".slice1, .slice2").css({
      	'transition-delay':'0s',
        '-webkit-transition-delay':'0s',
        'transition-duration':'0.3s',
        '-webkit-transition-duration':'0.3s'
      });
    }
    
    if (knobID == 0) {
      $('.pie').attr('data-angle', drawAngle);
      $('.pie').attr('data-x', x);
    } else {
      $(document.querySelector(knobID)).attr('data-angle', drawAngle);
      $(document.querySelector(knobID)).attr('data-x', x);
//      var oldAngle = parseInt($(document.querySelector(knobID)).attr('data-angle'));
    }


    // set the transition
    if (knobID == 0) {
        rotate($(".slice1"), firstHalfAngle);
        rotate($(".slice2"), secondHalfAngle);
    } else {
      rotate($(document.querySelector(knobID+"_slice1")), firstHalfAngle);
      rotate($(document.querySelector(knobID+"_slice2")), secondHalfAngle);
//      $(document.querySelector(knobID+"_status")).html( 127*x/360 + " of " + 127*outOf/360);
    }


    // set the values on the text
    var midiRangeX = Math.floor(127*x/360 );
    var midiRangeOutOf = Math.floor(127*outOf/360);
    if (knobID == 0) {
        $(".status").html(midiRangeX + "/" + midiRangeOutOf);
    } else {
        $(document.querySelector((knobID+"_status"))).html(midiRangeX + "/" + midiRangeOutOf);
    }

    if (knobID != 0) {
        newMessage=getKnobValues();
        publishMIDIsettings(newMessage); // function defined in mqtt-skadoosh.js
    }
      

}


// Helper function to get an element's exact position
function getPosition(el) {
  var xPos = 0;
  var yPos = 0;

  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;

      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }

    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
  
}

// Helper function that gets the values for all knob values and returns a comma separated string
var NUM_KNOBS = 12;
function getKnobValues() {

  var knobValues = new Array(NUM_KNOBS);
  
  // Get values from all the knobs
  for(var i=0; i<NUM_KNOBS; i++) { 
    knobValues[i] = Number($(document.querySelector('#knob'+String(i+1))).attr('data-x'));
  }

  // Convert all the values to the correct range - i.e. 0-127
  var knobValuesScaled = knobValues.map(function(element) {
	return Math.floor(127*element/360);
  });
  
  // Convert the array to comma separated string
  var newMessage =knobValuesScaled.toString();
  var jsonObj = new Object();
  jsonObj.PITCH = knobValuesScaled[0];
  jsonObj.PORTAMENTO = knobValuesScaled[1];
  jsonObj.FEEDBACK = knobValuesScaled[2];
  jsonObj.FILTERTYPE = knobValuesScaled[3];
  jsonObj.MIX = knobValuesScaled[4];
  jsonObj.DELAYLEVEL = knobValuesScaled[5];
  jsonObj.SUSTAIN = knobValuesScaled[6];
  jsonObj.RINGMODULATION = knobValuesScaled[7];
  jsonObj.FILTERENVELOPE = knobValuesScaled[8];
  jsonObj.FILTERBANDWIDTH = knobValuesScaled[9];
  jsonObj.MODULATION = knobValuesScaled[10];
  jsonObj.DELAYFEEDBACK = knobValuesScaled[11];

//   jsonObj.married = false;
  var jsonString = JSON.stringify(jsonObj);
  return jsonString; // or newMessage (for just plain array)
}

var SENSOR_TO_KNOB = new Array(NUM_KNOBS); // SENSOR_TO_KNOB[0] = 3; Means Knob 1 (0+1) is assigned to the 3rd sensor data (0 indexed)
// Default it -1 - manual mode
for(var i=0; i<NUM_KNOBS; i++) { 
  SENSOR_TO_KNOB[i] = Number(-1);
}
function knobUpdater(sensorDataMsg){
//  var sensorArray = sensorDataMsg.split(',');

  var jsonDATA = JSON.parse(sensorDataMsg);
  var sensorArray = new Array(4);
  sensorArray[0] = parseInt(jsonDATA.xGy);
  sensorArray[1] = parseInt(jsonDATA.yGy);
  sensorArray[2] = parseInt(jsonDATA.zGy);
  sensorArray[3] = parseInt(jsonDATA.prx);
//  console.log(sensorArray); Debug - list sensor array data in console
  
  var didUpdate = false;
  // Get values from all the knobs
  for(var i=0; i<NUM_KNOBS; i++) {
    if (SENSOR_TO_KNOB[i] >= 0) {
      logMessage( "Updating Knob: " + (i+1) + "with: " + parseInt(sensorArray[SENSOR_TO_KNOB[i]]) );
      if (sensorArray[SENSOR_TO_KNOB[i]]>=0){
        progressBarUpdate(parseInt(360*sensorArray[SENSOR_TO_KNOB[i]]/127),360,('#knob'+String(i+1)));
        didUpdate=true;
      }
    }
  }
  
  if (didUpdate == true) {
      var newMessage=getKnobValues();
      publishMIDIsettings(newMessage); // function defined in mqtt-skadoosh.js

  }
  
}


$('.dropdown-menu a').click(function(event){
  logMessage("You what " + event.target.parentNode.id);
  var dropDownInfo = (event.target.parentNode.id).split(''); // get's id that contains the object clicked
  var dd_knobNum = String(Number(dropDownInfo[4]+dropDownInfo[5]));
  var dd_knobType = (dropDownInfo[7]+dropDownInfo[8]+dropDownInfo[9]);
  if  ( dd_knobType == "man" ) {
        logMessage("You what " + dd_knobNum + "= " + dd_knobType );
        SENSOR_TO_KNOB[Number(dd_knobNum-1)] = -1;
       } 
  else if  ( dd_knobType == "xGy" ) {
        logMessage("You what " + dd_knobNum + "= " + dd_knobType );
        SENSOR_TO_KNOB[Number(dd_knobNum-1)] = 0;
     } 
  else if  ( dd_knobType == "yGy" ) {
        logMessage("You what " + dd_knobNum + "= " + dd_knobType );
        SENSOR_TO_KNOB[Number(dd_knobNum-1)] = 1;
     } 
  else if  ( dd_knobType == "zGy" ) {
        logMessage("You what " + dd_knobNum + "= " + dd_knobType );
        SENSOR_TO_KNOB[Number(dd_knobNum-1)] = 2;
     } 
  else if  ( dd_knobType == "prx" ) {
        logMessage("You what " + dd_knobNum + "= " + dd_knobType );
        SENSOR_TO_KNOB[Number(dd_knobNum-1)] = 3;
     } 
  else {
      logMessage("I see that: " + dd_knobNum  + " & " + dd_knobType);
  }
  
  publish(undefined,"map@chg",2);
  
//  console.log(document.getElementById("knob"+(dd_knobNum)+"_setting").innerHTML)
//  console.log(("knob"+(dd_knobNum)+"_"+dd_knobType))
  document.getElementById("knob"+(dd_knobNum)+"_setting").innerHTML = document.getElementById("knob"+zeroPad(Number(dd_knobNum),2)+"_"+dd_knobType).innerHTML;
//   $(document.querySelector(("#knob"+(dd_knobNum)+"_setting"))).html($(document.querySelector(("#knob"+(dd_knobNum)+dd_knobType))).html);
    
});

// num = a number, numZeros = number of digits final output should have
function zeroPad (num, numZeros) {
    var an = Math.abs (num);
    var digitCount = 1 + Math.floor (Math.log (an) / Math.LN10);
    if (digitCount >= numZeros) {
        return num;
    }
    var zeroString = Math.pow (10, numZeros - digitCount).toString ().substr (1);
    return num < 0 ? '-' + zeroString + an : zeroString + an;
}