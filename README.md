mk-drawer
===============

A library agnostic, fully customizable, CSS animated UI widget.
You can attach it to any block. You can place it on any side.
You can change view of trigger button, or assign any other element as a trigger.
Does not impose any constraints on drawer content.

[Demo](http://mkant.ru/mink-js/mk-drawer)

Inclusion
------------

Include script and style sheet into you page:
```HTML
<script src="path/to/plugin/mk-drawer.min.js"></script>
<link href="path/to/plugin/mk-drawer.min.css" rel="stylesheet">
```

Usage
-----------
```JavaScript
var drawer = new mk.drawer(content);
```
```JavaScript
var drawer = new mk.drawer(options);
```
```JavaScript
var drawer = new mk.drawer(content,options);
```

Content can be a HTML-string or DOM Element.
If string given, drawer will be attached to document body.
If DOM Element given, drawer will be attached to its parent node.

Options is a set of drawer options


[Details and Demo](http://mkant.ru/mink-js/mk-drawer)
--------------------------------------------------------