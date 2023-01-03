$(document).ready(function() {
	$('a[href^="http://"],a[href^="https://"]')
		.not("[href*='"+location.host+"']")
        .click(function(e) {
        	var url = this.href;
          	e.preventDefault();
           	window.open(url);
        });
});