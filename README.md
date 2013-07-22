![icebearJS](icebearjs-head.png)

A lightweight jQuery plugin which shows development progress.

Getting started
===

To use IcebearJS properly you have to include it. Put the following line in your head code:

```html
<script type="text/javascript" src="http://icebearjs.my-reality.de/jquery.icebearjs.min.js"></script>
```

Afterwards you can use supported IcebearJS.

### Example

This plugin generates a progress bar which based on JQueryUI. Before you have to define a XML source in a repository, in the following example a basic ```meta.xml``` file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<resources>
	<resource type="string" id="name">Name of your app</resource>
	<resource type="string" id="author">Miguel Gonzalez</resource>
	<resource type="string" id="url">http://my-reality.de</resource>
	<resource type="string" id="name">Name of your app</resource>
	<resource type="string" id="version">0.7</resource>
	<resource type="string" id="phase">alpha</resource>
	<resource type="string" id="progress">87</resource>
	
	<resource type="string" id="phaselist">
                <phase>dev</phase>
                <phase>alpha</phase>
                <phase>beta</phase>
                <phase>release</phase>
    </resource>
</resources>
```

Afterwards you have to define an element in your HTML page which should serve as a progress bar. Additionally you have to pass the location of the meta file as parameter:

```html
<div id="progress"></div>

<script type="text/javascript>">
$('#progress').icebearProgress({
        // Location of the meta file
        datasource : 'https://raw.github.com/MyRealityCoding/galacticum/master/res/xml/meta.xml',
        // Turn animations on or off
        animated : true,
        // Set the animation type
        animationType : 'easeOutBounce',
        // Set duration of the animation
        duration : 1000,
        // Event listener on passing a phase (during animation)
        onPassPhase : function(element) {
                element.css({
                        fontWeight: "normal"
                });
        },
        // Event listener on entering a phase (during animation)
        onEnterPhase : function(element) {
                element.css({
                        fontWeight: "bold"
                });
        }
});
</script>
```

That's all! Now you can view a full working, animated progress bar. Additionally you can style it with CSS to improve appeareance.
