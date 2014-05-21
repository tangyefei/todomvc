(function() {
	function View()
	{
		this.template = new app.Template();
		this.$todoList = document.getElementById('todo-list');
		this.$itemLeftLbl = document.getElementById('todo-count');
		this.$clearCompletedBtn = document.getElementById('clear-completed');
		this.$toggleAll = document.getElementById('toggle-all');
		this.$footer = document.getElementById('footer');
		this.$newTodo = document.getElementById('new-todo');
		this.ENTER_KEY = 13;
		this.ESCAPE_KEY = 27;
		this.isCanceled = false;
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
				handler.call(that, that.$newTodo.completed);
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
		else if(type === 'toggleCompleted') {
			$live('.toggle', 'click', function(){
				var li = $parent(this, 'li');
				var id = li.dataset.id;
				var input = qs('input', li);
				handler(id,{
					completed: input.checked
				});	
			});
		}

		else if(type === 'toggleAll') {
			$live('#toggle-all', 'click', function(){
				handler({
					completed: this.checked
				});	
			});
		}
		else if(type === 'editItem') {
			$live('#todo-list li label', 'dblclick', function() {
				var li = $parent(this, 'li');
				var id = parseInt(li.dataset.id, 10);
				handler(id, this.textContent);
			})
		}
		else if(type === 'editItemCancel') {
			$live('#todo-list .edit', 'keyup', function() {
				if(event.keyCode == that.ESCAPE_KEY) {
					that.isCanceled = true;
					var li = $parent(this, 'li');
					var id = parseInt(li.dataset.id, 10);
					handler(id);
				}
			});
		}
		else if(type === 'editItemDone') {
			$live('#todo-list .edit', 'blur', function() {
				if(!that.isCanceled) {
					var li = $parent(this, 'li');
					var id = parseInt(li.dataset.id, 10);
					handler(id, this.value);
				}
				else {
					that.isCanceled = false;
				}
			});

			$live('#todo-list .edit', 'keyup', function() {
				if(event.keyCode == that.ENTER_KEY) {
					this.blur();
				}
			})
		}
	}

	View.prototype.clearNewTodo = function() {
		this.$newTodo.value = '';
	}

	View.prototype.removeItem = function (id) {
		var li = qs('li[data-id="' + id + '"]');
		this.$todoList.removeChild(li);
	}

	View.prototype.toggleCompleted = function(id, option) {
		var li = qs('li[data-id="' + id + '"]');
		li.className = option.completed ? 'completed' : '';
	}

	View.prototype.editItemDone = function(id, title) {
		var li = qs('li[data-id="' + id + '"]');
		if(!li) {
			return;
		}
		var input = qs('input.edit', li);
		li.removeChild(input);
		li.className = li.className.replace('editing', '');
		qsa('label', li).forEach(function(label){
			label.textContent = title;
		})
	}

	window.app = window.app || {};
	window.app.View = View;
})();