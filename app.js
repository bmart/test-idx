// var commonOptions = {};
// commonOptions.apiKey = "682843b1-d3e0-460e-ab90-6556bc31470f";
// commonOptions.appName = "postmedia-dev";
var LRObject = new LoginRadiusV2(commonOptions);

/* Site Branding */
var siteName = window.location.host.split('.')[0];
var returnUrl = `http://${siteName}.local:8080`;

/* array of handlers for SSO experience */
var check_options = {};

/*
https://<LoginRadius site
name>.hub.loginradius.com/auth.aspx?action=login&return_url=<Return URL>
*/


var setSignInState = (isLoggedIn) => {
    const loginBtn = document.querySelector('#sso_login_btn'); 
    const logoutBtn = document.querySelector('#sso_logout_btn');

    if(isLoggedIn) {
        loginBtn.style.visibility = 'hidden';
        logoutBtn.style.visibility = 'visible';
    } else {
        loginBtn.style.visibility = 'visible'; 
        logoutBtn.style.visibility = 'hidden'; 
    }
}

var getProfileByToken = (token) => {
    var xhr = new XMLHttpRequest();
    url = `https://api.loginradius.com/identity/v2/auth/account?apiKey=${commonOptions.apiKey}&access_token=${token}`;
    xhr.open("GET", url);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
     xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          console.log(xhr.response);
        }
      }
}


check_options.onError = function () {
    console.log('user is not logged in');
    setSignInState(false);

};

check_options.onSuccess = function (response) {
    // On Success
    // If a customer is logged in then this function will execute.
    console.log('User is logged in with token: ' + response);
    setSignInState(true);

    // dump profile data to console
    getProfileByToken(response);

};

LRObject.util.ready(function () {
    const siteTitle = document.querySelector('#site_title')
    siteTitle.innerHTML = siteName;

    document.addEventListener('click', (event) => {
        if(event.target.id == 'sso_login_btn') {
             //window.location = `https://postmedia-dev.hub.loginradius.com/auth.aspx?action=login&return_url=${returnUrl}`;
            window.location = `https://cloud-api.loginradius.com/sso/jwt/redirect/token?apikey=${commonOptions.apiKey}&jwtapp=news-websites&return_url=${returnUrl}`
        }
        if(event.target.id == 'sso_logout_btn') {
            window.location = `${returnUrl}/logout.html`
        }
    }, false);

    LRObject.init("ssoNotLoginThenLogout", check_options);
});
