// A timer that uses jQuery only cause I'm lazy...

// Include the jQuery lib and 
// set a div to id='timerArea' and it will render
// a timer that counts down to the following date settings:
(function( $ ){

    // we call it elgant timer.
    $.fn.elegantTimer = function( options ) {
  
    /*************** Set up your timer! *********************/
    var myTimer = new Object();
    myTimer.timerLocation = this; //"#timerArea";
    
    var settings = $.extend( {
      'year' : '2015',
      'month': '07',
      'day'  : '15',
      'hour' : '15',
      'min'  : '15',
      'sec'  : '15',
      'textSize' : '100', 
      'textColor' : '#ffffff',
      'timerWidth' : '900',
      'textSpacing' : '1',
      'areaPadding' : '20',
      'yearVisible' : true,
      'dayVisible': true,
    }, options);
    
    // countdown to:
    myTimer.timerYear = settings.year;
    myTimer.timerMonth = settings.month;
    myTimer.timerDay = settings.day;
    myTimer.timerHour = settings.hour;
    myTimer.timerMinute = settings.min;
    myTimer.timerSecond = settings.sec;

    // set up dimensions:
    myTimer.timerTxtSize = settings.textSize;
    myTimer.timerTxtColor = settings.textColor;
    myTimer.timerWidth = settings.timerWidth;
    //myTimer.imgHeight = 75; // max is 400.
    myTimer.imgSpacing = settings.textSpacing; // whitespace between our counters
    myTimer.areaPadding = settings.areaPadding; // padding for timerLocation

    // optional flags
    myTimer.yearVisible = settings.yearVisible;
    myTimer.dayVisible = settings.dayVisible;

    /*****************  END SETUP OPTIONS ******************************/


       $(myTimer.timerLocation).css({
            position: 'relative',
            width: myTimer.timerWidth + "px",
            fontSize: myTimer.timerTxtSize + "px",
            color: myTimer.timerTxtColor,
            backgroundColor: myTimer.imgBackgoundColor,
            padding: myTimer.areaPadding + "px"
            });
        
        // add the timer class:
        $(myTimer.timerLocation).addClass('jqTimerPlugin');
        
        // wtf javascript.
        myTimer.timerMonth--;
            
        setInterval( function() {
            // clear old timer values
            $(myTimer.timerLocation).empty();
            
            // prepare the dates
            var d = new Date(myTimer.timerYear, 
                    myTimer.timerMonth, 
                    myTimer.timerDay, 
                    myTimer.timerHour, 
                    myTimer.timerMinute, 
                    myTimer.timerSecond, 
                    0);
            var now = new Date;
            var timeDiff = (d.getTime() - now.getTime()) / 1000; // milliseconds to seconds
            
            // set up our numbers
            var yrsTill = Math.floor(timeDiff / (60*60*24*365));
            timeDiff -= yrsTill * (60*60*24*365);
            var daysTill = Math.floor(timeDiff / (60*60*24));
            timeDiff -= daysTill * 60 * 60 * 24;
            var hrsTill = Math.floor(timeDiff / (60 * 60));
            timeDiff -= hrsTill * 60 * 60;
            var minsTill = Math.floor(timeDiff / 60);
            timeDiff -= minsTill * 60;
            var secsTill = Math.floor(timeDiff);
            
            
            // formatting/ toggle settings for visibility:
           // var numDiv = "<div style='position:relative;display:inline-block;float:left;font-size:" + timerTxtSize 
            var numDiv = "<div style='display:inline-block;font-size:" + myTimer.timerTxtSize 
                    + "px;color:" + myTimer.timerTxtColor + "'>";
            var divider = numDiv + ":</div>";
            var endDiv = "</div>"; 
            
            
            var spaces = "";
            for(var i = 0; i < myTimer.imgSpacing; i++) spaces += "&nbsp;";
            
            if(myTimer.yearVisible) {
                var yrHTML = numDiv + numToStyledDiv(yrsTill, false) 
                    + endDiv + spaces + divider + spaces;
                }
            else
                var yrHTML = "";
                
            if(myTimer.dayVisible) {
                var dayHTML = numDiv + numToStyledDiv(daysTill, false) 
                    + endDiv + spaces + divider + spaces;
                }
            else
                var dayHTML = "";
                
            var hrsHTML = numDiv + numToStyledDiv(hrsTill, true) 
                        + endDiv + spaces + divider + spaces;
            var minsHTML = numDiv + numToStyledDiv(minsTill, true)
                        + endDiv + spaces + divider + spaces;
            var secsHTML = numDiv + numToStyledDiv(secsTill, true)+ endDiv;
            
            $(myTimer.timerLocation).append("<div class='jqTimerWrapper'>" +
                yrHTML + 
                dayHTML + 
                hrsHTML + 
                minsHTML +
                secsHTML +
                "</div>"
                );
            
            /** Take care of the labels **/
            /*
            var labelDiv = "<div style='display:inline-block;font-size:" + myTimer.timerTxtSize / 10
                    + "px;color:" + myTimer.timerTxtColor + "'>";
            var divSpace = "<div style='display:inline-block;'>&nbsp;</div>";
            $(myTimer.timerLocation).append("<div class='jqTimerWrapper'>" +
                labelDiv + "YEAR" + endDiv + divSpace
                + labelDiv + "DAY" + endDiv 
                + labelDiv + "HOUR" + endDiv
                + labelDiv + "MINUTE" + endDiv
                + labelDiv + "SECOND" + endDiv 
                + endDiv);
                */
                
            }, 1000); // end interval loop
            

    };
})( jQuery );
        
/********************************************************************/
// functions needed    
    function numToStyledDiv(nums, isTwoDigits) {
        // if true, need to add zero infron
        if(isTwoDigits) {
            var numTemp = String(nums);
            var addZero = false;
            if(numTemp.length <= 1)
                addZero = true;
            
            var html = "";
            var lenNum = numTemp.length;
            if(addZero)
                html += "0";
            for(var i = 0; i < lenNum; i++) {
                html += numTemp.substring(i,i+1);
                }
            
            return html;
            }
        
        else {
            var numTemp = String(nums);
            var lenNum = numTemp.length;
            
            var html = "";
            for(var i = 0; i < lenNum; i++) {
                html += numTemp.substring(i,i+1);
                }
            return html;
            }
        }
        
