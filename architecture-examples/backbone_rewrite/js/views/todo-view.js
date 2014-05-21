var app = app || {};

(function() {
	app.TodoView = Backbone.View.extend({

		tagName: 'li',

		tempTemplate: _.template($('#item-template').html()),

		events: {
			'click .toggle': 'toggleCompleted',
			'click .destroy': 'clear'
		},

		clear: function() {
			this.model.destroy();
		},

		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
		},

		render: function() {
			this.$el.html(this.tempTemplate(this.model.toJSON()));
			this.$el.toggleClass('completed', this.model.get('completed'));
			return this;	
		},

		toggleCompleted: function() {
			this.model.toggle();
		}

	});
})();