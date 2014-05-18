var app = app || {};

(function  () {
	'use strict';

	app.AppView = Backbone.View.extend({
		el: '#todoapp',

		statsTemplate: _.template($('#stats-template').html()),

		initialize: function() {
			this.$input = $('#new-todo');
			this.$todoList = $('#todo-list');
			this.listenTo(app.todos, 'add', this.addOne);
		},

		events: {
			'keypress #new-todo': 'createOnEnter'
		},

		render: function() {
			
		},

		createOnEnter: function(ev) {
			if(ev.which === ENTER_KEY && this.$input.val().trim() != '') {
				app.todos.create(this.newAttributes());
				this.$input.val('');
			}
		},

		newAttributes: function() {
			return {
				title: this.$input.val().trim(),
				completed: false,
				order: app.todos.nextOrder()
			};
		},
		addOne: function(todo) {
			var $todoView = new app.TodoView({model:todo});
			this.$todoList.append($todoView.render().el);
		}
	});
})();