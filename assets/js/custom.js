$(document).ready(function() {
	$('a[href^="http://"],a[href^="https://"]')
		.not("[href*='"+location.host+"']")
        .click(function(e) {
        	var url = this.href;
          	e.preventDefault();
           	window.open(url);
        });
});

// if browsing to the root of the github.io site, redirect to the custom domain
if (window.location.hostname == "cjerrington.github.io" && 
    window.location.pathname=="" ) {
   window.location.href = 'https://claytonerrington.com'; 
}