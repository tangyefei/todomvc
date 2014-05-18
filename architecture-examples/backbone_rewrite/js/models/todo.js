var app = app || {};

(function() {
	app.Model = Backbone.Model.extend({
		defaults:{
			title: '', 
			completed: false
		},

		toggle: function() {
			this.save({
				completed: !this.get('completed')
			});
		}
	});
})();