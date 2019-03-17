var xhr = new XMLHttpRequest();
xhr.open("GET", (window.location.search || "doesnt_exist").slice(1));
xhr.send();
xhr.onload = function () {
	document.getElementById("blog").innerHTML = xhr.responseText.slice(0, 15) === "<!DOCTYPE html>"
		? recentPosts
		: xhr.responseText;
};

for (var i = 0, elements = document.getElementById("archive").querySelectorAll("h3"); i < elements.length; ++i) {
	(function (element) {
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
	})(elements[i]);
}

var posts = {
	"March 2019": [
		"<a href=\"?clipboard_monitor.html\">Clipboard Monitor</a>",
		"<a href=\"?iile.html\">Immediately Invoked Lambda Expressions in C++</a>"
	],
	"February 2019": [
		"<a href=\"?hello_world.html\">Hello World!</a>"
	]
};

var recentPosts = "<h2>Recent Posts</h2>";
["March 2019", "February 2019"].forEach(function (month) {
	for (var i = 0; i < posts[month].length; ++i) {
		recentPosts += "<h3>" + posts[month][i] + "</h3>";
	}
});
