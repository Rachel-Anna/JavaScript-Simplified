import items from "../items.json";
import globalEventListener from "../scripts/utils/globalEventListener";
import currencyFormatter from "../scripts/utils/currencyFormatter";

const shoppingCartContainer = document.querySelector("#shopping-cart");
const productsCartContent =
  document.querySelector("#shopping-cart").children[0];
const basketContainer = document.querySelector("#basket-container");
const productCartBtn = document.querySelector("#shopping-cart-btn");
const LOCAL_STORAGE_PREFIX = "shopping-app";
const SAVED_ITEMS = `${LOCAL_STORAGE_PREFIX}-basket`;
const totalBtn = document.querySelector("#total-icon");

let itemsInBasket = JSON.parse(localStorage.getItem(SAVED_ITEMS)) || [];

export default function setupCart() {
  loadCart();

  function loadCart() {
    if (itemsInBasket.length > 0) {
      shoppingCartContainer.classList.remove("invisible");
      productsCartContent.classList.add("invisible");
      renderBasket();
    } else {
      hideBasket();
    }
  }

  globalEventListener("click", "#addProduct", (e) => {
    const selectedProduct = items.find(
      (item) =>
        item.name ===
        e.target.previousElementSibling.querySelector("#product-name").innerText
    );

    addBasketItemToList(selectedProduct);
    renderBasket();
    saveBasket();
    showBasket();
  });

  globalEventListener("click", "[data-remove-from-cart-button]", (e) => {
    removeBasketItemFromList(e);
  });

  productCartBtn.addEventListener("click", () => {
    if (productsCartContent.classList.contains("invisible")) {
      showBasket();
    } else {
      hideBasket();
    }
  });

  function showBasket() {
    shoppingCartContainer.classList.remove("invisible");
    productsCartContent.classList.remove("invisible");
  }
  function hideBasket() {
    if (itemsInBasket.length > 0) {
      productsCartContent.classList.add("invisible");
    } else {
      shoppingCartContainer.classList.add("invisible");
      productsCartContent.classList.add("invisible");
    }
  }

  function addBasketItemToList(selectedProduct) {
    const existingProduct = itemsInBasket.find(
      (item) => item.id === selectedProduct.id
    );

    if (existingProduct != null) {
      existingProduct.quantity++;
    } else {
      itemsInBasket.push({ ...selectedProduct, quantity: 1 });
    }
    saveBasket();
  }

  function renderBasket() {
    basketContainer.innerHTML = ""; //clears the cart before rerendering
    if (itemsInBasket.length === 0) {
      hideBasket();
    }
    totalBtn.innerText = itemsInBasket.length;
    itemsInBasket.forEach((basketItem) => {
      const templateBasketItem = document.querySelector("#basket-item");
      const templateBasketItemClone =
        templateBasketItem.content.cloneNode(true);

      const itemCount =
        templateBasketItemClone.querySelector("#basket-item-count");
      itemCount.innerText =
        basketItem.quantity > 1 ? `x${basketItem.quantity}` : "";

      const price = templateBasketItemClone.querySelector("#basket-item-price");
      price.innerText = currencyFormatter(
        basketItem.priceCents * basketItem.quantity
      );
      const color = templateBasketItemClone.querySelector("#basket-item-color");
      color.innerText = basketItem.name;
      const image = templateBasketItemClone.querySelector("#basket-item-image");
      const imgURLStem = "https://dummyimage.com/420x260/";
      image.src = `${imgURLStem}${basketItem.imageColor}/${basketItem.imageColor}`;
      //setting an id on the item so we can get it later
      templateBasketItemClone.querySelector(
        "[data-basket-product-id]"
      ).dataset.basketProductId = basketItem.id;

      basketContainer.appendChild(templateBasketItemClone);
    });

    let total = itemsInBasket.reduce((acc, currentItem) => {
      return currentItem.quantity * currentItem.priceCents + acc;
    }, 0);

    const basketTotal = document.querySelector("#basket-total");
    basketTotal.innerText = currencyFormatter(total);
  }

  function removeBasketItemFromList(e) {
    //get product that was clicked on
    let selectedProductId = parseInt(
      e.target.closest("[data-basket-product-id]").dataset.basketProductId
    );
    //creates an array of the existing ids in the itemsinBasket array and gets the index of the id we clicked on
    let position = itemsInBasket
      .map((item) => item.id)
      .indexOf(selectedProductId);

    itemsInBasket.splice(position, 1);
    renderBasket();
    saveBasket();
  }

  function saveBasket() {
    localStorage.setItem(SAVED_ITEMS, JSON.stringify(itemsInBasket));
  }
}
