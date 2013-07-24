![icebearJS](icebearjs-head.png)

A lightweight jQuery plugin which shows development progress.

Getting started
===

To use IcebearJS properly you have to include it. Put the following line in your head code:

```html
<script type="text/javascript" src="http://dev.my-reality.de/jquery/icebearjs/1.0/jquery.icebearjs.min.js"></script>
```

Afterwards you can use supported IcebearJS.

Metadata
===

This plugin generates jQuery UI elements which base on JQueryUI. You have to define a jsonp source in a repository first, in the following example a basic ```meta.json``` file:

```json
{
    "name" : "name-of-your-app",
    "author" : "name-of-the-author",
    "url" : "url-of-your-app",
    "version" : "0.8",
    "phase" : "beta",
    "progress" : "73",
    "phaselist" : [
        "dev", "alpha", "beta", "release"
    ]
}
```

It is very important to put the data in a response object to work with json. 

### Reading from remote

Maybe you don't want to have a local meta file. In many cases you have a nice meta file in an external repository. Because of some security issues, IcebearJS works with jsonp (Jason with padding).

Sometimes, the following error occurs:

```text
Origin http://your-server is not allowed by Access-Control-Allow-Origin.
```

To solve the bug, write a small php script and call it ```proxy.php```:
```php
<?php
// File Name: proxy.php
if (!isset($_GET['url'])) die();
$url = urldecode($_GET['url']);
$protocol = parse_url($url);
$url = $protocol['scheme'] . '://' . str_replace($protocol['scheme'] . '://', '', $url);
echo file_get_contents($url);
?>
```

Now you can define the datasource as mentioned here:
```javascript
datasource : 'proxy.php?url=https://raw.github.com/MyRealityCoding/galacticum/master/res/meta.json'
```

Elements
===

### icebearProgress

This UI element provides a animated progress bar which displays the current development status of your app. Additionally you have to pass the location of the meta file as parameter:

```html
<div id="progress"></div>

<script type="text/javascript>">
$('#progress').icebearProgress({
        datasource : 'proxy.php?url=https://raw.github.com/MyRealityCoding/galacticum/master/res/meta.json'
});
</script>
```
That's all! Now you can view a full working, animated progress bar which displays the current development status of your game. Additionally you can style it with CSS to improve appeareance.

#### Options

 * *datasource*: The location of your meta data file
 * *animated*: Turns the animations on or off
 * *animationType*: jQuery animation type
 * *duration*: Duration of the animation
 * *onEnterPhase*: listener function which is called when a new phase is entered
 * *onLeavePhase*: listener function which is called when a phase has been leaved
 * *internalCss*: Disable for custom css positioning


