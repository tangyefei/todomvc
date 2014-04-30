(function (window) {
	function Model (store) {
		this.store = store;
	}

	Model.prototype.read = function(option, callback) {
		callback = callback || function(){};
		if(typeof option === 'function') {
			callback = option;
			option = {};
		}
		this.store.find(option, callback);
	}

	Model.prototype.getCount = function (callback) {
		var countObj = {
			active: 0,
			completed: 0,
			total: 0
		};

		this.store.findAll(function(todos){
			todos.forEach(function(todo){
				if(todo.completed)
					countObj.completed ++;
				else
					countObj.active ++;
				countObj.total ++;	
			});
			callback.call(this, countObj);
		});
	}

	Model.prototype.create = function(title, callback) {
		var newTodo = {
			id: new Date().getTime(),
			title: title,
			completed: false
		};		
		this.store.save(newTodo, callback);
	}

	Model.prototype.remove = function(id, callback) {
		callback = callback || function() {};
		this.store.delete(id, callback);
	}

	
	Model.prototype.update = function(id, option, callback) {
		this.store.save(option, callback, id);
	}
	
	window.app = window.app || {};
	window.app.Model = Model;
})(window);