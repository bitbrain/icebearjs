/**
 * IcebearJS plugin
 *
 * @author Miguel Gonzalez <miguel-gonzalez@gmx.de>
 * @since 0.0.1
 * @version 0.0.1
 */
 
// =========================================================
// Initialization: JQuery 
// =========================================================

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
    
        // =========================================================
        // Global data cache
        // =========================================================
        
        $.fn.dataManager = {
            
            dataCache : new Array(),
            
            /**
             * Checks if the url is already cached
             * 
             * @param {type} url url of the cache data
             */
            checkCache : function(url) {
                return typeof(this.dataCache[url]) !== 'undefined' && this.dataCache[url] !== null;
            },
                    
           /**
            * Saves data to the cache
            * 
            * @param {type} url url of the cache data
            * @param {type} data data itself
            */
            cacheData : function(url, data) {
            
                if (this.checkCache(url)) {
                    $.fn.dataCache[url] = data;
                }
            },
                 
            /**
             * Returns cached data
             * 
             * @param {type} url data url
             */
            getData : function(url) {
                return this.dataCache[url];
            }   
        };
        
        // =========================================================
        // Plugins
        // =========================================================
	
        $.fn.extend({
            
            /** IcebearProgress - Dynamical progress bar
             * 
             * @param {type} options options of the method
             * @returns {undefined} this
             */
            icebearProgress : function(options) {
                
                // =========================================================
                // Variables
                // =========================================================
                
                var defaults = {
                    datasource : "meta.json",
                    animated : true,
                    animationType : 'easeOutBounce',
                    duration : 1000,
                    onLeavePhase : function(element) {
                        
                    },
                    onEnterPhase : function(element) {
                        
                    },
                    internalCss : true
                };
                
                options = $.extend(true, {}, defaults, options);                
                htmlTarget = $(this);                
                animatedParts = 0;
                
                // =========================================================
                // Functions
                // =========================================================
                
                function addElement(target, caption, progress, cssClass) {
                        target.append('<div class="cell ' + cssClass + '"><div class="caption">' + caption + '</div></div>');
                        
                        element = target.find('.cell').last();
                        
                        element.css({
                            display :'table-cell',
                            textAlign: 'center'
                        });

                        element.progressbar({
                            value: progress
                        });
                }
                    
                function animateElement(data, index) {
                    target = data[index];                        
                    animationType = 'linear';
                    element = target.element;
                    duration = options.duration / animatedParts;

                    if (element.parent().hasClass('current')) {
                        animationType = options.animationType;
                    }

                    options.onEnterPhase(element.parent());
                    
                    element.animate({ width : target.width}, duration, animationType, function() {
                        if (element.width() > 0 && !element.parent().hasClass('current')) {
                            options.onLeavePhase(element.parent());
                        }

                        if (++index < animatedParts) {
                            animateElement(data, index);
                        }
                    });
                }

                function animate(target) {
                    if (options.animated) {
                        data = new Array();
                        index = 0;
                        oldHeight = target.find('.ui-progressbar-value').height();
                        target.find('.ui-progressbar-value').each(function() {
                            var currentWidth = $(this).width();
                            currentWidth -= parseInt($(this).css('marginRight'));   
                            data[index++] = {
                                element : $(this),
                                width : currentWidth
                            };


                            $(this).width(0);
                            $(this).css('height', oldHeight);
                        });

                        animateElement(data, 0);
                    }
                }


                function applyCSS(target) {
                    if (options.internalCss) {
                        target.find('.cell').css({
                           textAlign : "center" 
                        });

                        target.find('.ui-progressbar').css({
                           height : "1em",
                           textAlign : "center"
                        }).find('.ui-progressbar-value').css({
                           height : "100%",
                           display : "block"
                        });



                        element = target.find('.cell');

                        element.each(function() {

                            caption = $(this).find('.caption');
                            progress = $(this).find('.ui-progressbar-value');

                            caption.css({
                                marginBottom : -($(this).height())
                            });

                            newHeight = caption.outerHeight();
                            $(this).parent().height(newHeight);
                            progress.height(newHeight);
                            
                            caption.resize(function() {
                                applyCSS(target);
                            });

                            $(this).resize(function() {
                                applyCSS(target);
                            });
                        });
                    }
                }

                function buildHTML(target) {
                    
                    target.css({
                        display: "table",
                        width: '100%',
                        tableLayout : "fixed"
                    });
                    row = target.html('<div></div>').find('div');
                    row.css('display', 'table-row');
                    var pastPhase = false;
                    animatedParts = 0;
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

                        if (i === 0) {
                            cssClass += ' first';
                        } else if (i === options.phaselist.length  - 1) {
                            cssClass += ' last';
                        }

                        row.html(addElement(row, element, progress, cssClass));
                    }
                }
                
                function applyData(data) {
                    
                   $.each(data, function(key, value) {
                        var phaseList = new Array();
                        if (key !== 'phaselist') {
                            options[key] = value;                                    
                        } else {
                            $.each(value, function(key, value) {
                                phaseList.push(value);
                            });

                            options.phaselist = phaseList;
                        }
                    });
                    
                    // Save the data to the cache
                    $.fn.dataManager.cacheData(options.datasource, data);
                }
                
                function createUI() {
                    
                    if (options.length === null) {                        
                        htmlTarget.html(datasource + ' not found.');
                        return htmlTarget;
                    } else if (options.phaselist === null) {
                        htmlTarget.html(datasource + ' does not provide any phaselist');
                        return htmlTarget;
                    }           
                    
                    htmlTarget.each(function() {
                        
                        realTarget = $(this);
                        
                        buildHTML(realTarget);
                        applyCSS(realTarget);
                        animate(realTarget);

                        $(window).resize(function() {
                            htmlTarget.empty();
                            buildHTML(realTarget);
                            applyCSS(realTarget);
                            animate(realTarget);
                        });
                    
                    });
                    
                    return htmlTarget;
                }
                
                // =========================================================
                // Load data from Ajax
                // =========================================================
                
                if ($.fn.dataManager.checkCache(options.datasource)) {
                    applyData($.fn.dataManager.getData(options.datasource));
                    createUI();
                } else {                
                    return $.when($.ajax({
                            type: "GET",
                            url: options.datasource + "?callback=?",
                            dataType: "json",
                            crossDomain: true,
                            async:true,
                            jsonp: false,
                            success: applyData

                    // =========================================================
                    // Invoke meta data
                    // =========================================================

                    })).done(createUI);
                }
            }
        });
})(jQuery);