import items from "../items.json";

const shoppingCartContainer = document.querySelector("#shopping-cart");
const productsCartContent =
  document.querySelector("#shopping-cart").children[0];
const basketContainer = document.querySelector("#basket-container");
const productCartBtn = document.querySelector("#shopping-cart-btn");

document.addEventListener("click", (e) => {
  if (e.target.matches("#addProduct")) {
    addItemToBasket(e);
    shoppingCartContainer.classList.remove("invisible");
  }
});

productCartBtn.addEventListener("click", () => {
  productsCartContent.classList.toggle("invisible");
});

// let itemsInBasketIDs = [];
let itemsInBasket = [];
// counter = items.map(({ id }) => {
//   return { [id]: 0 }; //creates an array of objects. Each object is the id plus the corresponding counter
// });
let totalPriceofAllBasketItems = 0;

function addItemToBasket(e) {
  if (productsCartContent.classList.contains("invisible")) {
    productsCartContent.classList.remove("invisible");
  }
  const templateBasketItem = document.querySelector("#basket-item");
  const templateBasketItemClone = templateBasketItem.content.cloneNode(true);
  const currentProductType = templateBasketItemClone.querySelector(
    `[data-basket-product-id]`
  );

  let productName =
    e.target.previousElementSibling.querySelector("#product-name").innerText;
  let productInfo = items.find((item) => {
    return item.name === productName;
  });
  currentProductType.dataset.basketProductId = productInfo.id;
  productInfo = { ...productInfo, counter: 0 };
  //the below adds the selected product to the itemsInBasketArray if there isn't anything already there

  const itemCount = templateBasketItemClone.querySelector("#basket-item-count");
  itemCount.innerText = countIndividualBasketItems(productInfo.counter);

  // const price = templateBasketItemClone.querySelector("#basket-item-price");
  // price.innerText = calculateIndividualItemPrice(
  //   productInfo.priceCents,
  //   counter,
  //   currentProductType
  // )[0];

  const color = templateBasketItemClone.querySelector("#basket-item-color");
  color.innerText = productInfo.name;

  // const totalPrice = productsCartContent.querySelector("#basket-total");
  // totalPrice.innerText = calculateTotalPrice(
  //   calculateIndividualItemPrice(
  //     productInfo.priceCents,
  //     counter,
  //     currentProductType
  //   )[1]
  // );

  const image = templateBasketItemClone.querySelector("#basket-item-image");
  const imgURLStem = "https://dummyimage.com/420x260/";
  image.src = `${imgURLStem}${productInfo.imageColor}/${productInfo.imageColor}`;

  basketContainer.appendChild(templateBasketItemClone);

  if (itemsInBasket.length === 0) {
    itemsInBasket.push(productInfo);
    //basketContainer.appendChild(templateBasketItemClone);
  } else {
    updateBasket(
      productInfo,
      templateBasketItemClone,

      currentProductType
    );
  }
}

function updateBasket(
  productInfo,
  templateBasketItemClone,
  currentProductType
) {
  if (
    itemsInBasket.some(
      (product) =>
        product.id.toString() === currentProductType.dataset.basketProductId
    )
  ) {
    console.log("there was a match");
    console.log(itemsInBasket);
    let elToRemove = basketContainer.querySelector(
      `[data-basket-product-id="${currentProductType.dataset.basketProductId}"]`
    );
    elToRemove.remove(); //removes the previous element that was created by the addItemToBasket
  } else {
    console.log("no match");
    console.log(itemsInBasket);
    itemsInBasket.push(productInfo);
    basketContainer.appendChild(templateBasketItemClone);
  }
}

function calculateIndividualItemPrice(priceCents, counter, currentProductType) {
  let price =
    (priceCents *
      counter[currentProductType.dataset.productId - 1][
        currentProductType.dataset.productId
      ]) /
    100;
  let priceAsFloat = parseFloat(price).toFixed(2);
  return [`$${priceAsFloat}`, priceAsFloat];
}

function calculateTotalPrice() {
  //get each product that is in the basket via the itemsInBasketIDs
  //get the count of each item via the counter var
  //multiply the number of one individual product type by its count for every type of
  //product that's inthe basket. Add them together
}

function countIndividualBasketItems(counter) {
  counter += 1;

  return counter;
}

/* 
1. Check the parent of the "add to cart" button and then get the product image (using closest)
   Get the image source of the product image and save to a var. Then insert that into the image
   src of the basket item.
   Do the same for the color, 
   make a function that calculates the price of the item you clicked on and inserts it into
   the price to the div with an id of price (inside th templatebasketitem clone)
   make a function that adds the total of all the divs with the id of price
*/
