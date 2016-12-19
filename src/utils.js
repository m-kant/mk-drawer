
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
