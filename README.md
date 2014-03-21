![icebearJS](icebearjs-head.png)

A lightweight jQuery plugin which shows development progress.

Getting started
===

To use IcebearJS properly you have to include it. Put the following line in your head code:

```html
<script type="text/javascript" src="http://dev.my-reality.de/jquery/icebearjs/1.1/jquery.icebearjs.min.js"></script>
```

Afterwards you can use supported IcebearJS. To have a basic understanding about what IcebearJS does, [take a look at the demo](http://dev.my-reality.de/jquery/icebearjs/demo/).

Metadata
===

This plugin generates HTML elements which base on JQueryUI. You can define a json source in a repository first, in the following example a basic ```meta.json``` file, which should match the following structure:

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
        ],
                
        "patchnotes" : [
        {
         "name" : "Ruins of Zandaria",
         "version" : "1.6.2",
         "description" : "Dark creatures enter the realm. It is time for a new battle!",
         "patch" : [
            {
            "caption" : "General",
            "content" : [
                  {
                     "type" : "added",
                     "description" : "New menu has been implemented"
                  },
                  {
                     "type" : "removed",
                     "description" : "Removed old buttons"
                  }
               ]
            },
            {
            "caption" : "Features",
            "content" : [
                  {
                     "type" : "modified",
                     "description" : "Changed skin of 'Dark Thrull'"
                  },
                  {
                     "type" : "removed",
                     "description" : "Excluded player vs. player mode (PVP)"
                  }
               ]
            }
         ]
      }
   ],
           
   "team" : [
      {
         "name" : "Miguel Gonzalez",
         "job": "Developer",
         "email" : "miguel-gonzalez@gmx.de",
         "url" : "http://my-reality.de",
         "facebook" : "https://facebook.com/3928u28u",
         "twitter" : "https://twitter.com/sdccsds",
         "googleplus" : "https://plus.google.com/2832928392"
      },
      {
         "name" : "Markus Mustermann",
         "job": "Manager",
         "email" : "m.mustermann@gmx.de",
         "url" : "http://musterhausen.e",
         "facebook" : "https://facebook.com/3928u28u",
         "twitter" : "https://twitter.com/sdccsds",
         "googleplus" : "https://plus.google.com/2832928392"
      }
   ]
}
```

You can use another json source, it is only important to have the upper structure provided.

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

#### Attributes

There are more than the datasource attribute to configure:

* datasource - Set a source for the json input (Standard: "meta.json")
* animated - Determines if the bar should be animated at all (Standard: true)
* animationType: jQueryUI [easing effects](http://api.jqueryui.com/easings/) (Standard: "easeOutBounce")
* duration: Duration of animation in miliseconds (Standard: 1000)
* onLeavePhase: Event function which is called on phase leaving (Standard: function(element) { })
* onEnterPhase: Event function which is called on phase entering (Standard: function(element) { })
* internalCss: Determines if internal css should be used at all (Standard: true)

#### Options

 * *datasource*: The location of your meta data file
 * *animated*: Turns the animations on or off
 * *animationType*: jQuery animation type
 * *duration*: Duration of the animation
 * *onEnterPhase*: listener function which is called when a new phase is entered
 * *onLeavePhase*: listener function which is called when a phase has been leaved
 * *internalCss*: Disable for custom css positioning

### icebearPatch

This UI element provides patchnotes which can be styled with CSS afterwards:

```html
<div id="patchnotes"></div>

<script type="text/javascript>">
$('#patchnotes').icebearPatch({
        datasource : 'proxy.php?url=https://raw.github.com/MyRealityCoding/galacticum/master/res/meta.json'
});
</script>
```

#### Options

 * *datasource*: The location of your meta data file
 * *version*: Shows the version of the patch
 * *description*: shows the description of a patch
 
### icebearTeam

This UI element provides a team view which can be styled with CSS afterwards:

```html
<div id="team"></div>

<script type="text/javascript>">
$('#team').icebearTeam({
        datasource : 'proxy.php?url=https://raw.github.com/MyRealityCoding/galacticum/master/res/meta.json'
});
</script>
```

#### Options

 * *datasource*: The location of your meta data file
 * *job*: Shows the job title
 * *social*: Shows social box
 * *linked*: Add a link to each member
 
### icebearMeta

This UI element provides meta information:

```html
<div id="version"></div>

<script type="text/javascript>">
$('#version').icebearMeta({
        datasource : 'proxy.php?url=https://raw.github.com/MyRealityCoding/galacticum/master/res/meta.json'
});
</script>
```

#### Options

 * *datasource*: The location of your meta data file
 * *type*: Type of the meta data (default: version)
