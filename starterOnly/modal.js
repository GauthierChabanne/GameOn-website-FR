function editNav() {
  var x = document.querySelector("#myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const formModalbg = document.querySelector("#form-modal");
const validationModalbg = document.querySelector("#validation-modal");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
//form
const form = document.querySelector("form");

//inputs
const firstNameInput = document.querySelector("#first");
const lastNameInput = document.querySelector("#last");

//error messages
const errorMessages = document.querySelectorAll(".error-message")

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  formModalbg.style.display = "block";
}

// close modal form
function closeFormModal() {
  formModalbg.style.display = "none";
}

//close Validation modal
function closeValidationModal() {
  validationModalbg.style.display = "none"
}

// Regarde si les informations remplies sont valides
function validate() {

  errors = []

  //check si le prénom n'est pas vide et a plus de 2 caractères
  if (firstNameInput.value === "" || firstNameInput.value.length < 2 || /([aA-zZ]*)([\\s\\\'-][aA-zZ]*)*/.test(firstNameInput.value) == false) {
    errors.push("first-name-error");
  };

  //Check le nom exactement pareil que pour le prénom
  if (lastNameInput.value === "" || lastNameInput.value.length < 2 || /([aA-zZ]*)([\\s\\\'-][aA-zZ]*)*/.test(lastNameInput.value) == false) {
    errors.push("last-name-error");
  }

  //Check que l'adresse mail rentrée correspond bien à une adresse mail réglementaire grâce à une regex
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.querySelector("#email").value) === false) {
    errors.push("email-error");
  }

  //Check que la date ne soit pas vide
  if (document.querySelector("#birthdate").value === "") {
    errors.push("birthdate-error");
  }

  //Check qu'est bien été rentré un nombre grâce à une regex
  if (/[0-9]+/.test(document.querySelector("#quantity").value) === false) {
    errors.push("quantity-error");
  }

  // Vérifie qu'au moins un des radios buttons avec le nom location a été coché en echeckant si il en existe au moins un
  // avec l'attribut checked
  if (document.querySelector("input[name='location']:checked") == null) {
    errors.push("location-error");
  }

  // Vérifie que la checkbox condition d'utilisation est bien checké
  if (document.querySelector("#checkbox1").checked == false) {
    errors.push("utilisation-condition-error");
  }
  return errors;
}

form.addEventListener("submit", function(e) {
  console.log("Hello");
  e.preventDefault();
  validate();
  if (errors.length === 0) {
    formData.forEach(data => {
      data.querySelector("input").value = ""
    });
    closeFormModal();
    validationModalbg.style.display = "block";
  } else {
    errors.forEach(error => {
      errorMessages.forEach(errorMessage => {
        if(errorMessage.id == error) {
          errorMessage.style.display = "block";
        }
      })
    })
  }
})
