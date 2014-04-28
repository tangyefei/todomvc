(function(window){

	function Template() {
		this.defaultTemplate = 
			'<li class={{completed}}>' +
			'	<div class="view">' +
			'		<input class="toggle" type="checkbox" {{checked}} />' +
			'		<label>{{title}}</label><button class="destroy"></button>' +
			'	</div>' +
			'</li>';
	}

	Template.prototype.show = function(todoItem) {
		var completed = todoItem.value ? 'completed' : '';
		var checked = todoItem.value ? 'checked' : '';
		var tp = this.defaultTemplate
			.replace('{{title}}',todoItem.name)
			.replace('{{completed}}', completed)
			.replace('{{checked}}', checked);

		return tp;
	}

	Template.prototype.clearCompleted = function(completedCount) {
 		return 'Clear completed (' + completedCount + ')';
	}

	Template.prototype.notCompleted = function(leftCount) {
		return leftCount > 0 ? ('<strong>' + leftCount + '</strong> not completed') : '';
	}

	window.app = window.app || {};
	window.app.Template = Template;
})(window);