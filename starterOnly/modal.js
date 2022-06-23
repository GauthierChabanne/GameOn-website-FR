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
const emailInput = document.querySelector("#email");
const birthDateInput = document.querySelector("#birthdate");
const quantityInput = document.querySelector("#quantity");
let checkedCheckboxInput = null;
const conditionCheckboxInput = document.querySelector("#checkbox1")
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
  //Va permettre de stocker les erreurs du formulaire
  errors = []
  checkedCheckboxInput = document.querySelector("input[name='location']:checked")
  //check si le prénom n'est pas vide, a plus de 2 caractères, et à un format valide
  if (firstNameInput.value === "" || firstNameInput.value.length < 2 || /([aA-zZ]*)([\\s\\\'-][aA-zZ]*)*/.test(firstNameInput.value) == false) {
    //en cas d'erreur, stock le nom de l'erreur dans l'array errors
    errors.push("first-name-error");
  };

  //Check le nom exactement pareil que pour le prénom
  if (lastNameInput.value === "" || lastNameInput.value.length < 2 || /([aA-zZ]*)([\\s\\\'-][aA-zZ]*)*/.test(lastNameInput.value) == false) {
    errors.push("last-name-error");
  }

  //Check que l'adresse mail rentrée correspond bien à une adresse mail réglementaire grâce à une regex
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.value) === false) {
    errors.push("email-error");
  }

  //Check que la date ne soit pas vide
  if (birthDateInput.value === "") {
    errors.push("birthdate-error");
  }

  //Check qu'est bien été rentré un nombre grâce à une regex
  if (/[0-9]+/.test(quantityInput.value) === false) {
    errors.push("quantity-error");
  }

  // Vérifie qu'au moins un des radios buttons avec le nom location a été coché en echeckant si il en existe au moins un
  // avec l'attribut checked
  if (checkedCheckboxInput == null) {
    errors.push("location-error");
  }

  // Vérifie que la checkbox condition d'utilisation est bien checké
  if (conditionCheckboxInput.checked == false) {
    errors.push("utilisation-condition-error");
  }
  return errors;
}

// Function qui va se lancé dès la soumission du formulaire
form.addEventListener("submit", function(e) {
  // empêche le rechargement de la page
  e.preventDefault();
  // fait disparaître chacun des messages d'erreurs.
  errorMessages.forEach(errorMessage => {
      errorMessage.style.display = "none";
  })
  // lance la fonction pour vérifier que les champs rentrés dans le formulaire sont valides
  validate();
  //Si aucune erreur est décelé
  if (errors.length === 0) {
    //envoie la valeur de tous les champs rentrées dans le formulaire sur la console
    console.log(firstNameInput.value, lastNameInput.value, emailInput.value, birthDateInput.value, quantityInput.value, checkedCheckboxInput.value, conditionCheckboxInput.value)
    //rénitialise tous les champs du formulaire pour une future utilisation
    formData.forEach(data => {
      data.querySelector("input").value = ""
    });
    checkedCheckboxInput.checked = false
    //ferme la modale avec le formulaire
    closeFormModal();
    // montre la modale avec le message de succès
    validationModalbg.style.display = "block";
    //en cas de détection d'une ou plusieurs erreurs
  } else {
    // check le nom de chacune des erreurs dans errors
    errors.forEach(error => {
      //compare le nom de l'erreur avec l'id de chacun des messages d'erreur
      errorMessages.forEach(errorMessage => {
        //Si l'erreur et l'un des messages d'erreur ont le même nom
        if(errorMessage.id == error) {
          //Montre le message d'erreur
          errorMessage.style.display = "block";
        }
      })
    })
  }
})
