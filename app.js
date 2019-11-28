const userList = [];
const startBtn = document.querySelector('#user__logIn');
const addBtn = document.querySelector('#addProduct');
// const categoryList = {};
const productList = [];

startBtn.addEventListener('click', createUser);
addBtn.addEventListener('click', createProductObject);


function createUser () {
    const name = document.querySelector('#userName').value;
    userList.push(new User(name));
    console.log('User added');
    console.log(document.querySelector('#userName').value);
    userList[userList.length-1].logUser();
};

function createProductObject(){
    const product = document.querySelector('#product').value;
    const category = document.querySelector('#category').value;
    const a = productList.find((x) =>
    x.product === product && x.category === category
    );
    console.log(a);
    if(a) {
        console.log('update product')
        a.increaseCounter();
        return;
    };
    productList.push(new ProductItem(product, category));
    console.log("add new product");
    productList[productList.length-1].addToMainList();
};

class ProductItem {
    constructor(product, category){
        this.product = product;
        this.category = category;
        this.counter = 1;
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
    });
    return pr;
}

ProductItem.prototype.createCategoryHtml = function(){
    // categoryList[this.category] = [];
    // categoryList[this.category].push(this.product);
    let cat = document.createElement('ul');
    cat.innerText = this.category;
    cat.classList.add(this.category);
    console.log(this.product);
    cat.appendChild(this.createProductHtml());
    return cat;
}

ProductItem.prototype.addToCategoryHtml = function(){
    // categoryList[this.category].push(this.product);
    let cHtml = document.querySelector(`.${this.category}`);
    cHtml.appendChild(this.createProductHtml());
}

ProductItem.prototype.addToHtml = function(){
    console.log('add to main list');
    if(document.querySelectorAll(`.${this.category}`).length !== 0) {
       this.addToCategoryHtml();
    } else {
        const mainListInHtml = document.querySelector('.shopping__list');
        mainListInHtml.appendChild(this.createCategoryHtml());
    }
};

ProductItem.prototype.updateProductHtml = function(){
    const pr = document.querySelector(`.${this.category}>.${this.product}`);
    console.log(pr);
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