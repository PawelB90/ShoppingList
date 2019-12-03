class User {
    constructor(name){
        this.name = name;
    }

    logUser() {
        const userForm = document.querySelector('.form');
        const shoppingList = document.querySelector('.app__body')
        userForm.style.setProperty('display', 'none');
        // userForm.classList.add('hidden');
        const header = document.createElement('h2');
        const button = document.createElement('a');
        button.innerText = 'Logout';
        button.classList.add('logOutBtn');
        button.addEventListener('click', () => {
            this.logOut();
        });
        header.innerText = `Hello ${this.name}`;
        header.classList.add('userWelcome');
        document.querySelector('.header').appendChild(header);
        document.querySelector('.header').appendChild(button);
        shoppingList.classList.remove('hidden');
    }

    verifyUserName() {

    }

    logOut() {
        const shoppingList = document.querySelector('.app__body')
        shoppingList.classList.add('hidden');
        const userForm = document.querySelector('.form');
        userForm.style.setProperty('display', 'flex');

        const userName = document.querySelector('.userWelcome')
        const userBtn = document.querySelector('.logOutBtn')
        userName.parentNode.removeChild(userName);
        userBtn.parentNode.removeChild(userBtn);
    }
};