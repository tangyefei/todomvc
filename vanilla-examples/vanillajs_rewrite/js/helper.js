(function(){
	function Helper() {}

	Helper.prototype.getStatus = function  (href) {
		href = href || window.location.href;

		if(href.substring(href.length - 8, href.length) == '#/active')
		{
			return 1;
		}
		else if(href.substring(href.length - 11, href.length) == '#/completed')
		{
			return -1;
		}
		return 0;
	}

	window.app = window.app || {};
	window.app.ALL = 0;
	window.app.COMPLETED = -1;
	window.app.ACTIVE = 1;
	window.app.status = 0;  // -1 completed, 1 not completed
	window.Helper = Helper;
/*
	Helper.prototype.setStatus = function  (status) {
		app.status = status;
	}*/
})();
