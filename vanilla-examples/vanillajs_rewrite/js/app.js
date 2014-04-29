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

	
/*
	document.addEventListener('click', function(ev) {
		if(ev.target.nodeName == "A" && ev.target.parentNode.parentNode.id == "filters") 
		{
			app.status = helper.getStatus(ev.target.href);
			view.renderAll(store.findAll(app.status));
			view.updateSelected(app.status);
			return false;
		}
		if(ev.target.className == "destroy")
		{
			var li = ev.target.parentNode.parentNode;
			var ul = li.parentNode;
			for (var i = 0; i < ul.children.length; i++) {
				if(li == ul.children[i])
				{
					store.remove(i, updateCount);
					ul.removeChild(li);
					break;
				}
			}
			return false;
		}
		if(ev.target.id == "clear-completed")
		{
			store.clearCompleted(updateCount);
			view.clearCompleted();
			return false;
		}
		if(ev.target.id == 'toggle-all')
		{
			var todos = store.updateAll({value:ev.target.checked}, updateCount);
			//TODO mark current status
			view.renderAll(todos);
			return false;
		}
		if(ev.target.className == "toggle")
		{
			var li = ev.target.parentNode.parentNode;
			var ul = li.parentNode;
			for (var i = 0; i < ul.children.length; i++) {
				if(li == ul.children[i])
				{
					var completed = (li.className == 'completed');
					li.className =  (completed ? '' : 'completed');
					store.update(i, !completed, updateCount);
					break;
				}
			}
			return false;
		}

		if(ev.target !== newTodo) {
			var newTodo = document.getElementById('new-todo');
			if(newTodo.value && newTodo.value.trim() != '') {
				addItem(new app.Todo(newTodo.value, false));
			}
		}
	});

	document.addEventListener('keyup', function  (ev) {
		if(ev.keyCode == 13) {
			var newTodo = document.getElementById('new-todo');
			if(newTodo.value && newTodo.value.trim() != '') {
				addItem(new app.Todo(newTodo.value, false));
			}
		}
	});

	function addItem(todo) {
		view.renderOne(todo);
		view.clearInput();
		store.add(todo, updateCount);
	}

	function updateCount () {
		view.updateCompletedCount(store.findAll(app.COMPLETED).length);
		view.updateNotCompletedCount(store.findAll(app.ACTIVE).length);	
	}
*/

	// var store = new app.Store('vanillajs-todomvc');
	// var view = new app.View();
	// var helper = new Helper();
	
		
		/*app.status = helper.getStatus(null);

		view.renderAll(store.findAll(app.status));
		updateCount();
		view.updateSelected(app.status);*/
})();	
