var nameInput = document.querySelector(".nameInput");
var nameAlert = document.querySelector(".nameAlert");
var emailInput = document.querySelector(".emailInput");
var emailAlert = document.querySelector(".emailAlert");
var passInput = document.querySelector(".passInput");
var passAlert = document.querySelector(".passAlert");
var signupBtn = document.querySelector(".signupBtn");
var errorAlert = document.querySelector(".errorAlert");

var users = [];

signupBtn.addEventListener("click", function () {
  clearLabels();

  if (
    nameInput.value === "" &&
    emailInput.value === "" &&
    passInput.value === ""
  ) {
    errorAlert.innerHTML = "All fields are required !";
  } else {
    if (nameInput.value === "" || !validateName(nameInput.value)) {
      nameAlert.innerHTML = "Please Enter a Valid Name !";
      nameAlert.classList.add("text-danger", "text-start", "fst-italic");
    } else if (emailInput.value === "" || !validateEmail(emailInput.value)) {
      emailAlert.innerHTML = "Please Enter a Valid Email !";
      emailAlert.classList.replace("text-warning", "text-danger");
    } else if (passInput.value === "" || !validatePassword(passInput.value)) {
      passAlert.innerHTML =
        "Password must be at least 8 characters and includes at least one uppercase letter, one lowercase letter, one digit, and one special character.";
      passAlert.classList.replace("text-warning", "text-danger");
    } else {
      var user = {
        name: nameInput.value,
        email: emailInput.value,
        password: passInput.value,
      };

      if (localStorage.getItem("users") !== null) {
        users = JSON.parse(localStorage.getItem("users"));

        var userExists = false;

        for (var i = 0; i < users.length; i++) {
          if (users[i].email === user.email) {
            userExists = true;
            break;
          }
        }

        if (userExists) {
          errorAlert.innerHTML = "User Already Exists";
        } else {
          users.push(user);
          localStorage.setItem("users", JSON.stringify(users));
          clearForm();
          errorAlert.innerHTML = "Signup is Successful !";
          errorAlert.classList.replace("text-danger", "text-warning");
        }
      } else {
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        clearForm();
        errorAlert.innerHTML = "Signup is Successful !";
        errorAlert.classList.replace("text-danger", "text-success");
      }
    }
  }
});

function clearForm() {
  nameInput.value = "";
  emailInput.value = "";
  passInput.value = "";
}

function clearLabels() {
  nameAlert.innerHTML = "";
  emailAlert.innerHTML = "";
  passAlert.innerHTML = "";
  errorAlert.innerHTML = "";
}

function validateName(userName) {
  var userRegEx = /^[A-za-z  0-9_]{2,40}$/;
  return userRegEx.test(userName);
}

function validateEmail(email) {
  var emailRegEx =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  return emailRegEx.test(email);
}

function validatePassword(pass) {
  var passwordRegEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return passwordRegEx.test(pass);
}
