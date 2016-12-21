
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