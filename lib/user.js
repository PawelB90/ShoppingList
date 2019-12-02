class User {
    constructor(name){
        this.name = name;
    }

    logUser() {
        const userForm = document.querySelector('.form');
        userForm.style.setProperty('display', 'none');
        const header = document.createElement('p');
        const button = document.createElement('a');
        button.innerText = 'Logout';
        header.innerText = `Witaj ${this.name}`;
        document.querySelector('.header').appendChild(header);
        document.querySelector('.header').appendChild(button);
    }
};