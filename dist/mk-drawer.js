/**
 * new mk.Drawer(drawerElement)
 * new mk.Drawer(options)
 *
 */


(function(window,undefined){


	var widget = function(content,options){
		// content given
		if('string' === typeof content || document === content.ownerDocument){
			if(!options)options = {};
			options.content = content;
		// first argument is options
		}else{
			options = content;
		}

		this.options = _mergeObjects(options,widget.defaults);
		_normalizeOptions(this.options);

		// flag
		this.opened = false;
		// build drawer markup
		this.container = options.container;
			_addContainerStyles(this.container);
		this.overlay = this.mkOverlay();
		this.drawer = this.mkDrawer();
		this.trigger = this.mkTrigger();
		this.body = _newElement('div','drawer-body',this.drawer);
			_appendContent(this.options.content,this.body);
		// attach drawer to container
		this.container.appendChild(this.overlay);
	};

	widget.defaults = {
		width:200,
		attachment:'left',
		content:null,	// содержимое ящика. Текст или DOM Element
		container:null,
		mask: true,	// перекрывать ли маской под меню
		class:	null,	// css класс ящика
		trigger:null,
		triggerOffset:20,
		triggerAttachment:'top',
		triggerContent: '<div class="drawer-sandwich"><i class="bar1"></i><i class="bar2"></i><i class="bar3"></i></div>',
	},

	widget.prototype = {

		open: function(){
			this.opened = true;
			_addClass(this.overlay,'opened');
		},

		close: function(){
			this.opened = false;
			_removeClass(this.overlay,'opened');
		},

		toggle: function(){
			(this.opened)?this.close():this.open();
		},

		onclick: function(ev){
			if(ev.target !== this.trigger && ev.target !== this.overlay)return;
			this.toggle();
			ev.stopPropagation();
		},

		mkOverlay: function(){
			overlay = _newElement('div','drawer-overlay');
			if(this.options.mask) {
				_appendClass(overlay,'drawer-mask');
				overlay.onclick = this.onclick.bind(this);
			}
			if(this.options.class) {
				_appendClass(overlay,this.options.class);
			}
			_appendClass(overlay, 'drawer-'+this.options.attachment );

			if(document.body === this.options.container){
				overlay.style.position = 'fixed';
			}

			return overlay;
		},

		mkDrawer: function(){
			var drawer = _newElement('div','drawer',this.overlay);
			var prop;
			switch(this.options.attachment){
				case 'left':	prop = 'width'; break;
				case 'right':	prop = 'width'; break;
				case 'top':		prop = 'height'; break;
				case 'bottom':	prop = 'height'; break;
			}
			drawer.style[prop] = this.options.width+'px';
			return drawer;
		},

		mkTrigger: function(){
			if(this.options.trigger){
				var trigger = this.options.trigger;
			}else{
				var trigger = _newElement('a','drawer-trigger',this.drawer);
				trigger.innerHTML = this.options.triggerContent;
				trigger.style[ this.options.triggerAttachment ] = this.options.triggerOffset+'px';
			}
			trigger.onclick = this.onclick.bind(this);

			return trigger;
		},

	};

	_addClass = function(o,c){
		var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
		if (re.test(o.className)) {return;}
		o.className = (o.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "");
	};

	_removeClass = function(o,c){
		var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
		o.className = o.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "");
	};


	_hasClass = function(o,c){
		var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
		return re.test(o.className);
	};

	_newElement = function(tagName,className,parent){
		var el = document.createElement(tagName);
		el.className = className;
		if(parent) parent.appendChild(el);
		return el;
	};

	_appendClass = function(el,className){
		if(el.className){
			el.className += ' '+className;
		}else{
			el.className = className;
		}
	};

	_mergeObjects = function(options,defaults){
		if(undefined === options){options = {};}
		for(var k in defaults){
			if(!defaults.hasOwnProperty*(k)){continue;}
			if(undefined !== options[k]){continue;}

			options[k] = defaults[k];
		}
		return options;
	};

	_addContainerStyles = function(container){
		var pos = container.style.position;
		if('fixed' !== pos && 'relative' !== pos && 'absolute' !== pos){
			container.style.position = 'relative';
		}
	};

	/**
	 * appends content to drawer body either
	 * content is a string or DOM element
	 * @param {string||DOMElement} contentEl
	 * @param {DOMElement} drawerBody
	 * @returns {DOMElement}
	 */
	_appendContent = function(contentEl,drawerBody){
		if('string' === typeof contentEl){
			drawerBody.innerHTML = contentEl;
		}else{
			drawerBody.appendChild(contentEl);
		}
		return drawerBody;
	};

	_normalizeOptions = function(options){
		// attachment can only be 'left','right','bottom' or 'top'
		var dattach = options.attachment;
		if(dattach!=='right'&&dattach!=='left'&&dattach!=='top'&&dattach!=='bottom'){
			options.attachment = 'left';
		}

		// trigger attachment (depends on drawer attachment)
		var tattach = options.triggerAttachment;
		if('top' === dattach || 'bottom' === dattach){
			if('left' !== tattach && 'right' !== tattach) options.triggerAttachment = 'left';
		}else if('left' === dattach || 'right' === dattach){
			if('top' !== tattach && 'bottom' !== tattach) options.triggerAttachment = 'top';
		}

		// container, depends on content
		if(!options.container){
			options.container = ('string' === typeof options.content)?document.body:options.content.parentNode;
		}
	};

	mk = window.mk || {};
	mk.drawer = widget;

})(window);