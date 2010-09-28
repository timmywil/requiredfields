/*!
*   jquery.requiredfields.js
*   timmy willison
*   Minimalist form validation for all browsers (IE6+, Firefox, Opera, Safari, Chrome)
*   Remember to write your own css for .invalid inputs
*   Add class 'reqd' to required fields.
*   Add class 'reqd-email' to required e-mail fields
*/

// *Version: 0.9, Last updated: 9/27/2010*
// 
// Demo         - Coming soon
// GitHub       - http://github.com/timmywil/requiredfields
// Source       - http://github.com/timmywil/requiredfields/raw/master/jquery.requiredfields.js (8kb)
// (Minified)   - http://github.com/timmywil/requiredfields/raw/master/jquery.requiredfields.min.js (4kb)
// 
// License
// 
// Copyright (c) 2010 timmy willison
// Dual licensed under the MIT and GPL licenses.
// http://timmywillison.com/license/
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
        return allGood;
        
        
        function validTag(thisTag) {
            var outClass   = "",
                allClasses = thisTag.className.split(" "),
                $thisTag   = $(thisTag);
            
            for( var j=0; j<allClasses.length; j++ ) {
                outClass += validBasedOnClass(allClasses[j]) + " ";
            }
        
            thisTag.className = outClass;
            
            if( outClass.indexOf("invalid") > -1 ) {
                $thisTag.prev('label').addClass('invalid');
                return false;
            }
            return true;
            
            function validBasedOnClass(thisClass) {
                var classBack = "";
                
                switch(thisClass) {
                    case "":
                    case "invalid":
                        break;
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
    }
    var rawForm = this[0];
    if (rawForm.tagName === "FORM")
        return validForm(rawForm);
    return false;
};

// A pre-made submit function
// Validate a form before it is sent
$.fn.validate = function () {
    return this.submit(function (e) {
        var $form = $(this),
            check = $form.checkForm();
        
        // Blur for any placeholders
        if ( !check ) {
            $form.find('input:text').blur();
        }
        return check;
    });
};

})(jQuery, this, document);