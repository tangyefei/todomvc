(function() {
	function Todo(name,value) {
		this.name = name;
		this.value = value;
	}

	window.app = window.app || {};
	window.app.Todo = Todo;
})();