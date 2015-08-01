Note from 2015
==================

This is a kind-of old and crappy JavaScript project that was meant to be used for "under construction" landing pages. I actually just wrote it for fun in order to learn how to make a jQuery plugin. I think if I was to do this over as a more mature programmer I would use canvas rather than nested HTML elements and tons of CSS. Anyway, I will keep this around to see my progress but please don't judge my current work by this old crap.


Description:
===============
jQuery countdown timer plugin. Has full documentation, theme, example usage and templates, IE7 compatible. Lightweight.


Full tutorial/ guide:
=======================
load index.html in your browser and quit reading this!
    

Templates:
==========
    1. template1.html  (dark theme)
    2. template2.html  (light theme)
    3. template-bonus.html (zombie theme)
    

Required files (no images required!!):
======================================
    1. css/jquery-simplecountdown.css
    2. js/jquery-simplecountdown.css
    3. The latest version of jQuery e.g: 
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>


Usage: 
==========
Works like a normal jQuery plugin:
$('#divIdforCountdown').simpleCountdown({
        'year' : 2013,  // put in the date you want to countdown too!
        'month': 07,    // 1-12
        'day'  : 15,    // whatever is approriate for the month
        'hour' : 15,    // 24 hour clock!
        'min'  : 15,
        'sec'  : 15
        });


Compatabilty:
=============
1. google chrome latest.
2. firefox 3+
3. I.E. 7+ (not tested on 6, but may be working fine).
4. safari latest.
5. not tested on Opera.

Known issues:
=============
I.E. has limited CSS3 capabilities. Therefore things like gradients 
and border-radius effects will be diminished.
    
    








Copy for Code Canyon:
    
    Simple Countdown is a lightweight jQuery plugin countdown timer that requires the use
of only one JavaScript file and one CSS file (in addition to the jQuery 
library of course). With no images required, this is the lightest timer plugin
around. With Simple Countdown you can include multiple countdowns
on one page, customize theme, spacing, size, color, font and more. You can
let the timer use UTC (default) or JavaScript's built in timezone detection.

    Simple countdown includes:
        -A customizable dark theme.
        -A customizable light theme.
        -A template modeled around the dark theme.
        -A template modeled around the light theme.
        -A zombie apocalypse template.
        
    Simple countdown also comes with a full tutorial showing all of the features
and options that can be called when you initialize the plugin. I include 
a basic walk-through for using jQuery/ jQuery plugins. JQuery is nothing 
more than a Javascript library that makes your life easier, and it is extensible
which makes it easy to build plugins based around jQuery.
        
    Simple countdown is compatible in all of the modern browsers as well
as quite a few legacy browsers, albeit with diminished CSS effects.

    Simple Countdown has been tested in:
        -I.E. 9, 8, 7
        -Firefox 3.X +
        -Safari
        -Google Chrome
        -iPhone/ iTouch mobile browser.
        
