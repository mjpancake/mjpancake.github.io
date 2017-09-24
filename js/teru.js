var teru = {};

teru.send = function(method, api, msg, onSuccess) {
	var ip = "118.89.219.207";
	//var ip = "127.0.0.1";
    var url = "http://" + ip + ":8080" + api;

    xmlhttp = new XMLHttpRequest();
    xmlhttp.open(method, url, true);
    xmlhttp.setRequestHeader("Content-type", "application/json");

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
