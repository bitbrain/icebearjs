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
            icebearProgress : function(options) {
                
                var defaults = {
                    datasource : "meta.xml",
                    animated : true,
                    animationType : 'easeOutBounce',
                    duration : 2000
                };
                
                options = $.extend(true, {}, defaults, options);                
                htmlTarget = $(this);                
                animatedParts = 0;
                
                // LOAD FROM AJAX
                $.when($.ajax({
                        type: "GET",
                        url: options.datasource,
                        dataType: "xml",
                        success: function(xml) {
                            
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
                        
                        element.append(caption);
                    }
                    
                    function animateElement(data, index) {
                        target = data[index];                        
                        animationType = 'linear';
                        element = target.element;
                        duration = options.duration / animatedParts;
                        
                        if (element.parent().hasClass('current')) {
                            animationType = 'easeOutBounce';
                        }
                        
                        element.animate({ width : target.width}, duration, animationType, function() {
                            if (index < data.length) {
                                animateElement(data, ++index);
                            }
                        });
                    }
                    
                    function animate(target) {
                        
                        data = new Array();
                        index = 0;
                        $('.ui-progressbar-value').each(function() {
                            var val = $('.ui-progressbar-value').first();
                            var currentWidth = $(this).width();
                            currentWidth -= parseInt($(this).css('marginRight'));   
                            data[index++] = {
                                element : $(this),
                                width : currentWidth
                            };
                            
                             $(this).css('width', 0);
                        });
                        
                        animateElement(data, 0);
                    }

                    function buildHTML(target) {
                        target.css({
                            display: "table",
                            width: "100%",
                            tableLayout : "fixed"
                        });
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
                                animatedParts++;
                            } else if (pastPhase) {
                                progress = 0;
                                cssClass = 'open';
                            } else {
                                animatedParts++;
                            }
                            
                            row.html(addElement(row, element, progress, cssClass));
                        }
                    }

                    buildHTML(htmlTarget);
                    animate(htmlTarget);
                    
                    return htmlTarget;
                });
            }
        });
})(jQuery);





