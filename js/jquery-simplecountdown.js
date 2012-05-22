/*
 * jQuery Simple Countdown plugin.
 * Copyright Aaron Decker 2012
 * Call with: $('#divId').simpleCountdown({OPTIONS});
 * See list of default options to pass it in the index.html file!
 * 
 */

(function( $ ){
    // WIP name: elegantTime.
    $.fn.simpleCountdown = function( options ) {
    
    /*** timer settings default values. ***/
    var settings = $.extend( {
      'year' : 2050,
      'month': 07,
      'day'  : 15,
      'hour' : 15,
      'min'  : 15,
      'sec'  : 15,
      'textSize' : 100, 
      'textColor' : '#ffffff',
      'textSpacing' : 1,
      'textPadding' : 5,
      'yearVisible' : true,
      'dayVisible': true,
      'timerInterval': 1000,
      'timerFont': 'helvetica, verdana, arial, sans-serif',
      'timerCase': 'upper',
      'UTC' : true, // we use UTC by default. Change to false to use timezone detection
      'theme': 'dark' // 'dark', 'light'
    }, options);
    
    /***    Pass all the settings into an object so I can pass this on elsewhere
     *      and use more obvious names for the object attributes.  
     ***/
    var myTimer = new Object();
    myTimer.timerLocation = this; //"#timerArea";

    // countdown to:
    myTimer.timerYear = settings.year;
    myTimer.timerMonth = settings.month;
    myTimer.timerDay = settings.day;
    myTimer.timerHour = settings.hour;
    myTimer.timerMinute = settings.min;
    myTimer.timerSecond = settings.sec;
    
    //interval / time settings.
    myTimer.timerInterval = settings.timerInterval;
    myTimer.UTC = settings.UTC;

    // set up dimensions/ text settings:
    myTimer.timerTxtSize = settings.textSize;
    myTimer.timerTxtColor = settings.textColor;
    myTimer.timerFont = settings.timerFont;
    myTimer.timerWidth = settings.timerWidth;
    myTimer.timerSpacing = settings.textSpacing; // whitespace between our counters
    myTimer.textPadding = settings.textPadding; // padding for timerLocation
    myTimer.timerCase = settings.timerCase;
    
    // theme:
    myTimer.theme = settings.theme;
    // set up gradient class to take after:
        if(myTimer.theme == 'light') {
            myTimer.timerTxtColor = '#000000';
            myTimer.numberBgClass = 'jqTimerPluginNumbers jqTimerPluginNumbersLightTheme';
            }
        else {
             myTimer.numberBgClass = 'jqTimerPluginNumbers jqTimerPluginNumbersDarkTheme';
            }
    // optional flags
    myTimer.yearVisible = settings.yearVisible;
    myTimer.dayVisible = settings.dayVisible;

    /*****************  END SETUP OPTIONS ******************************/

        


       $(myTimer.timerLocation).css({
            fontSize: myTimer.timerTxtSize + "px",
            color: myTimer.timerTxtColor,
            fontFamily: myTimer.timerFont,
            padding: myTimer.areaPadding + "px"
            });
        
        // wtf javascript.
        myTimer.timerMonth--;
            
        // call it initially so we dont need to wait for the loop.
        jqTimerLogic(myTimer);
        
        // set the interval loop so that it does not wait to complete
        // before counting down for the next interval
        setInterval( function() {
            jqTimerLogic(myTimer);
            }, myTimer.timerInterval); // end interval loop
            
    };
})( jQuery );
/** end the jq block **/
/********************************************************************/

// functions needed    
function jqTimerLogic(myTimer) {
    // clear old timer values.
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
    //console.log((now.getTime() / 1000));
    //console.log("getTimezoneOffset():" + (now.getTimezoneOffset()));
    if(myTimer.UTC == true)
        var timeDiff = (d.getTime() - now.getTime()) / 1000; // milliseconds to seconds
    else
        var timeDiff = (d.getTime() - now.getTime() - (now.getTimezoneOffset() * 60 * 1000)) / 1000; // milliseconds to seconds
    
    var timerOVER = false;
    if(timeDiff <= 0)
        timerOVER = true;
    
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
    
    if(timerOVER) {
        yrsTill = 0;
        daysTill = 0;
        hrsTill = 0;
        minsTill = 0;
        secsTill = 0;
        $(myTimer.timerLocation).css('color', 'red');
    }
    
    // set the theme class:
    var gradientClass = myTimer.numberBgClass;
    
    // Format the timer:
    var addedStyles = "style='padding:" + myTimer.textPadding + "px;'";
    var tblBegin = "<table style='margin-left:auto;margin-right:auto;'>";
    var tblRowBegin = "<tr>";
    var tblCol = "<td class='" + gradientClass + "' " + addedStyles + ">";
    
    var tblColEnd = "</td>";
    var tblRowEnd = "</tr>";
    var tblEnd = "</table>";
    
    var spaces = "";
    for(var i = 0; i < myTimer.timerSpacing; i++) spaces += "&nbsp;";
    var spacing = "<td>"+ spaces + "</td>";
    var spacingTxt = "<td class='jqTimerPluginText jqTimerLessPadding'>" + spaces + "</td>";
    
    //for text:
    var tblTxtCol = "<td class='" + gradientClass + " jqTimerPluginText'" + addedStyles +">";
    var tblTxtColEnd = "</td>";
    
    // adding spaces.
    var spaces = "";
    for(var i = 0; i < myTimer.imgSpacing; i++) spaces += "&nbsp;";
    
    if(myTimer.yearVisible) {
        var yrHTML = tblCol + numToStyledDiv(yrsTill, false) + tblColEnd + spacing;
        }
    else
        var yrHTML = "";
    if(myTimer.dayVisible) {
        var dayHTML = tblCol + numToStyledDiv(daysTill, false)  + tblColEnd + spacing;
        }
    else
        var dayHTML = "";
        
    var hrsHTML = tblCol + numToStyledDiv(hrsTill, true)  + tblColEnd + spacing;
    var minsHTML = tblCol + numToStyledDiv(minsTill, true) + tblColEnd + spacing;
    var secsHTML = tblCol + numToStyledDiv(secsTill, true) + tblColEnd;
    
    if(myTimer.timerCase == 'lower') {
        if(myTimer.yearVisible) {
            var yrTXT = tblTxtCol + "years" + tblTxtColEnd + spacingTxt;
            }
        else
            var yrTXT = "";
        if(myTimer.dayVisible) {
            var dayTXT = tblTxtCol + "days" + tblTxtColEnd + spacingTxt;
            }
        else
            var dayTXT = "";
        var hrsTXT = tblTxtCol + "hours"  + tblTxtColEnd + spacingTxt;
        var minsTXT = tblTxtCol + "minutes" + tblTxtColEnd + spacingTxt;
        var secsTXT = tblTxtCol + "seconds" + tblTxtColEnd;
        }
    else {
        if(myTimer.yearVisible) {
            var yrTXT = tblTxtCol + "YEARS" + tblTxtColEnd + spacingTxt;
            }
        else
            var yrTXT = "";
        if(myTimer.dayVisible) {
            var dayTXT = tblTxtCol + "DAYS" + tblTxtColEnd + spacingTxt;
            }
        else
            var dayTXT = "";
        var hrsTXT = tblTxtCol + "HOURS"  + tblTxtColEnd + spacingTxt;
        var minsTXT = tblTxtCol + "MINUTES" + tblTxtColEnd + spacingTxt;
        var secsTXT = tblTxtCol + "SECONDS" + tblTxtColEnd;
        }
    
    $(myTimer.timerLocation).append(tblBegin + 
        tblRowBegin +
            yrHTML + 
            dayHTML + 
            hrsHTML + 
            minsHTML +
            secsHTML +
        tblRowEnd + 
        tblRowBegin +
            yrTXT +
            dayTXT +
            hrsTXT +
            minsTXT +
            secsTXT +
        tblRowEnd +
        tblEnd
        );
    }





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
