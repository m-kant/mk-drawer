
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

