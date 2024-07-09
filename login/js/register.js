const Users = JSON.parse(localStorage.getItem('users')) || [];

let userIdCounter = parseInt(localStorage.getItem('userIdCounter')) || 1;

function checkEntrys(){
    let formData = {
        email: document.querySelector('#email').value,
        username: document.querySelector('#username').value,
        password: document.querySelector('#password').value,
        confirmedPassword: document.querySelector('#confirmed_password').value
    }
    for (key in formData){
        if (formData[key] === "" || formData.password !== formData.confirmedPassword){
            return false;
        }
    }
    return formData;
};

function registerUser(user){
    const isRegistered = Users.find(registeredUser => registeredUser.email === user.email);
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

const submit = document.querySelector("#submit");
submit.addEventListener("click", function(){
    event.preventDefault();
    if (!checkEntrys()){
        alert("Por favor, llena todos los campos");
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

