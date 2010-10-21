/*!
*   jquery.requiredfields.js v1.0
*   Minimalist form validation for all browsers (IE6+, Firefox, Opera, Safari, Chrome)
*   Copyright (c) 2010 timmy willison
*   Dual licensed under the MIT and GPL licenses.
*   http://timmywillison.com/licence/
*/

// *Version: 1.0, Last updated: 9/30/2010*
// 
// Demo         - http://timmywillison.com/samples/requiredfields/
// GitHub       - http://github.com/timmywil/requiredfields
// Source       - http://github.com/timmywil/requiredfields/raw/master/jquery.requiredfields.js (4.3kb)
// (Minified)   - http://github.com/timmywil/requiredfields/raw/master/jquery.requiredfields.min.js (1.3kb)
// 
// License
// 
// Copyright (c) 2010 timmy willison
// Dual licensed under the MIT and GPL licenses.
// http://timmywillison.com/licence/
// 
// Support and Testing
// 
// Versions of jQuery and browsers this was tested on.
// 
// jQuery Versions - 1.3.0-1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.7, Safari 3-5,
//                   Chrome 4-5, Opera 9.6-10.5.
// 
// Release History
// 
// 1.0   - (9/30/2010) Add individual field validation
// 0.9   - (9/23/2010) Initial release
// 
// See README for usage

(function ($, window, document, undefined) {

// Expects only one form because the return
// value is true or false
// You can use this separately in your own submit functions if needed
$.fn.checkForm = function () {
    function validForm(form) {
        var allGood = true,
            allTags = form.getElementsByTagName("*");

        for ( var i=0; i<allTags.length; i++ )
            if( !validTag(allTags[i]) )
                allGood=false;
        
        // Blur for placeholders
        if ( !allGood ) {
            $(form).find('input:text').blur();
        }
        return allGood;
    }
    var rawForm = this[0];
    if (rawForm && rawForm.tagName === "FORM")
        return validForm(rawForm);
    return false;
};

// Check an individual field
// Expects only one field, return value is a boolean
$.fn.checkField = function() {
    return validTag(this[0]);
}

// A pre-made submit function
// Validate a form before it is sent
$.fn.validate = function () {
    return this.submit(function (e) {
        return $(this).checkForm();
    });
};

// The magic, validates a field
function validTag(thisTag) {
    var outClass   = "",
        allClasses = thisTag.className.split(" "),
        $thisTag   = $(thisTag);
    
    // Check all of the field's classes
    for( var j=0; j<allClasses.length; j++ ) {
        outClass += validBasedOnClass(allClasses[j]) + " ";
    }

    thisTag.className = outClass;
    
    // Add invalid class to a nearby label
    if( outClass.indexOf("invalid") > -1 ) {
        $thisTag.prev('label').addClass('invalid');
        return false;
    }
    return true;
    
    function validBasedOnClass(thisClass) {
        var classBack = "";
        
        switch(thisClass) {
            
            // Don't do anything
            case "":
            case "invalid":
                break;
            
            // Regular required field
            case "reqd":
                var v = $.trim(thisTag.value);
                
                // Also check if the field's value is the same as its placeholder
                if( v === "" || v === "NONE" || v === $thisTag.data('placeholder') ) {
                    classBack = "invalid ";
                    
                    // Account for elect plugin
                    if ( thisTag.nodeName === "SELECT" ) {
                        $thisTag.closest('div.elect-container').addClass('invalid');
                    }
                }
                classBack += thisClass;
                break;
            
            // Required email
            case "reqd-email":
            
                // Must be a valid email address
                var v = $.trim(thisTag.value);
                var emailPattern = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                if(!emailPattern.test(v))
                    classBack = "invalid ";
                classBack += thisClass;
                break;
            default:
                classBack += thisClass;
        }
        return classBack;
    }
}

})(jQuery, this, document);