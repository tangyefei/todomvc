var app = app || {};

(function() {
	'use strict';

	app.TodoView = Backbone.View.extend({

		tagName: 'li',

		tempTemplate: _.template($('#item-template').html()),

		events: {
			'click .toggle': 'toggleCompleted',
			'dblclick label': 'onEdit',
			'click .destroy': 'clear',
			'keypress .edit': 'updateOnEnter',	
			'keydown .edit': 'revertOnEscape',
			'blur .edit': 'close'
		},

		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
			this.listenTo(this.model, 'visible', this.toggleVisible);
		},

		render: function() {
			this.$el.html(this.tempTemplate(this.model.toJSON()));
			this.$el.toggleClass('completed', this.model.get('completed'));
			this.$input = this.$('.edit');
			return this;	
		},

		updateOnEnter: function(ev) {
			if(ev.which === ENTER_KEY) {
				this.close();
			}
		},
		revertOnEscape: function(ev) {
			if(ev.which === ESC_KEY) {
				this.$el.removeClass('editing');
			}
		},

		clear: function() {
			this.model.destroy();
		},


		toggleCompleted: function() {
			this.model.toggle();
		},

		toggleVisible: function() {
			this.$el.toggleClass('hidden', this.isHidden());
		},

		isHidden: function() {
			var isCompleted = this.model.get('completed');
			return (isCompleted && app.TodoFilter === 'active') ||
				(!isCompleted && app.TodoFilter == 'completed');
		},

		onEdit: function(ev) {
			this.$el.addClass('editing');
			this.$input.focus();
		},

		close: function() {
			var value = this.$input.val();
			var trimmedValue = value.trim();

			if(!this.$el.hasClass('editing')) {
				return;
			}

			if(trimmedValue) {
				this.model.save({
					title: trimmedValue
				});
				if(value !== trimmedValue) {
					this.model.trigger('change');
				}
			}
			else
			{
				this.clear();
			}

			this.$el.removeClass('editing');
		}
	});
})();