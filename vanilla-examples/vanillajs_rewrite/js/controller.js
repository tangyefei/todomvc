(function(window){

	function Controller(view) {
		this.view = view;
	}

	Controller.prototype.setView = function(hash) {
		/*
			We got three things to do here:
			1. add class for nav's hrefs
			2. update the count
			3. show the list
		*/
		//alert('hash:' + hash);
		var route = hash.split('/')[1];
		var activeRoute = (route == '') ? 'all' : '';

		this.view.setNavHrefCls(activeRoute);
		/*
		//this._updatCount();
		if(page === '' || page === 'all') {
			this.showAll();
		}
		else if(page === 'active') {
			this.showActive();
		}
		else if(page === 'completed') {
			this.showCompleted();
		}*/
	}

	Controller.prototype.showAll = function() {
		var todos = app.store.findAll(0);
		alert('showAll');
	}
	
	Controller.prototype.showActive = function() {
		alert('showActive');
	}

	Controller.prototype.showCompleted = function() {
		alert('showCompleted');
	}

	



	window.app = window.app || {};
	window.app.Controller = Controller;
})(window);