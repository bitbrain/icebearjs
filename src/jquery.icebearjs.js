/**
 * IcebearJS plugin
 *
 * @author Miguel Gonzalez <miguel-gonzalez@gmx.de>
 * @since 0.0.1
 * @version 0.0.1
 */
 
 /* Initialization: JQuery */
 
var jQueryScriptOutputted = false;

function initJQuery() {
    
    //if the jQuery object isn't available
    if (typeof(jQuery) === 'undefined') {
    
    
        if (! jQueryScriptOutputted) {
            //only output the script once..
            jQueryScriptOutputted = true;
            
            //output the script (load it from google api)
            document.write("<script type=\"text/javascript\" src=\"//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js\"></script>");
        }        
    }            
}

initJQuery();
 
(function ($) {
	
        $.fn.extend({ 
            
            icebearJS : function(options) {
                
                // Merge passed in options with defaults
                options = $.extend({}, {
                    datasource : 'meta.xml',
                    phase : new Array('dev', 'alpha', 'beta', 'release'),
                }, options);
                
                $(this).html('Hello World!');
                $(this).css('background-color', 'black');                
            }
        });
})(jQuery);





