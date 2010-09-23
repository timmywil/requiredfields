jquery.requiredfields.js + HTML5 placeholders
timmy willison

*Minimalist form validation for all browsers (IE6+, Firefox, Opera, Safari, Chrome)*
*HTML5 placeholders across all browsers*

*Version: 1.0, Last updated: 9/23/2010*

Demo         - http://timmywillison.com/samples/requiredfields/
GitHub       - http://github.com/timmywil/requiredfields
Source       - http://github.com/timmywil/requiredfields/raw/master/requiredfields.js (8kb)
(Minified)   - http://github.com/timmywil/password123/raw/master/requiredfields.min.js (4kb)

License

Copyright (c) 2010 timmy willison
Dual licensed under the MIT and GPL licenses.
http://timmywillison.com/license/

Support and Testing

Versions of jQuery and browsers this was tested on.

jQuery Versions - 1.3.0-1.4.2
Browsers Tested - Internet Explorer 6-8, Firefox 2-3.7, Safari 3-5,
                  Chrome 4-5, Opera 9.6-10.5.

Release History

0.9   - (9/23/2010) Initial release

::::::::::::PURPOSE OF VALIDATION:::::::::::::::

<pre><code>
The purpose of the validation plugin is to provide the most often needed requirements for client-side validation without getting bogged down in a ton of useful, but often unnecessary, form validation like the most popular plugins. For common front-end development, you usually don't need more than this and there's no point in making the user download the extra javascript. This plugin is also light on its dependency on jQuery and uses raw javascript where possible, making it quite fast.
</code></pre>

:::::::::::VALIDATION USAGE:::::::::::::::::::

Initialize:
<pre><code>
$('form').validate();
</pre></code>

.validate() simply applies a pre-made submit function to the selected form(s).  You may also use $('form').checkForm() in your own submit function instead.  checkForm() takes at most 1 form and returns a boolean indicating whether the form is valid.  It is the same function that applies the invalid classes to invalid fields.

Write your own css for .invalid inputs:
<pre><code>
.invalid {
    color: red !important;
}
</pre></code>

Add class 'reqd' to required text and select fields:
<pre><code>
<input type="text" class="reqd"/>
</pre></code>

Add class 'reqd-email' to required e-mail fields:
<pre><code>
<input type="text" class="reqd-email"/>
</code></pre>

All the validation does is add class required to empty text fields, 
select fields with value "NONE", and email fields with absent or invalid email addresses.
It is the responsibility of the user to make invalid states look how they should.


::::::::::::::PURPOSE OF HTML5 PLACEHOLDER PLUGIN::::::::::::

The purpose of this plugin is to be able to put your placeholders in the HTML5 placeholder attribute and have it work in IE6.  There are several advantages to this.  First, you get to use HTML5.  Second, you can insert values (perhaps you already know what the value of a field should be) into the value attribute without it getting treated like a placeholder by some function you wrote to fake placeholders.  Third, this plugin has even more functionality than the default HTML5 placeholder attribute.  It gives you a class to add placeholder styles.  By default, Safari and Firefox have different default colors for placeholders.  With this plugin, you simply put what color you want placeholder text to be in your own css.  Plus, you can add other styles when that class is present (which is when the field is blurred).

::::::::::::::::PLACEHOLDER USAGE:::::::::::::::::::
<pre><code>
$('input:text').outOfPlace();
</pre></code>

Options:
<pre><code>
$('input:text').outOfPlace({
    
    // Gives you control over the submit function if needed
    // The default function removes the placeholder before
    // submitting the form in case the field is not required client-side
    // This takes care of interfering with any server validation
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
});
</pre></code>
  
Then, your html for all browsers will look like this:
<pre><code>
  <input type="text" placeholder="Name"/>
</pre></code>

::::::::::::::::PURPOSE FOR HAVING THESE PLUGINS TOGETHER:::::::::::::::

The validation plugin will check that the placeholder is not
still the value sent if the field is required.

Regardless, you can use either plugin separately.