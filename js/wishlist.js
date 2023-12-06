let wish = document.querySelectorAll(".add-wishlist");

let products2 = [
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

for (let i = 0; i < wish.length; i++) {
  wish[i].addEventListener("click", () => {
    console.log("clicked");
    let titleValue = document.title;
    switch (titleValue) {
      case "Летняя сирень":
        wishNumbers(products2[0]);
        break;
      case "Мужество джентельмена":
        wishNumbers(products2[1]);
        break;
      case "Магия Востока":
        wishNumbers(products2[2]);
        break;
      case "Весеннее вдохновение":
        wishNumbers(products2[3]);
        break;
      case "Фруктовая гармония":
        wishNumbers(products2[4]);
        break;
      case "Древесная энергия":
        wishNumbers(products2[5]);
        break;
    }
  });
}

function wishNumbers(product) {
  createItems(product);
}

function createItems(product) {
  let wishItems = localStorage.getItem("productsInWish");
  wishItems = JSON.parse(wishItems);

  if (wishItems != null) {
    if (wishItems[product.tag] == undefined) {
      wishItems = {
        ...wishItems,
        [product.tag]: product,
      };
    }
  } else {
    wishItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInWish", JSON.stringify(wishItems));
}

function deleteItem(keyToRemove) {
  // Получаем массив из локального хранилища
  let storedArray = JSON.parse(localStorage.getItem("productsInWish")) || [];

  // Проверяем, существует ли ключ в объекте
  if (storedArray.hasOwnProperty(keyToRemove)) {

    // Удаляем элемент из объекта
    delete storedArray[keyToRemove];

    // Обновляем локальное хранилище с обновленным объектом
    localStorage.setItem("productsInWish", JSON.stringify(storedArray));
  } else {
    console.log("Элемент не найден в объекте.");
  }
}

function displayWish() {
  let wishItems = localStorage.getItem("productsInWish");
  wishItems = JSON.parse(wishItems);

  let productContainer = document.querySelector(".products-container");

  let productNumbers = localStorage.getItem("wishNumbers");
  if (productNumbers) {
    document.querySelector(".products-section__number-in-wish  span").textContent =
      productNumbers;
  }
  if (wishItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(wishItems).map((item) => {
      productContainer.innerHTML += `
      <div class="product">
        <img src="./img/${item.tag}.jpg">
        <span class="product-name">${item.name}</span>
        <button class="delete-product ${
          item.tag
        }" style="background:transparent; border:none;">
          <ion-icon name="trash-outline"></ion-icon>
        </button>
        <div class="price price_${item.tag}">${item.price} руб.</div>
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
  }
}

displayWish();