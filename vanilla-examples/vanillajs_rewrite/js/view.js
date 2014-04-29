(function() {
	var todoList = document.getElementById('todo-list');
	var newTodo = document.getElementById('new-todo');
	var countLbl = document.getElementById('todo-count');
	var clearBtn = document.getElementById('clear-completed');;
	var filters = document.getElementById('filters');

	function View()
	{
		this.template = new app.Template();
		this.$todoList = document.getElementById('todo-list');
		this.$itemLeftLbl = document.getElementById('todo-count');
		this.$clearCompletedBtn = document.getElementById('clear-completed');
		this.$toggleAll = document.getElementById('toggle-all');
		this.$footer = document.getElementById('footer');
		this.$newTodo = document.getElementById('new-todo');
	}

	View.prototype.clsRoute = function(activeRoute) {
		var prev = qs('#filters .selected');
		var curr = qs('#filters a[href="' + activeRoute + '"]');
		if(prev)
			prev.className = '';
		if(curr)
			curr.className = 'selected';
	}

	View.prototype.showTodos = function(todos) {
		this.$todoList.innerHTML = this.template.getTodosHTML(todos);
	}

	View.prototype.updateItemLeftLbl = function(count) {
		this.$itemLeftLbl.innerHTML = this.template.getItemNotCompletedHTML(count);
	}

	View.prototype.updateCompletedBtn = function(config) {
		this.$clearCompletedBtn.innerHTML = this.template.getClearCompletedBtnHTML(config.count);
		this.$clearCompletedBtn.style.display = config.visible;
	}

	View.prototype.updateToggleAll = function(config) {
		this.$toggleAll.checked = config.checked;
	}

	View.prototype.updateNavVisible = function(config) {
		this.$footer.style.display = config.visible ? 'block' : 'none';
	}

	View.prototype.bind = function(type, handler) {
		var that = this;
		if(type === 'newTodo') {
			$on(that.$newTodo, 'change', function() {
				handler.call(that, that.$newTodo.value);
			});
		}
		else if(type === 'removeTodo') {
			$live('li .destroy', 'click', function(event){
				var id = $parent(this, 'li').dataset['id'];
				id = parseInt(id, 10);
				handler.call(that, id);
			});
		}
		else if(type === 'clearCompleted') {
			$live('#clear-completed', 'click', function(event){
				handler.call(that);
			});
		}
		else if(type === 'toggle') {
			$live('.toggle', 'click', function(event) {
				handler.call(that,$parent(this, 'li'));
			});
		}
	}

	View.prototype.clearNewTodo = function() {
		this.$newTodo.value = '';
	}

	View.prototype.removeItem = function (id) {
		var li = qs('li[data-id="' + id + '"]');
		this.$todoList.removeChild(li);
	}

	View.prototype.updateStatus = function(todo) {
		var li = qs('li[data-id="' + todo.id + '"]');
		li.className = (todo.value ? 'completed' : '');
	};
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