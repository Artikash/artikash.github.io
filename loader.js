var xhr = new XMLHttpRequest;
xhr.open("GET", window.location.search.slice(1));
xhr.send();
xhr.onload = function () {
	if (!xhr.responseText.startsWith("<!DOCTYPE html>"))
		document.getElementById("blog").innerHTML = xhr.responseText;
};

document.getElementById("archive").querySelectorAll("h3").forEach(function (element) {
	element.style.cursor = "pointer";
	var list = null;
	element.onclick = function () {
		if (list) {
			document.getElementById("archive").removeChild(list);
			list = null;
		} else {
			list = document.createElement("ul");
			var currentPosts = posts[element.innerText];
			if (currentPosts && currentPosts.forEach) {		
				currentPosts.forEach(function (link) {
					list.appendChild(document.createElement("li")).innerHTML = link;
				});
			}
			element.insertAdjacentElement("afterend", list);
		}
	};
});

var posts = {
	"March 2019": [
		"<a href=\"?clipboard_monitor.html\">Clipboard Monitor</a>",
		"<a href=\"?iile.html\">Immediately Invoked Lambda Expressions in C++</a>"
	],
	"February 2019": [
		"<a href=\"?hello_world.html\">Hello World!</a>"
	]
};
