<!DOCTYPE html>
<html>
    <head>
        <title>IcebearJS Demo</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
        <script type="text/javascript" src="../src/jquery.icebearjs.js"></script>
        <style>
            
            .progress {
                background-color:#eee;
                color:#aaa;
                border:10px solid #f5f5f5;
                width:50% !important;
                margin-right:40px;
            }
            
            .progress .cell {
                border-right:1px solid #ccc;
                vertical-align: middle;
            }
            
            .cell.last {
                border:none;
            }
            
            .caption {
                padding : 3px;
                font-size:12px;
            }
            
            .ui-progressbar .ui-progressbar-value { background-color:#e3e3e3; }
            
            .patch .name {
                color: #aaa;
                font-size:40px;
                display:inline-block;
            }
            
            .patch .version {
                display:inline-block;
                color:#ccc;
                font-size:30px;
                margin-left:10px;
            }
            
            .patch .description {
                margin-top:20px;
                margin-bottom:20px;
                color:#ccc;
                font-size:20px;
            }
            
            .patch .category {
                font-size:26px;
                color:#aaa;
            }
            
            .patch li {
                list-style:square;
            }
            
            .patch li.added {
                color:#98c852;
            }
            
            .patch li.removed {
                color:#fd8282;
            }
            
            .patch li.modified {
                color:#82c7fd;
            }
            
            h3 {
                margin-top:60px;
            }
            
            
        </style>
    </head>
    <body>
        <h1>IcebearJS Demo</h1>
        
        <h3>icebearProgress</h3>
        <div class="progress">Loading progress...</div>
        
        <h3>icebearPatch</h3>
        <div class="patchnotes"></div>
        
        <script type="text/javascript">
            $('.progress').icebearProgress({
                datasource : 'meta.json',
                duration : 1000,
                onEnterPhase : function(element) {
                    element.animate({
                        color : "black"
                    });
                },
                onLeavePhase : function(element) {
                    element.animate({
                        color : "#aaa"
                    }, 500);
                }
            });
            
            $('.patchnotes').icebearPatch({
                datasource : 'meta.json'
            });
            
        </script>
    </body>
</html>
