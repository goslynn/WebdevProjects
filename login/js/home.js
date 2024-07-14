const profileMenuButton = document.querySelector('#dropbtn')

profileMenuButton.addEventListener('click', () => {
    document.querySelector('#dropdown').classList.toggle('show_div');       
    document.querySelector('#profile').classList.toggle('show');    
    document.querySelector('#logout').classList.toggle('show');        
});
