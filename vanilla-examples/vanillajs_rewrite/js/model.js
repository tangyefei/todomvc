(function (window) {
	function Model (store) {
		this.store = store;
	}

	window.app = window.app || {};
	window.app.Model = Model;
})(window);