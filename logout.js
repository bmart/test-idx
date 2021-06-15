var LRObject = new LoginRadiusV2(commonOptions);

/*
https://<LoginRadius site
name>.hub.loginradius.com/auth.aspx?action=login&return_url=<Return URL>
*/

var siteName = window.location.host.split('.')[0];
var returnUrl = `http://${siteName}.local:8080`;

document.addEventListener('click', (event) => {
        if(event.target.id == 'home_btn') {
		window.location = returnUrl;
        }
    }, false);


var logout_options= {};

logout_options.onSuccess = function() {
	console.log('Logged out');
};
LRObject.util.ready(function() {

LRObject.init("logout", logout_options);

});

