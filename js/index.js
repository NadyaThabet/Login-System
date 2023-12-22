var emailInput = document.querySelector(".emailInput");
var emailAlert = document.querySelector(".emailAlert");
var passInput = document.querySelector(".passInput");
var passAlert = document.querySelector(".passAlert");
var loginBtn = document.querySelector(".loginBtn");
var errorAlert = document.querySelector(".errorAlert");

var users = [];

loginBtn.addEventListener("click", function () {
  clearLabels();

  if (emailInput.value === "") {
    emailAlert.innerHTML = "Please Enter a Valid Email !";
    emailAlert.classList.add("text-danger");
  } else if (passInput.value === "") {
    passAlert.innerHTML = "Please Enter a Valid Password !";
    passAlert.classList.add("text-danger");
  } else {
    var user = {
      email: emailInput.value,
      password: passInput.value,
    };

    if (localStorage.getItem("users") !== null) {
      users = JSON.parse(localStorage.getItem("users"));

      var userExists = false;

      for (var i = 0; i < users.length; i++) {
        if (
          users[i].email === user.email &&
          users[i].password === user.password
        ) {
          userExists = true;
          break;
        }
      }

      if (!userExists) {
        errorAlert.innerHTML = "User Not Found ! Please Signup !";
        errorAlert.classList.add("text-danger");
      } else {
        localStorage.setItem("loggedInUserEmail", user.email);
        clearLabels();
        window.location.href = "home.html";
      }
    } else {
      errorAlert.innerHTML = "User Not Found ! Please Signup !";
      errorAlert.classList.add("text-danger");
    }
  }
});

function clearLabels() {
  emailAlert.innerHTML = "";
  passAlert.innerHTML = "";
  errorAlert.innerHTML = "";
}
