Users = JSON.parse(localStorage.getItem('users')) || [];

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
                <td class="table_element_value">${user.email}</td>
            </tr>
            <tr>
                <th class="table_element_key">Usuario</th>
                <td class="table_element_value">${user.username}</td>
            </tr>
            <tr>
                <th class="table_element_key">Contraseña</th>
                <td class="table_element_value">${user.password}</td>
            </tr>
        </table>
        <div class="dropdown">
            <button class="dropbtn">Actions</button>
            <div class="dropdown-content">
                <button id="edit" value=${user.id} >Editar</button>
                <button id="delete" value=${user.id} >Eliminar</button>
            </div>
        </div>
    </li>
    `;
    listado.insertAdjacentHTML('beforeend', userHtml);
}

// nose para que servira esto
const singleUser = document.querySelectorAll('.list_singleuser');

//dropdown
document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        dropbtn.addEventListener('click', () => {
            dropdownContent.classList.toggle('show');
        });

        window.addEventListener('click', (event) => {
            if (!event.target.matches('.dropbtn')) {
                if (dropdownContent.classList.contains('show')) {
                    dropdownContent.classList.remove('show');
                }
            }
        });
    });
});

// Eliminar

const deleteButtons = document.querySelectorAll('#delete');
for (let button of deleteButtons){
    button.addEventListener('click', () => {
        const thisUserId = parseInt(button.value);
        Users = Users.filter(user => user.id !== thisUserId);
        localStorage.setItem('users', JSON.stringify(Users));
        window.location.reload();
    })
}

    