(function(window){

	function Template() {
		this.defaultTemplate = 
			'<li data-id={{id}} class={{completed}}>' +
			'	<div class="view">' +
			'		<input class="toggle" type="checkbox" {{checked}} />' +
			'		<label>{{title}}</label><button class="destroy"></button>' +
			'	</div>' +
			'</li>';
	}

	Template.prototype.getTodosHTML = function(todos) {
		var html = '';
		for (var i = todos.length - 1; i >= 0; i--) {
			var todoItem = todos[i];
			var completed = todoItem.completed ? 'completed' : '';
			var checked = todoItem.completed ? 'checked' : '';
			html += this.defaultTemplate
				.replace('{{id}}', todoItem.id)
				.replace('{{title}}', todoItem.title)
				.replace('{{completed}}', completed)
				.replace('{{checked}}', checked);
		}

		return html;
	}

	Template.prototype.getItemNotCompletedHTML = function(count) {
		return '<strong>' + count + '</strong> not completed';
	}

	Template.prototype.getClearCompletedBtnHTML = function(count) {
 		return 'Clear completed (' + count + ')';
	}


	window.app = window.app || {};
	window.app.Template = Template;
})(window);