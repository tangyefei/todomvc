(function(window) {

	function Store(name)
	{
		this.name = name;
		if(!localStorage[this.name]) {
			var todos = {'todos':[]};
			localStorage[this.name] = JSON.stringify(todos);
		}
	}
	
	Store.prototype.save = function(data) {
		localStorage[this.name] = data;
	}

	Store.prototype.findAll = function(option) {
		var todos = [];
		if(localStorage[this.name]) {
			todos = JSON.parse(localStorage[this.name]).todos;
			if(option == 1)
				todos = todos.filter(function(todo){return todo.value == false;});
			else if(option == -1)
				todos = todos.filter(function(todo){return todo.value == true;});
		}

		return todos;	
	}

	Store.prototype.add = function(todo, callback) {
		if(localStorage[this.name])
		{
			var storage = JSON.parse(localStorage[this.name]);
			var todos = storage.todos;
			todos.push(todo);
			this.save(JSON.stringify(storage));
			callback();
		}
	}

	Store.prototype.update = function(index, value, callback) {
		if(localStorage[this.name])
		{
			var storage = JSON.parse(localStorage[this.name]);
			var todos = storage.todos;
			var todo = todos[index];
			todo.value = value;
			this.save(JSON.stringify(storage));
			callback();
		}
	}

	Store.prototype.remove =  function(index, callback) {
		if(localStorage[this.name])
		{
			var storage = JSON.parse(localStorage[this.name]);
			var todos = storage.todos;
			if(todos.length > index)
			{
				todos.splice(index, 1)		
			}
			this.save(JSON.stringify(storage));
			callback();
		}
	}
	Store.prototype.clearCompleted =  function(callback) {
		if(localStorage[this.name])
		{
			var storage = JSON.parse(localStorage[this.name]);
			var todos = storage.todos;
			for (var i = todos.length - 1; i >= 0; i--) {
				if(todos[i].value == true) 
					todos.splice(i, 1)
			}
			this.save(JSON.stringify(storage));
			callback();
		}
	}

	Store.prototype.updateAll =  function(option,callback) {
		if(localStorage[this.name])
		{
			var storage = JSON.parse(localStorage[this.name]);
			var todos = storage.todos;
			for (var i = todos.length - 1; i >= 0; i--) {
				todos[i].value = option.value;
			}
			this.save(JSON.stringify(storage));
			callback();
			return todos;
		}
	}
	window.app = window.app || {};
	window.app.Store = Store;
})(window);