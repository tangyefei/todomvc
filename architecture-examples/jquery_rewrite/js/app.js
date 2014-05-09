/*global jQuery, Handlebars */
jQuery(function ($) {

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
			this.$newTodo.on('keyup', this.create.bind(this));
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
		render: function() {
			this.$todoList.html(this.todoTemplate(this.todos));
			util.store(this.namespace, this.todos);
		}
	};

	App.init('todomvc-jquery-rewrite');
});