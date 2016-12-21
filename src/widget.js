
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

