var app = app || {};

(function  () {
	'use strict';

	app.AppView = Backbone.View.extend({
		el: '#todoapp',

		statsTemplate: _.template($('#stats-template').html()),

		initialize: function() {
			this.$input = $('#new-todo');
			this.$todoList = $('#todo-list');
			this.$main = $('#main');
			this.$footer =  $('#footer')

			this.listenTo(app.todos, 'add', this.addOne);
			this.listenTo(app.todos, 'reset', this.addAll);
			this.listenTo(app.todos, 'all', this.render);

			app.todos.fetch({reset:true});
		},

		events: {
			'keypress #new-todo': 'createOnEnter'
		},

		render: function() {
			var completeds = app.todos.filter(function(todo){return todo.get('completed');});
			var remaings = app.todos.filter(function(todo){return !todo.get('completed');});
			
			if(app.todos.length) {
				this.$main.show();
				this.$footer.show();
				this.$footer.html(this.statsTemplate({
					completed: completeds.length,
					remaining: remaings.length
				} ));

				this.$el.find('#filters li a')
					.removeClass('selected')
					.filter('[href="#/'+ app.TodoFilter +'"]')
					.addClass('selected');
			}
			else
			{
				this.$main.hide();
				this.$footer.hide();
			}
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
		},

		addAll: function() {
			app.todos.each(this.addOne, this);
		}
	});
})();