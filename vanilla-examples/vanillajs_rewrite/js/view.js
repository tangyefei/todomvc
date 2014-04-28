(function() {
	var todoList = document.getElementById('todo-list');
	var newTodo = document.getElementById('new-todo');
	var countLbl = document.getElementById('todo-count');
	var clearBtn = document.getElementById('clear-completed');;
	var toggleAll = document.getElementById('toggle-all');
	var filters = document.getElementById('filters');

	function View()
	{
		this.template = new app.Template();
	}
	
	View.prototype.setNavHrefCls = function(activeRoute) {
		var href = '#/' + activeRoute.substr(0,1).toUpperCase() + activeRoute.substr(1);
		var prev = qs('#filters .selected');
		var curr = qs('#filters a[href="' + href + ']');
		if(prev)
			prev.className = '';
		if(curr)
			curr.className = 'selected';
	}
	//------------------------------------------------------------------//
	View.prototype.renderOne = function(todo) {
		todoList.innerHTML = todoList.innerHTML + this.template.show(todo);
	}

	View.prototype.clearInput = function() {
		newTodo.focus();
		newTodo.value = '';
	}

	View.prototype.renderAll = function  (todos) {
		var checked = true;
		todoList.innerHTML = '';
		if(todos && todos.length) 
		{		
			for (var i = 0; i < todos.length; i++) {
				this.renderOne(todos[i]);
				checked &= todos[i].value;
			}
		}
		toggleAll.checked = checked;
	}

	View.prototype.clearCompleted = function  () {
		qsa('.completed').forEach(function(item){
			todoList.removeChild(item);
		});
	}

	View.prototype.updateCompletedCount = function (count) {
		clearBtn.innerHTML = this.template.clearCompleted(count);
	}

	View.prototype.updateNotCompletedCount = function (count) {
		countLbl.innerHTML = this.template.notCompleted(count);
	}

	View.prototype.updateSelected = function (status) {
		for (var i = filters.children.length - 1; i >= 0; i--) {
			filters.children[i].children[0].className = '';
		}

		if(status == app.ALL)
			filters.children[0].children[0].className = 'selected';
		else if(status == app.ACTIVE)
			filters.children[1].children[0].className = 'selected';
		else if(status == app.COMPLETED)
			filters.children[2].children[0].className = 'selected';
 	}


	window.app = window.app || {};
	window.app.View = View;
})();