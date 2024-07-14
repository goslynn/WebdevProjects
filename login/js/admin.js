// Cargar y ordenar usuarios
const Users = JSON.parse(localStorage.getItem('users')) || [];
Users.sort((a, b) => a.id - b.id);

const listado = document.querySelector('#list');

// Generar HTML para cada usuario
for (let user of Users) {
    let userInfo = JSON.stringify(user);
    let userHtml = `
    <li class="list_singleuser" value="${user.id}">
        <form id="editable_user_data_form_${user.id}" class="editable_user_data_form">
            <div class="user_data_keys">
                <span>Id</span>
                <label for="email_${user.id}">Email</label>
                <label for="username_${user.id}">Username</label>
                <label for="password_${user.id}">Password</label> 
            </div>
            <div class="user_data_values">
                <div class="user_data_values_container" name="${user.id}">
                    <span>${user.id}</span>
                    <input type="text" class="editable_user_data_input" value="${user.email}" name="${user.id}" id="email_${user.id}" disabled> 
                    <input type="text" class="editable_user_data_input" value="${user.username}" name="${user.id}" id="username_${user.id}" disabled> 
                    <input type="text" class="editable_user_data_input" value="${user.password}" name="${user.id}" id="password_${user.id}" disabled> 
                </div>
            </div>
            <button type="submit" class="submit_new_user_data" value="${user.id}">
                <div class="icon_container">
                        <img class="icon" src="img/send.svg" />
                </div>
            </button>
        </form>
        <div class="buttons_set">
            <button class="info" value=${user.id}>
                <dialog class="info_popup" id="info_popup_${user.id}">
                    <p>${userInfo}</p>
                </dialog>
                <div class="icon_container">
                    <img class="icon" src="img/info.svg" />
                </div>
            </button>
            <button class="edit" value=${user.id}>
                <div class="icon_container">
                    <img class="icon" src="img/edit.svg" />
                </div>
            </button>
            <button class="delete" value=${user.id}>
                <div class="icon_container">
                    <img class="icon" src="img/trash.svg" />
                </div>
            </button>
        </div>
    </li>
    `;
    listado.insertAdjacentHTML('beforeend', userHtml);
}

// Eliminar usuario
const deleteUserPopup = document.querySelector('#delete_user_popup');
const deleteUsereCancel = document.querySelector('#cancel');
const deleteUserConfirm = document.querySelector('#confirm');
const deleteButtons = document.querySelectorAll('.delete');

deleteUsereCancel.addEventListener('click', () => {
    deleteUserPopup.close();
    deleteUserPopup.style.display = 'none';
});

deleteUserConfirm.addEventListener('click', () => {
    deleteUserPopup.close();
    deleteUserPopup.style.display = 'none';
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
    const updatedUsers = Users.filter(user => user.id !== thisUserId);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    window.location.reload();
});

deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        deleteUserPopup.showModal();
        deleteUserPopup.style.display = 'flex';
        deleteUserConfirm.dataset.userId = button.value;
    });
});

// Editar usuario
const editButtons = document.querySelectorAll('.edit');

editButtons.forEach(button => {
    button.addEventListener('click', () => {
        const userId = parseInt(button.value);
        const thisEditableUserData = document.querySelectorAll(`.editable_user_data_input[name="${userId}"]`);
        const inputsContainer = document.querySelector(`.user_data_values_container[name="${userId}"]`);
        const submitNewUserData = document.querySelector(`.submit_new_user_data[value="${userId}"]`);

        submitNewUserData.classList.add('show');
        inputsContainer.classList.add('enabled');
        thisEditableUserData.forEach(input => {
            if (input.disabled) {
                input.disabled = false;
                input.focus();
            }
        });
    });
});

// Confirmar edición
document.querySelectorAll('.editable_user_data_form').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const userId = parseInt(form.querySelector('.submit_new_user_data').value);
        const inputedEmail = form.querySelector(`#email_${userId}`).value;
        const inputedUsername = form.querySelector(`#username_${userId}`).value;
        const inputedPassword = form.querySelector(`#password_${userId}`).value;
        
        const inputsContainer = document.querySelector(`.user_data_values_container[name="${userId}"]`);
        const submitNewUserData = document.querySelector(`.submit_new_user_data[value="${userId}"]`);
        
        submitNewUserData.classList.remove('show');
        inputsContainer.classList.add('enabled');

        let user = Users.find(storedUser => storedUser.id === userId);
        
        if (user) {
            user.email = inputedEmail;
            user.username = inputedUsername;
            user.password = inputedPassword;
            
            const updatedUsers = Users.map(storedUser => storedUser.id === userId ? user : storedUser);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            window.location.reload();
        } else {
            console.log('User not found');
        }
    });
});

// Mostrar información

const infoButtons = document.querySelectorAll('.info');

infoButtons.forEach(button => {
    button.addEventListener('click', () => {
        const userId = parseInt(button.value);
        const userInfoPopup = document.querySelector(`.info[value="${userId}"] > .info_popup`);
        const iconContainer = button.querySelector('.icon_container');
        const iconRect = iconContainer.getBoundingClientRect();

        // Posicionar el diálogo justo encima del icono
        userInfoPopup.style.display = 'block';
        userInfoPopup.style.left = `${iconRect.left - userInfoPopup.offsetWidth}px`;
        userInfoPopup.style.top = `${iconRect.top - userInfoPopup.offsetHeight}px`;
    });
});

document.addEventListener('click', (event) => {
    if (!event.target.closest('.info')) {
        document.querySelectorAll('.info_popup').forEach(dialog => {
            dialog.style.display = 'none'});
        }; 
    });

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.querySelectorAll('.info_popup').forEach(dialog => {
            dialog.style.display = 'none'});
        };
    });
