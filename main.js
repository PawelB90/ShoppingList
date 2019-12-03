const startBtn = document.querySelector('#user__logIn');
const addBtn = document.querySelector('#addProduct');
const clearBtn = document.querySelector('#clearProducts');
const loginForm = document.querySelector('.form');
const app = new App();


loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
});
startBtn.addEventListener('click', (event) => {
    app.createUser();
});
addBtn.addEventListener('click', (event) => {
    app.createProductObject();
});
clearBtn.addEventListener('click', (event) => {
    app.clearProductList();
});
document.addEventListener("DOMContentLoaded", (event) => {
    app.loadProductList();
});
