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


        if (!jQueryScriptOutputted) {
            //only output the script once..
            jQueryScriptOutputted = true;

            //output the script (load it from google api)
            document.write("<script type=\"text/javascript\" src=\"//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js\"></script>");
        }
    }
}

initJQuery();

(function($) {

    // =========================================================
    // Global data cache
    // =========================================================

    $.fn.dataManager = {
        dataCache: new Array(),
        /**
         * Checks if the url is already cached
         * 
         * @param {type} url url of the cache data
         */
        checkCache: function(url) {
            return typeof(this.dataCache[url]) !== 'undefined' && this.dataCache[url] !== null;
        },
        /**
         * Saves data to the cache
         * 
         * @param {type} url url of the cache data
         * @param {type} data data itself
         */
        cacheData: function(url, data) {

            if (!this.checkCache(url)) {
                this.dataCache[url] = data;
            }
        },
        /**
         * Returns cached data
         * 
         * @param {type} url data url
         */
        getData: function(url) {
            return this.dataCache[url];
        }
    };

    $.fn.loadPlugin = function(datasource, target, buildHTML, applyCSS, animate) {
        
        function createUI(htmlTarget) {

                htmlTarget.each(function() {
                    var realTarget = $(this);

                    buildHTML(realTarget);
                    
                    $(window).load(function() {
                        applyCSS(realTarget);
                        animate(realTarget);
                    });

                    $(window).resize(function() {
                        htmlTarget.empty();
                        buildHTML(realTarget);
                        applyCSS(realTarget);
                        animate(realTarget);
                    });

                });

                return htmlTarget;
        }
        
        if ($.fn.dataManager.checkCache(datasource)) {
            createUI(target);
        } else {
            $.when($.ajax({
                type: "GET",
                url: datasource + "?callback=?",
                dataType: "json",
                crossDomain: true,
                async: false,
                jsonp: false,
                success: function(data) {
                    $.fn.dataManager.cacheData(datasource, data);
                }

                // =========================================================
                // Invoke meta data
                // =========================================================

            })).done(createUI(target));
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
        icebearProgress: function(options) {

            // =========================================================
            // Variables
            // =========================================================

            var defaults = {
                datasource: "meta.json",
                animated: true,
                animationType: 'easeOutBounce',
                duration: 1000,
                onLeavePhase: function(element) {

                },
                onEnterPhase: function(element) {

                },
                internalCss: true
            };

            options = $.extend(true, {}, defaults, options);
            var htmlTarget = $(this);
            var animatedParts = 0;
            var dataManager = $.fn.dataManager;

            // =========================================================
            // Functions
            // =========================================================

            function addElement(target, caption, progress, cssClass) {
                target.append('<div class="cell ' + cssClass + '"><div class="caption">' + caption + '</div></div>');

                var element = target.find('.cell').last();

                element.css({
                    display: 'table-cell',
                    textAlign: 'center'
                });

                element.progressbar({
                    value: progress
                });
            }

            function animateElement(data, index) {
                var target = data[index];
                var animationType = 'linear';
                var element = target.element;
                var duration = options.duration / animatedParts;

                if (element.parent().hasClass('current')) {
                    animationType = options.animationType;
                }

                options.onEnterPhase(element.parent());

                element.animate({width: target.width}, duration, animationType, function() {
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
                    var data = new Array();
                    var index = 0;
                    var oldHeight = target.find('.ui-progressbar-value').outerHeight();
                    target.find('.ui-progressbar-value').each(function() {
                        var currentWidth = $(this).width();
                        currentWidth -= parseInt($(this).css('marginRight'));
                        data[index++] = {
                            element: $(this),
                            width: currentWidth
                        };


                        $(this).width(0);
                        $(this).height(oldHeight);
                    });

                    animateElement(data, 0);
                }
            }


            function applyCSS(target) {
                if (options.internalCss) {
                    target.find('.cell').css({
                        textAlign: "center"
                    });

                    target.find('.ui-progressbar').css({
                        height: "1em",
                        textAlign: "center"
                    }).find('.ui-progressbar-value').css({
                        height: "100%",
                        display: "block"
                    });



                    var element = target.find('.cell');
                    element.each(function() {

                        var caption = $(this).find('.caption');
                        var progress = $(this).find('.ui-progressbar-value');
                        var height = caption.innerHeight();
                        
                        progress.css({
                            height : height,
                            marginTop: -height
                        });
                        
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
                    tableLayout: "fixed"
                });
                var row = target.html('<div></div>').find('div');
                row.css('display', 'table-row');
                var pastPhase = false;
                animatedParts = 0;
                var data = dataManager.getData(options.datasource);
                var phaseList = data.phaselist;
                
                for (var i = 0; i < phaseList.length; ++i) {
                    var element = phaseList[i];

                    var progress = 100;
                    var cssClass = 'reached';

                    if (element === data.phase) {
                        progress = parseInt(data.progress);
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
                    } else if (i === data.phaselist.length - 1) {
                        cssClass += ' last';
                    }

                    row.html(addElement(row, element, progress, cssClass));
                }
            }

            

            // =========================================================
            // Load plugin
            // =========================================================

            $.fn.loadPlugin(options.datasource, 
                            htmlTarget, 
                            buildHTML, 
                            applyCSS, 
                            animate);
        },
        /** IcebearPatch - Dynamical patch notes
         * 
         * @param {type} options options of the method
         * @returns {undefined} this
         */
        icebearPatch: function(options) {

            // =========================================================
            // Variables
            // =========================================================

            var defaults = {
                datasource: "meta.json",
                version: true,
                description: true
            };

            options = $.extend(true, {}, defaults, options);
            var htmlTarget = $(this);
            var data = $.fn.dataManager.getData(options.datasource)['patchnotes'];
            
            if (typeof(data) === 'undefined') {
                htmlTarget.html('patchnotes not found.');
                return htmlTarget;
            }

            // =========================================================
            // Functions
            // =========================================================
            
            function generatePatchModule(c, content) {
                if (typeof(content) !== 'undefined' && content !== null) {
                    return '<div class="' + c + '">' + content + '</div>';
                } else {
                    return '';
                }
            }
            
            function generatePatchInfo(data) {
                
                var info = '<div class="category">' + data.caption + '</div>';
                
                info += "<ul>";
                
                for (var i = 0; i < data.content.length; ++i) {
                    var element = data.content[i];
                    
                    info += '<li class="' + element.type + '">' + element.description + '</li>';
                }
                
                info += '</ul>';
                
                return info;
            }
                        
            function generatePatch(data) {
                
                var patch = '<div class="patch">';
                var patchData = data.patch;
                
                patch += generatePatchModule('name', data.name);
                patch += generatePatchModule('version', 'Version ' + data.version);
                patch += generatePatchModule('description', data.description);
                
                for (var i = 0; i < patchData.length; ++i) {
                    patch += generatePatchInfo(patchData[i]);
                }
                
                return patch + '</div>';
            }
            
            function buildHTML(target) {                
                for (var i = 0; i < data.length; ++i) {
                    target.html(generatePatch(data[i]));
                }
                
            }
            
            function applyCSS(target) {
                
            }
            
            function animate(target) {
                
            }

            $.fn.loadPlugin(options.datasource, 
                            htmlTarget, 
                            buildHTML, 
                            applyCSS, 
                            animate);
        }
    });
})(jQuery);