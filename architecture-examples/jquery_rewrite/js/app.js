/*global jQuery, Handlebars */
jQuery(function ($) {

	Handlebars.registerHelper('eq', function(val, val2, block) {
      if(val == val2){
        return block.fn(this);
      }
      else {
      	return block.inverse(this);
      }
    });

	var ENTER_KEY = 13;
	var ESCAPE_KEY = 27;
	var util = {
		store: function(namespace, data) {
			if(arguments.length == 1) {
				var store = localStorage.getItem(namespace);
				return (store && JSON.parse(store)) || [];
			}
			else{
				localStorage.setItem(namespace, JSON.stringify(data));
			}
		},
		pluralize: function(count, item) {
			return count == 1 ? item : (item + 's');
		},

		uuid: function () {
			/*jshint bitwise:false */
			var i, random;
			var uuid = '';

			for (i = 0; i < 32; i++) {
				random = Math.random() * 16 | 0;
				if (i === 8 || i === 12 || i === 16 || i === 20) {
					uuid += '-';
				}
				uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
			}

			return uuid;
		},
	};
	var App = {
		init:function(namespace) {
			this.namespace = namespace;
			this.todos = util.store(namespace);
			this.cacheElements();
			Router({
				'/:filter': function(filter) {
					this.filter = filter;
					this.render();
				}.bind(this)
			})
			.init('/all');
			this.bindEvents();
		},
		cacheElements: function() {
			this.todoTemplate = Handlebars.compile($('#todo-template').html());
			this.footerTemplate = Handlebars.compile($('#footer-template').html());
			this.$todoApp = $('#todoapp');
			this.$header = this.$todoApp.find('#header');
			this.$main = this.$todoApp.find('#main');
			this.$footer = this.$todoApp.find('#footer');
			this.$newTodo = this.$header.find('#new-todo');
			this.$toggleAll = this.$main.find('#toggle-all');
			this.$todoList = this.$main.find('#todo-list');
			this.$count = this.$footer.find('#todo-count');
			this.$clearBtn = this.$footer.find('#clear-completed');
		},
		bindEvents: function () {
			var list = this.$todoList;
			this.$newTodo.on('keyup', this.create.bind(this));
			this.$toggleAll.on('change', this.toggleAll.bind(this));
			this.$footer.on('click', '#clear-completed', this.destroyCompleted.bind(this));
			list.on('change', '.toggle', this.toggle.bind(this));
			list.on('dblclick', 'label', this.edit.bind(this));
			list.on('keyup', '.edit', this.editKeyup.bind(this));
			list.on('focusout', '.edit', this.update.bind(this));
			/*this.$toggleAll.on('change', this.toggleAll.bind(this));
			this.$footer.on('click', '#clear-completed', this.destroyCompleted.bind(this));
			list.on('change', '.toggle', this.toggle.bind(this));
			list.on('dblclick', 'label', this.edit.bind(this));
			list.on('keyup', '.edit', this.editKeyup.bind(this));
			list.on('focusout', '.edit', this.update.bind(this));
			list.on('click', '.destroy', this.destroy.bind(this));*/
		},
		create: function(e) {
			var $input = $(e.target);
			var val = $input.val();

			if(e.which != ENTER_KEY || !val) {
				return;
			}

			this.todos.push({
				id: util.uuid(),
				title: val, 
				completed: false
			});

			$input.val('');
			this.render();
		},

		edit: function(e) {
			var $input = $(e.target).closest('li').addClass('editing').find('.edit');
			$input.val($input.val()).focus();
		},

		editKeyup: function(e) {
			if(e.which === ENTER_KEY) {
				$(e.target).blur();
			}

			if(e.which === ESCAPE_KEY) {
				$(e.target).closest('li').data('abort', true).find('.edit').blur();
			}
		},

		update: function(e) {
			
		},

		toggleAll: function(e) {
			var checked = $(e.target).prop('checked');
			this.todos.forEach(function(todo) {
				todo.completed = checked;
			});
			this.render();
		},

		toggle: function(e) {
			var index = this.indexFromEl(e);
			if(index >= 0) {
				this.todos[index].completed = !this.todos[index].completed;
				this.render();
			}
		},

		indexFromEl: function(e) {
			var id = $(e.target).closest('li').data('id');
			var todos = this.todos;
			var i = todos.length;
			while(i--) {
				if(id === todos[i].id) {
					return i;
				}
			}
		},

		destroyCompleted: function() {
			this.todos = this.getActiveTodos();
			this.filter = 'all';
			this.render();
		},

		render: function() {
			this.$todoList.html(this.todoTemplate(this.todos));
			this.$main.toggle(this.todos.length > 0);
			this.$toggleAll.prop('checked', this.getActiveTodos().length == 0);
			this.renderFooter();
			this.$newTodo.focus();
			util.store(this.namespace, this.todos);
		},

		renderFooter: function() {
			var activeTodosCount = this.getActiveTodos().length;
			var data = {
				activeTodosCount: activeTodosCount,
				completedTodosCount: this.todos.length - activeTodosCount,
				activeTodosWord: util.pluralize(activeTodosCount, 'item'),
				filter: this.filter
			};
			this.$footer.toggle(this.todos.length > 0).html(this.footerTemplate(data));
		},

		getActiveTodos: function() {
			return this.todos.filter(function(todo) {
				return !todo.completed;
			});
		},
	};

	App.init('todomvc-jquery-rewrite');
});