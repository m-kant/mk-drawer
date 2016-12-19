/**
 * new mk.Drawer(drawerElement)
 * new mk.Drawer(options)
 *
 */


(function(window,undefined){


	var widget = {



		defaults: {
			content:null,	// содержимое ящика. Текст или DOM Element
			container:null,
			class:	null,	// css класс ящика
			overlay:true	// перекрывать ли маской под меню
		},

		toggle: function(drawerEl){
			var wrapper = drawerEl; // drawer container
			var body = wrapper.querySelector('.mk-drawer-body'); // drawer body
			var overlay = wrapper.drawerOptions.overlay;
			// Close
			if (_hasClass(wrapper,'mk-open')){
				_removeClass(wrapper,'mk-open');
				if(overlay){
					_removeClass(overlay,'mk-open');
				}

				// убираем когда закончится анимация
				setTimeout(function(){
					body.style.display = 'none';
					if(overlay){
						overlay.style.display = 'none';
					}
				},350);
			// Open
			}else{
				body.style.display = '';
				_addClass(wrapper,'mk-open');
				if(overlay){
					overlay.style.display = '';
					setTimeout(function(){_addClass(overlay,'mk-open');},20);
				}
			}
		},

		create: function(content,options){
			if(content.ownerDocument !== document && 'object' === typeof content){
				options = content;
				options = _mergeObjects(options,this.defaults);
				content = options.content;
			}else{
				options = _mergeObjects(options,this.defaults);
			}
			if(!content){
				console.error('No content supplied for drawer');
				return;
			}

			var wrapper = _newElement('div','mk-drawer-wrapper');
			if(options.class){ wrapper.className += ' '+ options.class;}

			wrapper.drawerOptions = {};

			var drPouch = _newElement('div','mk-drawer-pouch');

			var drBody = _newElement('div','mk-drawer-body');
			drPouch.appendChild(drBody);

			// content is DOM Element
			if(content.ownerDocument === document){
				var drParent = _defineParent(content);
				drBody.appendChild(content);

			// content is probably string
			}else{
				drBody.innerHTML = content;
				var drParent = document.body;
			}

			if(document.body === drParent){
				wrapper.style.position = 'fixed';
			}

			if(options.overlay){
				var overlay = drParent.querySelector('.mk-drawer-overlay');

				if(!overlay){
					overlay = _newElement('div','mk-drawer-overlay');
					overlay.style.display = 'none';
					overlay.onclick = function(){
						var openedWrapper = this.parentNode.querySelector('.mk-drawer-wrapper.mk-open');
						mk.drawer.toggle(openedWrapper);
					};
					// must be appended to parent, not to wrapper, to eclipse parent
					drParent.appendChild(overlay);
				}

				wrapper.drawerOptions.overlay = overlay;
				if(document.body === drParent){
					overlay.style.position = 'fixed';
				}
			}



			var trigger = _newElement('button','mk-drawer-trigger');
			trigger.onclick = function(){mk.drawer.toggle(this.parentNode);};
			trigger.innerHTML = '<span class="mk-drawer-icon mk-icon-close"></span>';

			wrapper.appendChild(trigger);
			wrapper.appendChild(drPouch);

			drParent.appendChild(wrapper);
			return wrapper;
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

	_newElement = function(tagName,className){
		var el = document.createElement(tagName);
		el.className = className;
		return el;
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


	/**
	 * находит родительский элемент для drawer и добавляет к нему нужные атрибуты
	 * @param {DOMElement} contentEl drawer content element
	 * @returns {DOMElement}
	 */
	_defineParent= function(contentEl){
		var p = contentEl.parentNode;
		var pos = p.style.position;
		if('fixed' !== pos && 'relative' !== pos && 'absolute' !== pos){
			p.style.position = 'relative';
		}

		return p;
	};

	mk = window.mk || {};
	mk.drawer = widget;

})(window);