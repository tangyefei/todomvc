var app = app || {};

(function() {
	app.TodoView = Backbone.View.extend({

		tagName: 'li',

		tempTemplate: _.template($('#item-template').html()),

		events: {
			'click .toggle': 'toggleCompleted'
		},

		render: function() {
			this.$el.html(this.tempTemplate(this.model.toJSON()));
			return this;	
		},

		toggleCompleted: function() {
			this.model.toggle();
		}
	});
})();