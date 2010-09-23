jquery.requiredfields.js + HTML5 placeholders<br/>
timmy willison

*Minimalist form validation for all browsers (IE6+, Firefox, Opera, Safari, Chrome)*<br/>
*HTML5 placeholders across all browsers*

*Version: 1.0, Last updated: 9/23/2010*

Demo         - Coming soon<br/>
GitHub       - <a href="http://github.com/timmywil/requiredfields">http://github.com/timmywil/requiredfields</a><br/>
Source       - <a href="http://github.com/timmywil/requiredfields/raw/master/requiredfields.js">http://github.com/timmywil/requiredfields/raw/master/requiredfields.js</a> (8kb)<br/>
(Minified)   - <a href="http://github.com/timmywil/password123/raw/master/requiredfields.min.js">http://github.com/timmywil/password123/raw/master/requiredfields.min.js</a> (4kb)</br/>

License

Copyright (c) 2010 timmy willison<br/>
Dual licensed under the MIT and GPL licenses.<br/>
http://timmywillison.com/license/

Support and Testing

Versions of jQuery and browsers this was tested on.

jQuery Versions - 1.3.0-1.4.2
Browsers Tested - Internet Explorer 6-8, Firefox 2-3.7, Safari 3-5, <br/>
Chrome 4-5, Opera 9.6-10.5.

Release History

0.9   - (9/23/2010) Initial release

<h1>PURPOSE OF VALIDATION</h1>

The purpose of the validation plugin is to provide the most often needed requirements for client-side validation without getting bogged down in a ton of useful, but often unnecessary, form validation like the most popular plugins. For common front-end development, you usually don't need more than this and there's no point in making the user download the extra javascript. This plugin is also light on its dependency on jQuery and uses raw javascript where possible, making it quite fast.

<h1>VALIDATION USAGE</h1>

Initialize:
<pre>
$('form').validate();
</pre>

.validate() simply applies a pre-made submit function to the selected form(s).  You may also use $('form').checkForm() in your own submit function instead.  checkForm() takes at most 1 form and returns a boolean indicating whether the form is valid.  It is the same function that applies the invalid classes to invalid fields.

Write your own css for .invalid inputs:
<pre>
.invalid {
    color: red !important;
}
</pre>

Add class 'reqd' to required text and select fields:
<pre>
&lt;input type=&quot;text&quot; class=&quot;reqd&quot;/&gt;
</pre>

Add class 'reqd-email' to required e-mail fields:
<pre>
&lt;input type=&quot;text&quot; class=&quot;reqd-email&quot;/&gt;
</pre>

All the validation does is add class required to empty text fields, 
select fields with value "NONE", and email fields with absent or invalid email addresses.
It is the responsibility of the user to make invalid states look how they should.


<h1>PURPOSE OF HTML5 PLACEHOLDER PLUGIN</h1>

The purpose of this plugin is to be able to put your placeholders in the HTML5 placeholder attribute and have it work in IE6.  There are several advantages to this.  First, you get to use HTML5.  Second, you can insert values (perhaps you already know what the value of a field should be) into the value attribute without it getting treated like a placeholder by some function you wrote to fake placeholders.  Third, this plugin has even more functionality than the default HTML5 placeholder attribute.  It gives you a class to add placeholder styles.  By default, Safari and Firefox have different default colors for placeholders.  With this plugin, you simply put what color you want placeholder text to be in your own css without worrying about browser-specific selectors.  Plus, you can add other styles when that class is present (which is when the field is blurred).

<h1>PLACEHOLDER USAGE</h1>

<pre>
$('input:text').outOfPlace();
</pre>

Options:
<pre>
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
</pre>
  
Then, your html for all browsers will look like this:
<pre>
&lt;input type=&quot;text&quot; placeholder=&quot;Name&quot;/&gt;
</pre>

<h2>PURPOSE FOR HAVING THESE PLUGINS TOGETHER</h2>

The validation plugin will check that the placeholder is not
still the value sent if the field is required.

Regardless, you can use either plugin separately.