document.addEventListener("DOMContentLoaded", loadProductList );

const userList = [];
const startBtn = document.querySelector('#user__logIn');
const addBtn = document.querySelector('#addProduct');
let productList = [];

startBtn.addEventListener('click', createUser);
addBtn.addEventListener('click', createProductObject);


function createUser () {
    let name = document.querySelector('#userName').value;
    name = name.toLowerCase();
    console.log(name[0]);
    name = name.charAt(0).toUpperCase() + name.substring(1);
    userList.push(new User(name));
    console.log('User added');
    console.log(document.querySelector('#userName').value);
    userList[userList.length-1].logUser();
};

function createProductObject(){
    const product = document.querySelector('#product').value;
    const category = document.querySelector('#category').value;
    const form = document.querySelector('.error');

    if (!category || !product) {
        form.innerText = "Error, no product or category !!!";
        return;
    };

    const a = productList.find((x) =>
    x.product === product && x.category === category
    );

    form.innerText = "";

    if(a) {
        console.log('update product')
        a.increaseCounter();
        // addProductsToLocalStorage();
        // return;
    } else {
        productList.push(new ProductItem(product, category));
        console.log("add new product");
        productList[productList.length-1].addToMainList();
    };

    addProductsToLocalStorage();
};

function addProductsToLocalStorage(){
    let product = productList.map((x) => x.product);
    let category = productList.map((x) => x.category);
    let counter = productList.map((x) => x.counter);
    localStorage.setItem('product', product);
    localStorage.setItem('category', category);
    localStorage.setItem('counter', counter);
    console.log('uaktualniono localStore')
};

function getProductsFromLocalStorage(){

    if (localStorage.getItem('product')){
        productList.length = 0;
        let product = localStorage.getItem('product');
        console.log(product);
        let listP = product.split(',');

        let category = localStorage.getItem('category');
        let listC = category.split(',');

        let counter = localStorage.getItem('counter');
        let listI = counter.split(',').map(Number);

        for (let i = 0; i < listP.length; i++){
            if(listI[i] !== 0)
            productList.push(new ProductItem(listP[i], listC[i], listI[i]));
        };
    };
};

function loadProductList(){
    getProductsFromLocalStorage();
    if(productList) productList.forEach(x => x.addToMainList());
    else productList = [];
}

class ProductItem {
    constructor(product, category, counter = 1){
        this.product = product;
        this.category = category;
        this.counter = counter;
        console.log(`made product ${this.product} , ${this.category}`);
    }
};

ProductItem.prototype.createProductHtml = function(){
    let pr = document.createElement('li');
    pr.classList.add(this.product);
    pr.innerHTML = this.product + ' x' + this.counter;
    pr.addEventListener("click", (e) => {
        const product = e.target.classList[0];
        const category = e.target.parentElement.classList[0];
        const a = productList.find((x) =>
        x.product === product && x.category === category
        );
        console.log(a);
        a.decreaseCounter();
        addProductsToLocalStorage();
    });
    return pr;
};

ProductItem.prototype.createCategoryHtml = function(){
    let cat = document.createElement('ul');
    cat.innerText = this.category;
    cat.classList.add(this.category);
    console.log(this.product);
    cat.appendChild(this.createProductHtml());
    return cat;
};

ProductItem.prototype.addToCategoryHtml = function(){
    let cHtml = document.querySelector(`.shopping__list>.${this.category}`);
    // if(!this.counter)
    cHtml.appendChild(this.createProductHtml());
};

ProductItem.prototype.addToHtml = function(){
    console.log('add to main list');
    console.log(document.querySelectorAll(`.shopping__list>.${this.category}`));
    if (!this.counter) return;
    if(document.querySelectorAll(`.shopping__list>.${this.category}`).length) {

        // console.log(document.querySelectorAll(`.${this.category}`));
       this.addToCategoryHtml();
    } else {
        const mainListInHtml = document.querySelector('.shopping__list');
        mainListInHtml.appendChild(this.createCategoryHtml());
    }
};

ProductItem.prototype.updateProductHtml = function(){
    if (!this.counter) return;
    const pr = document.querySelector(`.${this.category}>.${this.product}`);
    console.log(pr.parentElement);
    if(pr === null) this.addToMainList()
    else pr.innerHTML = this.product + ' x' + this.counter;
};

ProductItem.prototype.removeFromMainList = function(){
    const pr = document.querySelector(`.${this.category}>.${this.product}`);
    pr.remove();
};

ProductItem.prototype.addToMainList = function(){
    this.addToHtml();
};

ProductItem.prototype.increaseCounter = function(){
    this.counter++;
    this.updateProductHtml();
};

ProductItem.prototype.decreaseCounter = function(){
    this.counter--;
    if (this.counter){
        this.updateProductHtml();
        return;
    }
    else {
        this.removeFromMainList();
        this.counter = 0;
        this.updateProductHtml();
        return;
    }
};

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
};
