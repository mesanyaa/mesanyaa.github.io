let carts = document.querySelectorAll(".add-cart");

let products = [
  // product 1
  {
    name: "Летняя сирень",
    tag: "summerlilacbush",
    price: 4999,
    inCart: 0,
  },
  // product 2
  {
    name: "Мужество Джентельмена",
    tag: "thecourageofagentleman",
    price: 4999,
    inCart: 0,
  },
  // product 3
  {
    name: "Магия Востока",
    tag: "magicoftheeast",
    price: 4999,
    inCart: 0,
  },
  // product 4
  {
    name: "Весеннее вдохновение",
    tag: "springinspiration",
    price: 4999,
    inCart: 0,
  },
  // product 5
  {
    name: "Фруктовая Гармония",
    tag: "fruitharmony",
    price: 4999,
    inCart: 0,
  },
  // product 6
  {
    name: "Древесная энергия",
    tag: "woodenergy",
    price: 4999,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    let titleValue = document.title;
    // console.log(typeof titleValue);
    switch (titleValue) {
      case "Летняя сирень":
        cartNumbers(products[0]);
        totalCost(products[0]);
        break;
      case "Мужество джентельмена":
        cartNumbers(products[1]);
        totalCost(products[1]);
        break;
      case "Магия Востока":
        cartNumbers(products[2]);
        totalCost(products[2]);
        break;
      case "Весеннее вдохновение":
        cartNumbers(products[3]);
        totalCost(products[3]);
        break;
      case "Фруктовая гармония":
        cartNumbers(products[4]);
        totalCost(products[4]);
        break;
      case "Древесная энергия":
        cartNumbers(products[5]);
        totalCost(products[5]);
        break;
    }
  });
}

/* function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
} */

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    // document.querySelector('.cart span').textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    // document.querySelector('.cart span').textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;

    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function deleteItem(keyToRemove) {
  // Получаем массив из локального хранилища
  let storedArray = JSON.parse(localStorage.getItem("productsInCart")) || [];

  // Проверяем, существует ли ключ в объекте
  if (storedArray.hasOwnProperty(keyToRemove)) {
    let cartCost = localStorage.getItem("totalCost");
    cartCost = parseInt(cartCost, 10);
    cartCost -=
      storedArray[keyToRemove].price * storedArray[keyToRemove].inCart;
    localStorage.setItem("totalCost", cartCost);

    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers, 10);
    productNumbers -= storedArray[keyToRemove].inCart;
    localStorage.setItem("cartNumbers", productNumbers);

    // Удаляем элемент из объекта
    delete storedArray[keyToRemove];

    // Обновляем локальное хранилище с обновленным объектом
    localStorage.setItem("productsInCart", JSON.stringify(storedArray));
    console.log("running");
  } else {
    console.log("Элемент не найден в объекте.");
  }
}

function increaseProduct(keyToRemove) {
  // Получаем массив из локального хранилища
  let storedArray = JSON.parse(localStorage.getItem("productsInCart")) || [];

  // Проверяем, существует ли ключ в объекте
  if (storedArray.hasOwnProperty(keyToRemove)) {
    let cartCost = localStorage.getItem("totalCost");
    cartCost = parseInt(cartCost, 10);
    cartCost += storedArray[keyToRemove].price;
    localStorage.setItem("totalCost", cartCost);

    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers, 10);
    productNumbers += 1;
    localStorage.setItem("cartNumbers", productNumbers);
    storedArray[keyToRemove].inCart += 1;
    localStorage.setItem("productsInCart", JSON.stringify(storedArray));

    let elemQuantity = document.querySelector(`.quantity_${keyToRemove}`);
    elemQuantity.textContent = storedArray[keyToRemove].inCart;

    let elemTotal = document.querySelector(`.total_${keyToRemove}`);
    elemTotal.textContent = `${
      storedArray[keyToRemove].inCart * storedArray[keyToRemove].price
    } руб.`;
  } else {
    console.log("Элемент не найден в объекте.");
  }
}

function decreaseProduct(keyToRemove) {
  let elemQuantity = document.querySelector(`.quantity_${keyToRemove}`);
  if (parseInt(elemQuantity.textContent, 10) > 1) {
    // Получаем массив из локального хранилища
    let storedArray = JSON.parse(localStorage.getItem("productsInCart")) || [];

    // Проверяем, существует ли ключ в объекте
    if (storedArray.hasOwnProperty(keyToRemove)) {
      let cartCost = localStorage.getItem("totalCost");
      cartCost = parseInt(cartCost, 10);
      cartCost -= storedArray[keyToRemove].price;
      localStorage.setItem("totalCost", cartCost);

      let productNumbers = localStorage.getItem("cartNumbers");
      productNumbers = parseInt(productNumbers, 10);
      productNumbers -= 1;
      localStorage.setItem("cartNumbers", productNumbers);
      storedArray[keyToRemove].inCart -= 1;
      localStorage.setItem("productsInCart", JSON.stringify(storedArray));

      let elemQuantity = document.querySelector(`.quantity_${keyToRemove}`);
      elemQuantity.textContent = storedArray[keyToRemove].inCart;

      let elemTotal = document.querySelector(`.total_${keyToRemove}`);
      elemTotal.textContent = `${
        storedArray[keyToRemove].inCart * storedArray[keyToRemove].price
      } руб.`;
    } else {
      console.log("Элемент не найден в объекте.");
    }
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  let productContainer = document.querySelector(".products-container");
  let cartCost = localStorage.getItem("totalCost");

  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".products-section__number  span").textContent =
      productNumbers;
    document.querySelector(".products-section__total span").textContent =
      cartCost;
  }
  console.log(cartItems);
  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      <div class="product">
        <img src="./img/${item.tag}.jpg">
        <span class="product-name">${item.name}</span>
        <div class="quantity">
          <div class="decrease-product ${
            item.tag
          }" style="background:transparent; border:none;">
            <ion-icon name="remove-circle-outline"></ion-icon>
          </div>
          <span class="quantity_${item.tag}">${item.inCart}</span>
          <div class="increase-product ${
            item.tag
          }" style="background:transparent; border:none;">
          <ion-icon name="add-circle-outline"></ion-icon>
          </div>
        </div>
        <button class="delete-product ${
          item.tag
        }" style="background:transparent; border:none;">
          <ion-icon name="trash-outline"></ion-icon>
        </button>
        <div class="price price_${item.tag}">${item.price} руб.</div>
        <div class="total total_${item.tag}">${
        item.inCart * item.price
      } руб.</div>
      </div>
      <div class="products-section__line"></div>
      `;
    });
    let deleteButtons = document.querySelectorAll(".delete-product");
    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener("click", () => {
        let buttonClasses = deleteButtons[i].classList;
        let classArray = Array.from(buttonClasses);
        deleteItem(classArray[1]);
        location.reload();
      });
    }
    let increaseButtons = document.querySelectorAll(".increase-product");
    for (let i = 0; i < increaseButtons.length; i++) {
      increaseButtons[i].addEventListener("click", () => {
        let buttonClasses = increaseButtons[i].classList;
        let classArray = Array.from(buttonClasses);
        increaseProduct(classArray[1]);
        location.reload();
      });
    }
    let decreaseButtons = document.querySelectorAll(".decrease-product");
    for (let i = 0; i < decreaseButtons.length; i++) {
      decreaseButtons[i].addEventListener("click", () => {
        let buttonClasses = decreaseButtons[i].classList;
        let classArray = Array.from(buttonClasses);
        decreaseProduct(classArray[1]);
        location.reload();
      });
    }
  }
}

/* onLoadCartNumbers(); */
displayCart();
