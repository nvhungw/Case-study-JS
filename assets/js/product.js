
class Product {
    constructor(id, name, price, quantity, image) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.quantity = quantity;
      this.image = image;
    }
  }
  
  class App {
    updateProduct;
    constructor(productsInit = []) {
      this.products = productsInit;
    }
  
    addProduct(product) {
      return this.products.push(product);
    }
  
    deleteProduct(id) {
      let index = this.findIndex(id);
      if (index >= 0) {
        this.products.splice(index, 1); // Xóa bắt đầu từ vị trí index - xóa 1 phần tử
      }
    }
  
    editProduct(id) {//Trả về id của product
      let productEditIndex = this.findIndex(id);
      if (productEditIndex >= 0) {
        this.updateProduct = id;
        let productEdit = this.products[productEditIndex];
        let productNameEl = document.querySelector('#productName');
        let productPriceEl = document.querySelector('#productPrice');
        let productQuantityEl = document.querySelector('#productQuantity')
        productNameEl.value = productEdit.name;
        productPriceEl.value = productEdit.price;
        productQuantityEl.value = productEdit.quantity;
      }
    }
  
    updateProduct(id, productUpdate) {}
  
    findIndex(id) {//Tìm vị trí của id trong mảng
      return this.products.findIndex(function (productItem) {
        return productItem.id == id;
      });
    }
  
    hideAddButton(thisOfApp) {
      createProductBtn.style.display = 'none';
    }
  
    showAddButton() {
      createProductBtn.style.display = 'block';
    }

    hideUpdateButton(){
      updateProductBtn.style.display = 'none'
    }

    showUpdateButton(){
      updateProductBtn.style.display = 'block'
    }


    renderProducts() {
      let productList = document.querySelector('#productList');
      let productHtml = '';
  
      for (let key in this.products) {
        let item = this.products[key];
        productHtml += `
        <tr>
          <td style="text-align: center;">${item.id}</td>
          <td><img src="${item.image}" width="60px" alt="" style="display:block; margin-left:auto; margin-right:auto"></td>
          <td style="text-align: center;">${item.name}</td>
          <td style="text-align: center;">${item.price}</td>
          <td style="text-align: center;">${item.quantity}</td>
          <div >
            <td style="text-align: center;">
                <button class="edit" data-id="${item.id}" style="border: 1px solid; border-radius: 15px; width: 60px; height: 25px">Edit</button>
                <button class="delete" data-id="${item.id}" style="border: 1px solid; border-radius: 15px; width: 60px; height: 25px">Delete</button>
            </td>
          </div>
            
        </tr>
      `;
      }
      productList.innerHTML = productHtml;
  
      let thisOfApp = this;
      this.initEditHandle(thisOfApp);
      this.initDeleteHandle(thisOfApp);
      this.hideUpdateButton()
    }
  
    initDeleteHandle(thisOfApp) {
      let btnDeletes = document.querySelectorAll('.delete');
      btnDeletes.forEach(function (productItem) {
        productItem.addEventListener('click', function () {
          let id = productItem.getAttribute('data-id');
          let status = confirm('Delete It?');
          if (status) {
            thisOfApp.deleteProduct(id);
            thisOfApp.renderProducts();
          }
        });
      });
    }
  
    initEditHandle(thisOfApp) {
      let btnEdits = document.querySelectorAll('.edit');
      btnEdits.forEach(function (productItem) {
        productItem.addEventListener('click', function () {
          let id = productItem.getAttribute('data-id');
          thisOfApp.editProduct(id);
          thisOfApp.hideAddButton();
          thisOfApp.showUpdateButton()
        });
      });
    }
  
    createProduct() {
      let productNameEl = document.querySelector('#productName');
      let productPriceEl = document.querySelector('#productPrice');
      let productQuantityEl = document.querySelector('#productQuantity');
      let idCreate = +this.products[this.products.length - 1].id + 1;
  
      let productNew = new Product(
        idCreate,
        productNameEl.value,
        productPriceEl.value,
        productQuantityEl.value,
        imageLink
      );

      // if (productNameEl.value != '' && productPriceEl.value != '') {
      //   this.addProduct(productNew);
      //   this.renderProducts();
      //   productNameEl.value = '';
      //   productPriceEl.value = '';
      //   error.innerHTML = '';
      // } else {
      //   let error = document.querySelector('#error');
      //   error.innerHTML = 'Name and price cannot be blank ';
      // }
      
      let error = document.querySelector('#error');
      if(productNameEl.value == '' && productPriceEl.value == ''){
        error.innerHTML = 'Product Name and Price cannot be blank ';
      }else if(productNameEl.value == ''){
        error.innerHTML = 'Product Name cannot be blank ';
      }else if(productPriceEl.value == ''){
        error.innerHTML = 'Price cannot be blank ';
      }else{
        this.addProduct(productNew);
        this.renderProducts();
        productNameEl.value = '';
        productPriceEl.value = '';
        productQuantityEl.value = '';
        error.innerHTML = '';
      }
    }

  
    handleUpdate() {
      if (this.updateProduct) {
        let productEditIndex = this.findIndex(this.updateProduct);
        if (productEditIndex >= 0) {
          let productUpdateNew = this.products[productEditIndex];
          let productNameEl = document.querySelector('#productName');
          let productPriceEl = document.querySelector('#productPrice');
          let productQuantityEl = document.querySelector('#productQuantity');
          productUpdateNew.name = productNameEl.value;
          productUpdateNew.price = productPriceEl.value;
          productUpdateNew.quantity = productQuantityEl.value;
  
          this.products[productEditIndex] = productUpdateNew;
          this.renderProducts();
          productNameEl.value = '';
          productPriceEl.value = '';
          productQuantityEl.value = '';
          this.updateProduct = '';
        }
      }
    }
  }
  
  let imageLink =
    'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-den-thumb-600x600.jpg';
  let product = new Product('1', 'IPhone 13 Pro Max', 35000000, 1, imageLink);
  let app = new App();

  
  let createProductBtn = document.querySelector('#createProduct');
  createProductBtn.addEventListener('click', function () {
    app.createProduct();
  });
  
  let updateProductBtn = document.querySelector('#updateProduct');
  updateProductBtn.addEventListener('click', function () {
    app.handleUpdate();
    app.showAddButton();
  });
  
  app.addProduct(product);
  app.renderProducts();
 
  