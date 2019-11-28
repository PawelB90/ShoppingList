const userList = [];
const startBtn = document.querySelector('#user__logIn');
const addBtn = document.querySelector('#addProduct');
const categoryList = [];
const productList = [];

startBtn.addEventListener('click', createUser);
addBtn.addEventListener('click', createProductObject);


function createUser () {
    const name = document.querySelector('#userName').value;
    userList.push(new User(name));
    console.log('User added');
    console.log(document.querySelector('#userName').value);
    userList[userList.length-1].logUser();
}

function createProductObject(){
    productList.push(new ProductItem());
    console.log("add product");
    productList[productList.length-1].addToMainList();
}

class ProductItem {
    constructor(){
        this.product = document.querySelector('#product').value;
        this.category = document.querySelector('#category').value;
        console.log(`made product ${this.product} , ${this.category}`);
    }

    addToMainList () {
        addToHtml(this.category, this.product);
    }
}

class User {
    constructor(name){
        this.name = name;
    }

    logUser () {
        const userForm = document.querySelector('.form');
        userForm.style.setProperty('display', 'none');
        const header = document.createElement('p');
        header.innerText = `Witaj ${this.name}`;
        document.querySelector('.header').appendChild(header);
    }
}

function createCategoryHtml (category, prod){
    let cat = document.createElement('ul');
    cat.innerText = category;
    cat.classList.add(category);
    console.log(prod);
    cat.appendChild(createProductHtml(prod));
    return cat;
}

function createProductHtml (name){
    let product = document.createElement('li');
    product.innerHTML = name;
    return product;
}

function addToCategoryHtml (category, product){
    let cHtml = document.querySelector(`.${category}`);
    cHtml.appendChild(createProductHtml(product));
}

function addToHtml (category, product){
    if(document.querySelectorAll(`.${category}`).length !== 0) {
        console.log(document.querySelectorAll(`.${category}`));
       addToCategoryHtml (category, product);
    } else {
        const mainListInHtml = document.querySelector('.shopping__list');
        // mainListInHtml.appendChild(createCategory(this.category,this.name));
        const product = createCategoryHtml(category,product);
        mainListInHtml.appendChild(product);
    }
}