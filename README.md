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
	<resource type="string" id="app-name">Name of your app</resource>
	<resource type="string" id="app-author">Miguel Gonzalez</resource>
	<resource type="string" id="app-url">http://my-reality.de</resource>
	<resource type="string" id="app-name">Name of your app</resource>
	<resource type="string" id="app-version">0.7</resource>
	<resource type="string" id="app-phase">alpha</resource>
	<resource type="string" id="app-progress">87</resource>
</resources>
```

Afterwards you have to define an element in your HTML page which should serve as a progress bar. Additionally you have to pass the location of the meta file as parameter:

```html
<div id="progress"></div>

<script type="text/javascript>">
$('#progress').icebearJS('https://raw.github.com/MyRealityCoding/galacticum/master/res/xml/meta.xml');
</script>
```

That's all! Now you can view a full working, animated progress bar. Additionally you can style it with CSS to improve appeareance.
