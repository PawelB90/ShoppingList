class App {
    constructor() {
        this.userList = [];
        this.productList = [];
    }

    createUser() {
        let name = document.querySelector('#userName').value;
        name = name.toLowerCase();
        name = name.charAt(0).toUpperCase() + name.substring(1);
        console.log(this.userList);
        this.userList.push(new User(name));
        console.log('User added');
        console.log(document.querySelector('#userName').value);
        this.userList[this.userList.length - 1].logUser();
    }

    createProductObject() {
        const product = document.querySelector('#product').value;
        const category = document.querySelector('#category').value;
        const form = document.querySelector('.error');

        if (!category || !product) {
            form.innerText = "Error, no product or category !!!";
            return;
        };

        const lookingProduct = this.productList.find((x) =>
            x.product === product && x.category === category
        );

        form.innerText = "";

        if (lookingProduct) {
            console.log('update product')
            lookingProduct.increaseCounter();
        } else {
            this.productList.push(new ProductItem(product, category, this));
            console.log("add new product");
            this.productList[this.productList.length - 1].addToMainList();
        };

        this.addProductsToLocalStorage();
    }

    addProductsToLocalStorage() {
        let product = this.productList.map((x) => x.product);
        let category = this.productList.map((x) => x.category);
        let counter = this.productList.map((x) => x.counter);
        localStorage.setItem('product', product);
        localStorage.setItem('category', category);
        localStorage.setItem('counter', counter);
        console.log('uaktualniono localStore');
    }

    getProductsFromLocalStorage() {
        if (localStorage.getItem('product')) {
            this.productList.length = 0;
            let product = localStorage.getItem('product');
            console.log(product);
            let listP = product.split(',');

            let category = localStorage.getItem('category');
            let listC = category.split(',');

            let counter = localStorage.getItem('counter');
            let listI = counter.split(',').map(Number);

            for (let i = 0; i < listP.length; i++) {
                if (listI[i] !== 0)
                    this.productList.push(new ProductItem(listP[i], listC[i], this, listI[i]));
            };
        };
    }

    loadProductList() {

        this.getProductsFromLocalStorage();

        if (app.productList) {
            app.productList.forEach(product => product.addToMainList());
            return;
        };

        this.productList = [];
    }

    clearProductList() {
        this.productList = [];
        this.addProductsToLocalStorage();
        console.log('product list clear');

        const shoppingList = document.querySelector('.shopping__list');
        let child = shoppingList.lastElementChild;

        while (child) {
            shoppingList.removeChild(child);
            child = shoppingList.lastElementChild;
        };
    }

}





