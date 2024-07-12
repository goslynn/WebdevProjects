const Users = JSON.parse(localStorage.getItem('users')) || [];

//Ordenando listado por id
Users.sort((a,b) => a.id - b.id);

const listado = document.querySelector('#list');
for (let user of Users){
    let userHtml = `
    <li class="list_singleuser">
        <table>
            <tr>
                <th class="table_element_key">Id</th>
                <td class="table_element_value">${user.id}</td>
            </tr>
            <tr>
                <th class="table_element_key">Email</th>
                <td class="table_element_value">
                    <form id="editable_user_data_form">
                        <input class="editable_user_data_input" value="${user.email}"  id="${user.id}" name="email" disabled >
                    </form>
                </td>
            </tr>
            <tr>
                <th class="table_element_key">Usuario</th>
                <td class="table_element_value">
                    <form id="editable_user_data_form">
                        <input class="editable_user_data_input" value="${user.username}" id="${user.id}" name="username" disabled >
                    </form>
                </td>
            </tr>
            <tr>
                <th class="table_element_key">Contraseña</th>
                <td class="table_element_value">
                    <form id="editable_user_data_form">
                        <input class="editable_user_data_input" value="${user.password}" id="${user.id}" name="password" disabled >
                    </form>
                </td>
            </tr>
        </table>
        <div class="buttons_set">
            <button id="info" value=${user.id}>
                <div class="icon_container">
                    <img class="icon" src="img/info.svg" />
                </div>
            </button>
            <button id="edit" value=${user.id}>
                <div class="icon_container">
                    <img class="icon" src="img/edit.svg" />
                </div>
            </button>
            <button id="delete" value=${user.id}>
                <div class="icon_container">
                    <img class="icon" src="img/trash.svg" />
                </div>
            </button>
        </div>
    </li>
    <button type="submit" form="editable_user_data_form" id="submit_new_user_data" value=${user.id}>CONFIRMAR</button>
    `;
    listado.insertAdjacentHTML('beforeend', userHtml);
}

// nose para que servira esto
const singleUser = document.querySelectorAll('.list_singleuser');


// Eliminar
const deleteUserPopup = document.querySelector('#delete_user_popup');
const deleteUsereCancel = document.querySelector('#cancel')
const deleteUserConfirm = document.querySelector('#confirm')
const deleteButtons = document.querySelectorAll('#delete');

// Note to self: No nestear eventListeners pq queda la zorra

deleteUsereCancel.addEventListener('click', () => {
    deleteUserPopup.close();
});

deleteUserConfirm.addEventListener('click', () => {
    deleteUserPopup.close();
    let adminPassword = window.prompt('password');
    if (adminPassword !== 'admin') {
        window.alert('Contraseña incorrecta');
        return;
    }
    const thisUserId = parseInt(deleteUserConfirm.dataset.userId);
    if (thisUserId === 0){
        window.alert('No puedes eliminar al admin');
        return;
    }
    Users = Users.filter(user => user.id !== thisUserId);
    localStorage.setItem('users', JSON.stringify(Users));
    window.location.reload();
});

deleteButtons.forEach(button =>{
    button.addEventListener('click', () => {
        deleteUserPopup.showModal();
        deleteUserConfirm.dataset.userId = button.value; // Guardar el ID del usuario en un atributo de datos
    });
});


//Editarz

const editButtons = document.querySelectorAll('#edit');
const editableUserData = document.querySelectorAll('.editable_user_data_input');
const submitNewUserData = document.querySelector('#submit_new_user_data');

submitNewUserData.addEventListener('click', function(event){
    event.preventDefault();
    
    const inputedEmail = document.querySelector('.editable_user_data_input[name="email"]').value;
    const inputedUsername = document.querySelector('.editable_user_data_input[name="username"]').value;
    const inputedPassword = document.querySelector('.editable_user_data_input[name="password"]').value;
    
    const userId = submitNewUserData.value;
    
    let user = Users.find(storedUser => storedUser.id === userId);
    
    if (user) {
        user.email = inputedEmail;
        user.username = inputedUsername;
        user.password = inputedPassword;
        
        Users = Users.map(storedUser => storedUser.id === userId ? user : storedUser);
        localStorage.setItem('users', JSON.stringify(Users));
    } else {
        console.log('User not found');
    }
});

editButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(button.value)
        const userId = parseInt(button.value);
        const user = Users.find(user => user.id === userId);
        const thisEditableUserData = document.querySelectorAll(`.editable_user_data_input[id="${userId}"]`);
        thisEditableUserData.forEach(input => {
            if (input.disabled){
                input.disabled = false;
                input.focus();  
            }
        });
    });
});