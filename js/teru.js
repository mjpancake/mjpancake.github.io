// ===========================================================
// teru.js
// Copyright 2017 Rolevax
// ===========================================================

var teru = {};

teru.send = function(method, api, msg, onSuccess) {
	var domain = "cn.rolevax.xyz";
	//var domain = "127.0.0.1";
    var url = "https://" + domain + api;

    xmlhttp = new XMLHttpRequest();
    xmlhttp.open(method, url, true);
    xmlhttp.setRequestHeader("Content-type", "application/json");

	var jwt = localStorage.getItem("jwt");
	if (jwt)
		xmlhttp.setRequestHeader("Authorization", "Bearer " + jwt);

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var sc = JSON.parse(xmlhttp.responseText);
            onSuccess(sc);
        } else {
            console.log("ajax " + xmlhttp.readyState + " " + xmlhttp.status);
        }
    };

    xmlhttp.send(msg);
}

teru.makeSureLoggedIn = function(onSuccess) {
	function gotoLoginPage() {
		sessionStorage.setItem('prevPage', window.location.href);
		window.location.href = "/login";
	}

	var jwt = localStorage.getItem('jwt');
	if (jwt) {
		teru.send("GET", "/my/null", "", function(sc) {
			if (sc.Error) {
				localStorage.setItem('jwt', '');
				gotoLoginPage();
			} else {
				onSuccess();
			}
		});
	} else {
		gotoLoginPage();
	}
};

teru.onLoggedIn = function(sc) {
	console.log("login res: " + sc.Jwt);

	localStorage.setItem('jwt', sc.Jwt);
	localStorage.setItem('user.id', sc.User.Id);
	localStorage.setItem('user.username', sc.User.Username);

	var prevPage = sessionStorage.getItem('prevPage');
	if (!prevPage)
		prevPage = "/";

	window.location.href = prevPage;
};

teru.getUser = function() {
	return {
		Id: localStorage.getItem("user.id"),
		Username: localStorage.getItem("user.username"),
	};
};

// end of teru.js

