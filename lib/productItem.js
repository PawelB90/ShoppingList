class ProductItem {
    constructor(product, category, app ,counter = 1) {
        this.product = product;
        this.category = category;
        this.counter = counter;
        this.app = app;
        console.log(`made product ${this.product} , ${this.category}`);
    }

    createProductHtml() {
        let pr = document.createElement('li');
        pr.classList.add(this.product);
        pr.innerHTML = this.product + ' x' + this.counter;
        pr.addEventListener("click", (e) => {
            const product = e.target.classList[0];
            const category = e.target.parentElement.classList[0];
            const lookingProduct = app.productList.find((x) =>
            x.product === product && x.category === category
            );
            console.log(lookingProduct);
            lookingProduct.decreaseCounter();
            app.addProductsToLocalStorage();
        });
        return pr;
    }

    createCategoryHtml() {
        let cat = document.createElement('ul');
        cat.innerText = this.category;
        cat.classList.add(this.category);
        console.log(this.product);
        cat.appendChild(this.createProductHtml());
        return cat;
    }

    addToCategoryHtml() {
        let cHtml = document.querySelector(`.shopping__list>.${this.category}`);
        cHtml.appendChild(this.createProductHtml());
    }

    addToHtml() {
        console.log('add to main list');

        if (!this.counter) return;

        if(document.querySelectorAll(`.shopping__list>.${this.category}`).length) {
           this.addToCategoryHtml();
        } else {
            const mainListInHtml = document.querySelector('.shopping__list');
            mainListInHtml.appendChild(this.createCategoryHtml());
        };
    }

    updateProductHtml() {
        if (!this.counter) return;

        const pr = document.querySelector(`.${this.category}>.${this.product}`);

        if(pr === null) {
            this.addToMainList();
            return;
        }

        pr.innerHTML = this.product + ' x' + this.counter;
    }

    removeFromMainList() {
        const pr = document.querySelector(`.${this.category}>.${this.product}`);
        pr.remove();
    }

    addToMainList() {
        this.addToHtml();
    }

    increaseCounter() {
        this.counter++;
        this.updateProductHtml();
    }

    decreaseCounter() {
        this.counter--;

        if (this.counter){
            this.updateProductHtml();
            return;
        } else {
            this.removeFromMainList();
            this.counter = 0;
            this.updateProductHtml();
            return;
        };
    }

}


