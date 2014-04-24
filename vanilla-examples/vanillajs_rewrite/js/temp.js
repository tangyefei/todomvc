/*
todo learning progress:
1. read the html and css style：some skills are really useful
	* using ':before' muti places
	* rotate the '>>'
	* hide input by using 'apperance:false'
2. write self's javascript code one by one:requests
	* add item
	* mark item as completed
	* delete item
	* count items not completed 
	* transfer between all/completed/active
	* clear completed item
	* swich all item's request
*/
(function(){
	window.onload = function(){
		
		var newTodo = document.getElementById('new-todo');
		var storage = new Storage('vanillajs-todomvc');
		document.addEventListener('click', function(ev) {
			if(ev.target !== newTodo) {
				if(newTodo.value && newTodo.value.trim() != '') {
					//alert(newTodo.value);
					storage.add(newTodo.value);
					newTodo.value = '';
					newTodo.focus();
					//TODO when add click event on other's element,remember to return false to prevent progation
				}
			}
		});
		document.addEventListener('keyup', function  (ev) {
			if(ev.keyCode == 13) {
				if(newTodo.value && newTodo.value.trim() != '') {
					//alert(newTodo.value);
					storage.add(newTodo.value);
					newTodo.value = '';
					newTodo.focus();
				}
			}
		})

	}
})();
