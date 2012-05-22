// A timer that uses jQuery only cause I'm lazy...

// Include the jQuery lib and 
// set a div to id='timerArea' and it will render
// a timer that counts down to the following date settings:


/*************** Set up your timer! *********************/
var imgTimer = new Object();

// countdown to:
timerLocation = "#timerArea2";
timerYear = 2012;
timerMonth = 07;
timerDay = 15;
timerHour = 15;
timerMinute = 30;
timerSecond = 0;

// set up dimensions:
timerHeight = 95;
timerWidth = 800;
imgHeight = 75; // max is 400.
imgSpacing = 5; // whitespace between our counters
areaPadding = 20; // padding for timerLocation

// optional flags
yearVisible = true;
dayVisible = true;

// what style to use?
imgFolder = "http://a-r-d.me/eleganttimer/baskerville"; // also try: "thin"
imgBackgoundColor = "#FCFCFC"; // eg: '#ffffff'

// image files.
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
/*****************  END SETUP OPTIONS ******************************/

            
            
$(document).ready( function() {
    startTimer();
}); // end ready wrapper.


hexArr =     ['0', '1', '2', '3', '4', '5', '6', '7', '8',
                        '9', 'a', 'b', 'c', 'd', 'e', 'f'];

function startTimer() {

   $(timerLocation).css({
        //position: 'relative',
        width: timerWidth + "px",
        height: timerHeight + "px",
        backgroundColor: imgBackgoundColor,
        padding: areaPadding + "px",
        borderRadius: "10px",
        border: "solid",
        borderWidth: "1px",
        borderColor: "#F1F1F1",
        boxShadow: "-5px -5px 5px #888",
        });
    
    // wtf javascript.
    timerMonth--;
        
    setInterval( function() {
        // clear old timer values
        $(timerLocation).empty();
        
        // prepare the dates
        var d = new Date(timerYear, timerMonth, timerDay, timerHour, timerMinute, timerSecond, 0);
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
        
        var spaces = "";
        for(var i = 0; i < imgSpacing; i++) spaces += "&nbsp;";
        
        
        if(yearVisible) {
            var yrHTML = "<img src='" + imgFolder + "/" + imgYear
            + "' height='" + imgHeight + "' />" 
            + numToImg(yrsTill, false) 
            + spaces;
            }
        else
            var yrHTML = "";
            
        if(dayVisible) {
            var dayHTML = "<img src='" + imgFolder + "/" + imgDay
            + "' height='" + imgHeight + "' />" 
            + numToImg(daysTill, false)
            + spaces;
            }
        else
            var dayHTML = "";
            
        var hrsHTML = "<img src='" + imgFolder + "/" + imgHour
            + "' height='" + imgHeight + "' />"
            + numToImg(hrsTill, true)
            + spaces;
        var minsHTML = "<img src='" + imgFolder + "/" + imgMin
            + "' height='" + imgHeight + "' />"
            + numToImg(minsTill, true)
            + spaces;
        var secsHTML = "<img src='" + imgFolder + "/" + imgSec
            + "' height='" + imgHeight + "' />"
            + numToImg(secsTill, true);
        
        
        //console.log(yrHTML);
        $(timerLocation).append("<div class='timerWrapper'>");
        $(timerLocation).append(yrHTML + 
            dayHTML + 
            hrsHTML + 
            minsHTML +
            secsHTML);
        }, 1000);
        $(timerLocation).append("</div>");
        
        $('.timerWrapper').css({
            position: "relative",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
            });
    }
    
    
function numToImg(nums, isTwoDigits) {
    // check if we need a zero in front
    if(isTwoDigits) {
        var numTemp = String(nums);
        var addZero = false;
        if(numTemp.length <= 1)
            addZero = true;
            
        var lenNum = numTemp.length;
        
        var html = "<img src='" + imgFolder + "/" + imgBracLeft 
            + "' height='" + imgHeight + "' />";
        if(addZero) 
            html += "<img src='" + imgFolder + "/" + imgNumArr[0] 
            + "' height='" + imgHeight + "' />";
        for(var i = 0; i < lenNum; i++) {
            html += "<img src='" + imgFolder + "/" + 
                imgNumArr[parseInt(numTemp.substring(i,i+1))] + 
                "' height='" + imgHeight + "' />";
            }
        html += "<img src='" + imgFolder + "/" + imgBracRight 
            + "' height='" + imgHeight + "' />";
        return html;
        }
    else {
        var numTemp = String(nums);
        var lenNum = numTemp.length;
        
        var html = "<img src='" + imgFolder + "/" + 
            imgBracLeft + "' height='" + imgHeight + "' />";
        for(var i = 0; i < lenNum; i++) {
            // select index from num array by:
               // 1: get current substring of num temp
               // 2: convert to int
               // 3: img href is retrieved from array via index.
            html += "<img src='" + imgFolder + "/" + 
                imgNumArr[parseInt(numTemp.substring(i,i+1))] 
                + "' height='" + imgHeight + "' />";
            }
        html += "<img src='" + imgFolder + "/" + imgBracRight 
            + "' height='" + imgHeight + "' />";
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
