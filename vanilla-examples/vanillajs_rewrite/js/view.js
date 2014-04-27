(function() {
	var todoList = document.getElementById('todo-list');
	var newTodo = document.getElementById('new-todo');
	var countLbl = document.getElementById('todo-count');
	var clearBtn = document.getElementById('clear-completed');;
	var toggleAll = document.getElementById('toggle-all');
	var filters = document.getElementById('filters');

	var template = 
		'<div class="view">' +
		'	<input class="toggle" type="checkbox">' +
		'	<label>{todo_item}</label><button class="destroy"></button>' +
		'</div>'

	function View()
	{
	}
	
	View.prototype.renderOne = function(todo) {
		var li = document.createElement('li');
		li.className = (todo.value == true ? 'completed' : '') ;
		li.innerHTML = template.replace('{todo_item}', todo.name);
		todoList.appendChild(li);
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
		/*for (var i = todoList.children.length - 1; i >= 0; i--) {
			if(todoList.children[i].className == 'completed'){
				todoList.removeChild(todoList.children[i]);
			}
		}*/
	}

	View.prototype.updateCompletedCount = function (count) {
		clearBtn.innerHTML =  'Clear completed (' + count + ')'
	}

	View.prototype.updateNotCompletedCount = function (count) {

		countLbl.innerHTML = '';
		if(count != 0)
		{
			countLbl.innerHTML = '<strong>' + count + '</strong> not completed';
		}
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