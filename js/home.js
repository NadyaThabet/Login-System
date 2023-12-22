var welcomeUser = document.querySelector(".welcomeUser");
var logoutBtn = document.querySelector(".logoutBtn");

if (localStorage.getItem("users") !== null) {
  users = JSON.parse(localStorage.getItem("users"));
}

var loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

for (var i = 0; i < users.length; i++) {
  if (users[i].email === loggedInUserEmail) {
    welcomeUser.innerHTML = `Welcome <span class="text-warning fst-italic ">${users[i].name}</span>`;
    break;
  }
}

logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("loggedInUserEmail");
  window.location.href = "index.html";
});
