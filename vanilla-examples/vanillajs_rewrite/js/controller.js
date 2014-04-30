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

		that.view.bind('toggleCompleted', function(id, option){
			that.toggleCompleted(id, option);
		});
			
		that.view.bind('toggleAll', function(option){
			that.toggleAll(option);
		});
	
		that.view.bind('editItem', function(id, title){
			that.editItem(id, title);
		});

		that.view.bind('editItemCancel', function(id, title){
			that.editItemCancel(id, title);
		});		

		that.view.bind('editItemDone', function(id, title){
			that.editItemDone(id, title);
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
		this.model.read({completed:false}, function(todos){
			that.view.showTodos(todos);
		});
	} 

	Controller.prototype.showCompleted = function() {
		var that = this;
		this.model.read({completed:true}, function(todos){
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
		that.model.read({completed:true}, function(todos) {
			todos.forEach(function(todo){
				that.removeTodo(todo.id);
			})
			that.updateCount();
		});
	}

	Controller.prototype.toggleCompleted = function(id, option) {
		var that = this;		
		that.model.update(id, option, function() {
			that.view.toggleCompleted(id, option);
		});
	}

	Controller.prototype.toggleAll = function(option) {
		var that = this;
		that.model.read({completed: !option.completed}, function(todos) {
			todos.forEach(function(todo) {
				that.toggleCompleted(todo.id, {completed: option.completed});
			})
			that.updateCount();
			that.showTodos();
		});
	}

	window.app = window.app || {};
	window.app.Controller = Controller;
})(window);


