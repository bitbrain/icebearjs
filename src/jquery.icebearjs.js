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
            
            /** IcebearProgress - Dynamical progress bar
             * 
             * @param {type} options options of the method
             * @returns {undefined} this
             */
            icebearProgress : function(datasource) {
                
                htmlTarget = $(this);
                
                // DEFAULT OPTIONS
                options = null;
                
                // LOAD FROM AJAX
                $.when($.ajax({
                        type: "GET",
                        url: datasource,
                        dataType: "xml",
                        success: function(xml) {
                            
                            options = new Object();
                            
                            $(xml).find('resource').each(function() {
                                var id = $(this).attr('id');
                                var phaseList = new Array();
                                if (id !== 'phaselist') {
                                    options[id] = $(this).text();
                                } else {
                                    $(this).find('phase').each(function() {
                                        phaseList.push($(this).text());
                                    });
                                    
                                    options.phaselist = phaseList;
                                }
                            });
                        }
                        
                // INVOKE META DATA
                })).done(function() {
                    
                    if (options.length === null) {                        
                        htmlTarget.html(datasource + ' not found.');
                        return htmlTarget;
                    } else if (options.phaselist === null) {
                        htmlTarget.html(datasource + ' does not provide any phases');
                        return htmlTarget;
                    }
                    
                   

                    function addElement(target, caption, progress, cssClass) {
                        target.append('<div class="cell ' + cssClass + '"></div>');
                        
                        element = target.find('.cell').last();
                        element.css({
                            display :'table-cell',
                            textAlign: 'center'
                        });

                        element.progressbar({
                            value: progress
                        });
                        
                        element.append('<span class="label">' + caption + '</span>');
                        label = element.find('span.label').last();
                        height = (element.height() - label.height()) / 2;
                        value = parseInt(parseInt(element.offset().top) + height);
                        label.css({
                            position: "fixed",
                            verticalAlign: "middle",
                            top: value
                        });
                    }

                    function buildHTML(target) {
                        target.css('display', 'table');
                        target.css('width', '100%');
                        row = target.html('<div></div>').find('div');
                        row.css('display', 'table-row');
                        var pastPhase = false;
                        
                        for (var i = 0; i < options.phaselist.length; ++i) {
                            element = options.phaselist[i];
                            
                            var progress = 100;
                            var cssClass = 'reached';
                            
                            if (element === options.phase) {
                                progress = parseInt(options.progress);
                                pastPhase = true;
                                cssClass = 'current';
                            } else if (pastPhase) {
                                progress = 0;
                                cssClass = 'open';
                            }
                            
                            row.html(addElement(row, element, progress, cssClass));
                        }
                    }

                    buildHTML(htmlTarget);

                    return htmlTarget;
                });
            }
        });
})(jQuery);





