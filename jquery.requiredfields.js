/*!
*   jquery.requiredfields.js + HTML5 placeholders
*   timmy willison
*   Minimalist form validation for all browsers (IE6+, Firefox, Opera, Safari, Chrome)
*   HTML5 placeholders across all browsers
*   Remember to write your own css for .invalid inputs
*   Add class 'reqd' to required fields.
*   Add class 'reqd-email' to required e-mail fields
*/

// *Version: 1.0, Last updated: 9/23/2010*
// 
// Demo         - Coming soon
// GitHub       - http://github.com/timmywil/requiredfields
// Source       - http://github.com/timmywil/requiredfields/raw/master/requiredfields.js (8kb)
// (Minified)   - http://github.com/timmywil/password123/raw/master/requiredfields.min.js (4kb)
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
        var allGood = true;
        var allTags = form.getElementsByTagName("*");

        for ( var i=0; i<allTags.length; i++ )
            if( !validTag(allTags[i]) )
                allGood=false;
        return allGood;
        
        
        function validTag(thisTag) {
            var outClass   = "";
            var allClasses = thisTag.className.split(" ");
            
            for( var j=0; j<allClasses.length; j++ ) {
                outClass += validBasedOnClass(allClasses[j]) + " ";
            }
        
            thisTag.className = outClass;
            
            if( outClass.indexOf("invalid") > -1 ) {
                $(thisTag).prev('label').addClass('invalid');
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
                        if( v === "" || v === "NONE" || v === $(thisTag).data('placeholder') ) {
                            classBack = "invalid ";
                            
                            // Account for elect plugin
                            if ( thisTag.nodeName === "SELECT" ) {
                                $(thisTag).closest('div.elect-container').addClass('invalid');
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
        var check = $(this).checkForm();
        
        // Blur for placeholders
        if ( !check ) {
            $(this).find('input:text').blur();
        }
        return check;
    });
};

// Use the HTML5 placeholder attribute at all times.
// Validation will check that the placeholder is not
// still the value sent if field is required
$.fn.outOfPlace = function (opts) {

    opts = $.extend({

        // Gives you control over the submit function if needed
        // The default function removes the placeholder before
        // submitting the form in case the field is not required client-side
        submit: function () {
            $(this).find('input, textarea').each(function () {
                var $input = $(this);
                if($input.val() == $input.data('placeholder'))
                    $input.val('');
            });
            return true;
        },

        // The placeholder class for setting
        // placeholder styles in your own css
        // e.g. input.place { color: #666666; }
        // This creates a lot more flexibility for you and
        // keeps the js lightweight
        placeholderClass: 'place'
    }, opts);

    return this.addClass(opts.placeholderClass).each(function () {
        var input       = $(this);
        var defaultText = input.attr('placeholder') || '';

        // Set the placeholder data for future reference
        input.data('placeholder', defaultText);

        // Attribute no longer needed
        input.removeAttr('placeholder');

        // Set the value if field is empty
        if ($.trim(input.val()) === '')
            input.val(defaultText);

        // Focus and blurs, notice the class added and removed
        input.focus(function () {
            if (input.val() == defaultText) {
                input.val('').removeClass(opts.placeholderClass);
            }
        }).blur(function () {
            if ($.trim(input.val()) === '') {
                input.val(defaultText).addClass(opts.placeholderClass);
            }
        })
        // Bind the submit function
        .closest('form').submit(opts.submit);
    });
};

})(jQuery, this, document);