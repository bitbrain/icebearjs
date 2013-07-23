![icebearJS](icebearjs-head.png)

A lightweight jQuery plugin which shows development progress.

Getting started
===

To use IcebearJS properly you have to include it. Put the following line in your head code:

```html
<script type="text/javascript" src="http://icebearjs.my-reality.de/1.0/jquery.icebearjs.min.js"></script>
```

Afterwards you can use supported IcebearJS.

Metadata
===

This plugin generates jQuery UI elements which base on JQueryUI. You have to define a XML source in a repository first, in the following example a basic ```meta.xml``` file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<resources>
	<name>Name of your app</name>
	<author>Miguel Gonzalez</author>
	<url>http://my-reality.de</url>
	<version>0.7</version>
	<phase>alpha</phase>
	<progress>87</progress>
	
	<phaselist>
                <phase>dev</phase>
                <phase>alpha</phase>
                <phase>beta</phase>
                <phase>release</phase>
        </phaselist>

        <team>
            <member
                name="Miguel Gonzalez"
                email="miguel-gonzalez@gmx.de"
                facebook="your-facebook-url"
                twitter="your-twitter-url"
                gplus="your-google+-url"
                website="http://my-reality.de"
            />
        </team>
</resources>
```

Elements
===

### icebearProgress

This UI element provides a animated progress bar which displays the current development status of your app. Additionally you have to pass the location of the meta file as parameter:

```html
<div id="progress"></div>

<script type="text/javascript>">
$('#progress').icebearProgress({
        datasource : 'https://raw.github.com/MyRealityCoding/galacticum/master/res/xml/meta.xml'
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


