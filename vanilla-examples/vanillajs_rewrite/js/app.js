/*
todo learning progress:
1. read the html and css style：some skills are really useful
	* using ':before' muti places
	* rotate the '>>'
	* hide input by using 'apperance:false'
2. write self's javascript code one by one:requests
	* add item
		* judge input over
		* get input value and save it to localStorage
		* render it on the page
	* mark item as completed
		* add class
		* modify data in localStorage
	* delete item
	* auto load when open page
	* fix bugs and refine code
	* transfer between all/completed/active
		* listen to href change #{what it is}?
		* render the ul list 
	* count items not completed and completed
	* clear completed item
	* swich all item's request
	* edit item
		* edit item
		* edit item cancel
		* edit item save
*/
(function(){

	function Todo(name) {
		//this.view = new app.View();
		this.store = new app.Store(name);
		this.model = new app.Model(this.store);
		this.template = new app.Template();
		this.view = new app.View(this.template);
		this.controller = new app.Controller(this.model, this.view);
	}

	var todo = new Todo('vanillajs-todomvc');

	function setView() {
		todo.controller.setView(window.location.hash);
	}

	$on(window, 'load', setView);
	$on(window, 'hashchange', setView);
})();	
