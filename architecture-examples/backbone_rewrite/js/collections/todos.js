var app = app || {};

(function() {
	var Todos = Backbone.Collection.extend({

		model:app.Todo,
		
		localStorage: new Backbone.LocalStorage('backbone-todos-rewrite'),

		nextOrder: function() {
			if(!this.length)
				return 1;
			return this.last().get('order') + 1;
		}
	});

	app.todos = new Todos();
})();
