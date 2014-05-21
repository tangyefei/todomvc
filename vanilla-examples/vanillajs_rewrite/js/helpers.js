(function(window){
	window.qs = function(selector, scope) {
		return (scope || document).querySelector(selector);
	}

	window.qsa = function(selector, scope) {
		return (scope || document).querySelectorAll(selector);
	}

	window.$on = function(element, event, callback, useCapture) {
		element.addEventListener(event, callback, !!useCapture);
	}

	window.$live = (function(){
		var eventRegistry = {};

		function dispatchEvent (event) {
			eventRegistry[event.type].forEach(function(entry){
				var potentialElements = qsa(entry.selector);
				var isMatch = Array.prototype.indexOf.call(potentialElements, event.target) >= 0;
				if(isMatch)
					entry.handler.call(event.target, event);
			});
		}
		return function(selector, event, handler){
			if(!eventRegistry[event]) {
				eventRegistry[event] = [];
				$on(document.documentElement, event, dispatchEvent, true);
			}
			eventRegistry[event].push({
				selector: selector,
				handler: handler
			});
		}
	})(); 

	window.$parent = function(element, tagName){
		if(!element.parentNode)
			return;
		else if(element.parentNode.tagName.toLowerCase() == tagName.toLowerCase())
		{
			return element.parentNode;
		}
		else {
			return window.$parent(element.parentNode, tagName);
		}

	}

	NodeList.prototype.forEach = Array.prototype.forEach;
})(window);
