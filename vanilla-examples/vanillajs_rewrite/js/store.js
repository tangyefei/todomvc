(function(window) {

	function Store(name)
	{
		this.name = name;
		if(!localStorage[this.name]) {
			var todos = {'todos':[]};
			localStorage[this.name] = JSON.stringify(todos);
		}
	}
	
	Store.prototype.findAll = function (callback) {
		callback = callback || function() {};
		callback.call(this, JSON.parse(localStorage[this.name]).todos);
	}

	Store.prototype.find = function (option, callback) {
		var storage = JSON.parse(localStorage[this.name]);
		var todos = storage.todos;
		todos = todos.filter(function(todo) {
			for(var key in option) {
				if(option[key] != todo[key]){
					return false;	
				}
			}
			return true;
		});
		callback.call(this, todos);
	}
		
	Store.prototype.save = function (todo, callback, id) {
		callback = callback || function  () {};
		var storage = JSON.parse(localStorage[this.name]);
		var todos = storage.todos;

		if(id) {
			for (var i = todos.length - 1; i >= 0; i--) {
				if(id == todos[i].id) {
					for( var key in todo) {
						todos[i][key] = todo[key];
					}
					break;
				}
			}
			localStorage[this.name] = JSON.stringify(storage);
			callback.call(this, id, todo);
		}
		else
		{
			todos.push(todo);
			localStorage[this.name] = JSON.stringify(storage);
			callback.call(this);
		}
		
	}

	/*Store.prototype.update = function (todo, callback) {
		callback = callback || function  () {};
		var storage = JSON.parse(localStorage[this.name]);
		var todos = storage.todos;

		for (var i = todos.length - 1; i >= 0; i--) {
			if(todos[i].id == todo.id) {
				todos[i] = todo;
				break;
			}
		}
		localStorage[this.name] = JSON.stringify(storage);
		callback.call(this);
	}
*/

	Store.prototype.delete = function(id, callback) {
		var storage = JSON.parse(localStorage[this.name]);
		var todos = storage.todos;
		for (var i = todos.length - 1; i >= 0; i--) {
			if(todos[i].id == id)
			{
				todos.splice(i, 1);
				break;
			}
		}
		localStorage[this.name] = JSON.stringify(storage);
		callback.call(this);
	}
	

	/***************************/
	/*

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
	}/*

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
	*/
	window.app = window.app || {};
	window.app.Store = Store;
})(window);