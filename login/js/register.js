

const Users = JSON.parse(localStorage.getItem('users')) || [];

let userIdCounter = parseInt(localStorage.getItem('userIdCounter')) || 1;

function checkEntrys(){
    let formData = {
        email: document.querySelector('#email').value,
        username: document.querySelector('#username').value,
        password: document.querySelector('#password').value,
        confirmedPassword: document.querySelector('#confirmed_password').value
    }
    
    // Verificar si las contraseñas coinciden
    if (formData.password !== formData.confirmedPassword){
        alert("Las contraseñas no coinciden");
        return false;
    }

    // Verificar si tiene al menos 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial
    const specialCharacters = ['!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', "\\", ']', '^', '_', '`', '{', '|', '}', '~']
    let hasSpecialCharacters = specialCharacters.some(character => formData.password.includes(character)) 
    let hasUppercase = /[A-Z]/.test(formData.password)
    let hasLowercase = /[a-z]/.test(formData.password)
    let hasNumber = /[0-9]/.test(formData.password)
    
    console.log(hasSpecialCharacters, hasUppercase, hasLowercase, hasNumber)
    
    if (!hasSpecialCharacters || !hasUppercase || !hasLowercase || !hasNumber) {
        let missingRequirements = [];
        
        if (!hasSpecialCharacters) missingRequirements.push('1 carácter especial');
        if (!hasUppercase) missingRequirements.push('1 letra mayúscula');
        if (!hasLowercase) missingRequirements.push('1 letra minúscula');
        if (!hasNumber) missingRequirements.push('1 número');
        
        alert(`La contraseña debe contener al menos ${missingRequirements.join(', ')}.`);
        return false;
    }
    
    return formData;
};

function registerUser(user){
    const isRegistered = Users.find(registeredUser => registeredUser.username === user.username);
    if (isRegistered){
        return alert("Este usuario ya está registrado");
    }
    
    // Ejecuta en orden, asigna id, incrementa en 1, guarda en localstorage
    user.id = userIdCounter;
    userIdCounter++;
    localStorage.setItem('userIdCounter', userIdCounter);
    
    Users.push(user);
    localStorage.setItem('users', JSON.stringify(Users))
    alert("Usuario registrado con exito");
}

const form = document.querySelector('#register');
const submit = document.querySelector("#submit");
submit.addEventListener("click", function(){
    event.preventDefault();
    
    // Verificar si el formulario es válido según la validación de HTML
    if (!form.checkValidity()) {
        // Mostrar los mensajes de error del navegador
        form.reportValidity();
        return;
    }
    
    // Verificacion personalizada
    if (!checkEntrys()){
        return;
    }
    else {
        const user = {
            email: document.querySelector('#email').value,
            username: document.querySelector('#username').value,
            password: document.querySelector('#password').value
        }
        registerUser(user);
        window.location.href = "login.html";
    }
});

// Show password

document.addEventListener("DOMContentLoaded", function() {
    const passwordInputFields = document.querySelectorAll('input[type="password"]');
    const showPasswordButtons = document.querySelectorAll('.showPassword');

    passwordInputFields.forEach(field => {
        // Añadir la clase 'show' cuando el campo recibe el enfoque
        field.addEventListener("focus", function() {
            this.nextElementSibling.classList.add('show');
        });

        // Quitar la clase 'show' cuando el campo pierde el enfoque
        field.addEventListener("focusout", function(event) {
            setTimeout(() => {
                // Si el botón de mostrar contraseña está enfocado o el clic está en el botón de mostrar
                if (!this.nextElementSibling.contains(document.activeElement)) {
                    this.nextElementSibling.classList.remove('show');
                }
            }, 100);
        });
    });

    showPasswordButtons.forEach(button => {
        button.addEventListener("mousedown", function(event) {
            event.preventDefault(); // Previene el evento de focusout del campo de contraseña
            const passwordField = this.previousElementSibling;
            if (passwordField.type === "password") {
                passwordField.type = "text";
                const showButton = this.querySelector('img');
                showButton.src = "img/eyeopen.svg";
            } else {
                passwordField.type = "password";
                const showButton = this.querySelector('img');
                showButton.src = "img/eyeclosed.svg";
            }
        });
    });

 
    // Quitar la clase 'show' si se hace clic fuera de los campos de entrada y los botones
    document.addEventListener("click", function(event) {
        const isClickInside = Array.from(passwordInputFields).some(field => field.contains(event.target) || field.nextElementSibling.contains(event.target));
        if (!isClickInside) {
            showPasswordButtons.forEach(button => {
                button.classList.remove('show');
            });
        }
    });
});