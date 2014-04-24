(function() {

	function Storage(name)
	{
		this._dbName = name;
		if(!localStorage[_dbName])
		{
			var todos = {todos:[]};
			localStorage[_dbName] = JSON.stringify(todos);
		}
	}

	Storage.prototype.add = function(item) {
		if(localStorage[_dbName])
		{
			var todos = JSON.parse(localStorage[_dbName]).todos;
			todos.push(item);
			localStorage[_dbName] = JSON.stringify(todos);
		}
	}

})();