jquery.requiredfields.js<br/>
timmy willison

*Minimalistic form validation for all browsers (IE6+, Firefox, Opera, Safari, Chrome)*<br/>

*Version: 0.9, Last updated: 9/23/2010*

Demo         - <a href="http://timmywillison.com/samples/requiredfields/"></a><br/>
GitHub       - <a href="http://github.com/timmywil/requiredfields">http://github.com/timmywil/requiredfields</a><br/>
Source       - <a href="http://github.com/timmywil/requiredfields/raw/master/jquery.requiredfields.js">http://github.com/timmywil/requiredfields/raw/master/jquery.requiredfields.js</a> (8kb)<br/>
(Minified)   - <a href="http://github.com/timmywil/requiredfields/raw/master/jquery.requiredfields.min.js">http://github.com/timmywil/requiredfields/raw/master/jquery.requiredfields.min.js</a> (4kb)</br/>

License

Copyright (c) 2010 timmy willison<br/>
Dual licensed under the MIT and GPL licenses.<br/>
<a href="http://timmywillison.com/license/">http://timmywillison.com/license/</a>

Support and Testing

Versions of jQuery and browsers this was tested on.

jQuery Versions - 1.3.0-1.4.2
Browsers Tested - Internet Explorer 6-8, Firefox 2-3.7, Safari 3-5, <br/>
Chrome 4-5, Opera 9.6-10.5.

Release History

0.9   - (9/23/2010) Initial release

<h1>PURPOSE OF THIS VALIDATION PLUGIN</h1>

To provide the most often needed requirements for client-side validation without getting bogged down in a ton of useful, but often unnecessary, form validation like the most popular plugins. At least for me, I like download sizes to be small.  If I don't use it, I don't want it.  I handle emails, text inputs, and select fields.  Need radio buttons and/or checkboxes?  Doing those yourself saves me space.

<h1>VALIDATION USAGE</h1>

Initialize:
<pre>
$('form').validate();
</pre>

.validate() simply applies a pre-made submit function to the selected form(s).  You may also use <pre>$('form').checkForm();</pre> in your own submit function instead.<br/>
checkForm() takes at most 1 form and returns a boolean indicating whether the form is valid.<br/>
It is the same function that applies the invalid classes to invalid fields.

Write your own css for .invalid inputs:
<pre>
.invalid {
    color: red !important;
}
</pre>

Add class 'reqd' to required text and select fields:
<pre>
&lt;input type=&quot;text&quot; class=&quot;reqd&quot;/&gt;
&lt;select class=&quot;reqd&quot;&gt;
  &lt;option value=&quot;&quot;&gt;Pick Something&lt;/option&gt;
  &lt;option value=&quot;Barn&quot;&gt;Yard&lt;/option&gt;
&lt;/select&gt;
</pre>

Add class 'reqd-email' to required e-mail fields:
<pre>
&lt;input type=&quot;text&quot; class=&quot;reqd-email&quot;/&gt;
&lt;input type=&quot;email&quot; class=&quot;reqd-email&quot;/&gt;
</pre>

All the validation does is add class required to empty text fields, 
select fields with value "NONE", and email fields with absent or invalid email addresses.
It is the responsibility of the user to make invalid states look how they should.
