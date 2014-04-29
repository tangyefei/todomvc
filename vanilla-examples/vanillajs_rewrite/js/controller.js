(function(window){

	function Controller(model, view) {
		this.model = model;
		this.view = view;

		var that = this;

		that.view.bind('newTodo', function(title){
			that.addItem(title);
		});

		that.view.bind('removeTodo', function(id){
			that.removeTodo(id);
		});

		that.view.bind('clearCompleted', function(){
			that.clearCompleted();
		});

		that.view.bind('toggle', function(element){
			that.toggle(element);
		});
	}

	Controller.prototype.setView = function(hash) {
		// hash's value might: '#/'、'#/active'、'#/completed'
		this._activeRoute = hash;

		this.clsRoute();
		this.showTodos();
		this.updateCount();
	}

	Controller.prototype.clsRoute = function() {
		var hrefValue = this._activeRoute;
		if(!hrefValue)
			hrefValue = '#/';

		this.view.clsRoute(hrefValue);
	}

	Controller.prototype.showTodos = function(hash) {
		var activeRoute = this._activeRoute.split('/')[1];
		if(!activeRoute)
			activeRoute = 'All';
		else
			activeRoute = activeRoute.substr(0,1).toUpperCase() + activeRoute.substr(1); 

		this['show' + activeRoute]();
	}

	Controller.prototype.updateCount = function() {
		var that = this;
		that.model.getCount(function(countObj) {
			that.view.updateItemLeftLbl(countObj.active);
			that.view.updateCompletedBtn({
				count: countObj.completed,
				visible: countObj.completed > 0
			});
			that.view.updateToggleAll({checked: countObj.completed === countObj.total});
			that.view.updateNavVisible({visible:countObj.total > 0});
		});
	}	

	Controller.prototype.showAll = function() {
		var that = this;
		this.model.read(function(todos){
			that.view.showTodos(todos);
		});
	} 

	Controller.prototype.showActive = function() {
		var that = this;
		this.model.read({value:false}, function(todos){
			that.view.showTodos(todos);
		});
	} 

	Controller.prototype.showCompleted = function() {
		var that = this;
		this.model.read({value:true}, function(todos){
			that.view.showTodos(todos);
		});
	} 

	Controller.prototype.addItem = function (title) {
		var that = this;
		if(title.trim() === '')
			return;
		else
			that.model.create(title, function(){
				that.view.clearNewTodo();
				that.showTodos();
				that.updateCount();
			});
	}
	Controller.prototype.removeTodo = function(id) {
		var that = this;
		that.model.remove(id, function() {
			that.view.removeItem(id);
			that.updateCount();
		})
	}

	Controller.prototype.clearCompleted = function() {
		var that = this;
		that.model.read({value:true}, function(todos) {
			todos.forEach(function(todo){
				that.removeTodo(todo.id);
			})
			that.updateCount();
		});
	}

	Controller.prototype.toggle = function(element) {
		var that = this;
		var id = element.dataset['id'];

		this.model.toggle({id:id}, function(todo){
			that.view.updateStatus(todo);
			that.updateCount();
		});
	}

	window.app = window.app || {};
	window.app.Controller = Controller;
})(window);


