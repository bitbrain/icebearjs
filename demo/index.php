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
                font-size:12px;
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
                font-size:20px;
            }
            
            .ui-progressbar .ui-progressbar-value { background-color:#e3e3e3; }
        </style>
    </head>
    <body>
        <h1>IcebearJS Demo</h1>
        
        <h3>icebearProgress</h3>
        <div class="progress">Loading progress...</div>
        <script type="text/javascript">
            $('.progress').icebearProgress({
                datasource : 'proxy.php?url=https://raw.github.com/MyRealityCoding/galacticum/master/res/meta.json',
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
        </script>
    </body>
</html>
