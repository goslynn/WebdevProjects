// Hacer conexion con base de datos
// Mejorar el css
// manejo de excepciones y mensajes de error al usuario
// Lista de usuarios
// Valida si el usuario y contraseña son correctos
const admin = {
    email: 'none@gmail.com',
    username: 'admin',
    password: 'admin',
    id: 0,
}

const Users = JSON.parse(localStorage.getItem('users')) || [];

const adminIsRegistered = Users.find(registeredUser => registeredUser.email === admin.email);
if (!adminIsRegistered){
    Users.push(admin);
    localStorage.setItem('users', JSON.stringify(Users));
}

function login(username, password) {
    for (let i = 0; i < Users.length; i++) {
        if (Users[i].username === username && Users[i].password === password) {
            return "success";
        }
    }
    return "fail";
}


// Funcion que obtiene los input al presionar el boton y verifica el usuario
const submit = document.querySelector("#submit");
submit.addEventListener("click", function(){
    event.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    const loginResult = login(username, password);
    if (username === admin.username && password === admin.password) {
        window.location.href = "admin.html";
    }
    else if (loginResult === "success") {
        window.location.href = "home.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
})


