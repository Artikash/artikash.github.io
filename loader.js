var xhr = new XMLHttpRequest;
xhr.open("GET", window.location.search.slice(1));
xhr.send();
xhr.onload = function () {
	if (!xhr.responseText.startsWith("<!DOCTYPE html>"))
		document.getElementById("blog").innerHTML = xhr.responseText;
}
