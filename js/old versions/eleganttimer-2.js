// A timer that uses jQuery only cause I'm lazy...

// Include the jQuery lib and 
// set a div to id='timerArea' and it will render
// a timer that counts down to the following date settings:

/*************** Set up your timer! *********************/
var myTimer = new Object();

// countdown to:
myTimer.timerLocation = "#timerArea";
myTimer.timerYear = 2012;
myTimer.timerMonth = 07;
myTimer.timerDay = 15;
myTimer.timerHour = 15;
myTimer.timerMinute = 30;
myTimer.timerSecond = 0;

// set up dimensions:
myTimer.timerTxtSize = 130;
myTimer.timerTxtColor = "#ffffff";
myTimer.timerWidth = 900;
myTimer.imgHeight = 75; // max is 400.
myTimer.imgSpacing = 1; // whitespace between our counters
myTimer.areaPadding = 20; // padding for timerLocation

// optional flags
myTimer.yearVisible = false;
myTimer.dayVisible = true;


// what style to use?
myTimer.imgFolder = "http://a-r-d.me/eleganttimer/baskerville"; // also try: "thin"
myTimer.imgBackgoundColor = "#000000"; // eg: '#ffffff'

// image files.
/*
imgBracLeft = "leftbrac-blk.png";
imgBracRight = "rightbrac-blk.png";
imgSec = "sec-blk.png";
imgMin = "min-blk.png";
imgHour = "hr-blk.png";
imgDay = "day-blk.png";
imgYear = "yr-blk.png";
imgNumArr = [   
    "0-blk.png",
    "1-blk.png",
    "2-blk.png",
    "3-blk.png",
    "4-blk.png",
    "5-blk.png",
    "6-blk.png",
    "7-blk.png",
    "8-blk.png",
    "9-blk.png"
    ];
    */
    
/*****************  END SETUP OPTIONS ******************************/

            
            
$(document).ready( function() {
    startTimer2();
}); // end ready wrapper.


hexArr =     ['0', '1', '2', '3', '4', '5', '6', '7', '8',
                        '9', 'a', 'b', 'c', 'd', 'e', 'f'];

function startTimer2() {

   $(myTimer.timerLocation).css({
        position: 'relative',
        width: myTimer.timerWidth + "px",
        fontSize: myTimer.timerTxtSize + "px",
        color: myTimer.timerTxtColor,
        backgroundColor: myTimer.imgBackgoundColor,
        padding: myTimer.areaPadding + "px",
        borderRadius: "25px",
        border: "solid",
        borderWidth: "1px",
        borderColor: "#F1F1F1",
        boxShadow: "-5px -5px 5px #888",
        });
    
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
        
        $(myTimer.timerLocation).append("<div class='timerWrapper'>" +
            yrHTML + 
            dayHTML + 
            hrsHTML + 
            minsHTML +
            secsHTML +
            "</div>"
            );
        }, 1000);
        
        $('.timerWrapper').css({
            height: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
            });
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
    
    
    
    
function numToImg(nums, isTwoDigits) {
    // check if we need a zero in front
    if(isTwoDigits) {
        var numTemp = String(nums);
        var addZero = false;
        if(numTemp.length <= 1)
            addZero = true;
            
        var lenNum = numTemp.length;
        
        var html = "<img src='" + myTimer.imgFolder + "/" + myTimer.imgBracLeft 
            + "' height='" + myTimer.imgHeight + "' />";
        if(addZero) 
            html += "<img src='" + myTimer.imgFolder + "/" + myTimer.imgNumArr[0] 
            + "' height='" + myTimer.imgHeight + "' />";
        for(var i = 0; i < lenNum; i++) {
            html += "<img src='" + myTimer.imgFolder + "/" + 
                myTimer.imgNumArr[parseInt(numTemp.substring(i,i+1))] + 
                "' height='" + imgHeight + "' />";
            }
        html += "<img src='" + myTimer.imgFolder + "/" + myTimer.imgBracRight 
            + "' height='" + myTimer.imgHeight + "' />";
        return html;
        }
    else {
        var numTemp = String(nums);
        var lenNum = numTemp.length;
        
        var html = "<img src='" + myTimer.imgFolder + "/" + 
            myTimer.imgBracLeft + "' height='" + myTimer.imgHeight + "' />";
        for(var i = 0; i < lenNum; i++) {
            // select index from num array by:
               // 1: get current substring of num temp
               // 2: convert to int
               // 3: img href is retrieved from array via index.
            html += "<img src='" + myTimer.imgFolder + "/" + 
                myTimer.imgNumArr[parseInt(numTemp.substring(i,i+1))] 
                + "' height='" + myTimer.imgHeight + "' />";
            }
        html += "<img src='" + myTimer.imgFolder + "/" + myTimer.imgBracRight 
            + "' height='" + myTimer.imgHeight + "' />";
        return html;
        }
    }
    

function addZeros(nums) {
    nums = String(nums);
    if(nums.length <= 1)
        nums = "0" + nums;
    return nums;
    }

function generateSpan(yrsTill) {
    var newClr = "#";
        for(var i=0; i < 6; i++) {
            var hex = Math.round(Math.random() * (hexArr.length - 1));
            newClr = newClr + hexArr[hex];
            }
    var style = "style='color:" + newClr + ";'";
    var yrs = "<span " + style + ">" + yrsTill + "</span>";
    return yrs;
    }
