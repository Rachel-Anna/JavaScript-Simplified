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

let itemsInBasketIDs = [];
counter = items.map(({ id }) => {
  return { [id]: 0 }; //creates an array of objects. Each object is the id plus the corresponding counter
});
let totalPriceofAllBasketItems = 0;

function addItemToBasket(e) {
  if (productsCartContent.classList.contains("invisible")) {
    productsCartContent.classList.remove("invisible");
  }
  const templateBasketItem = document.querySelector("#basket-item");
  const templateBasketItemClone = templateBasketItem.content.cloneNode(true);
  const currentProductType =
    templateBasketItemClone.querySelector(`[data-product-id]`);

  let productName =
    e.target.previousElementSibling.querySelector("#product-name").innerText;
  const productInfo = items.find((item) => {
    return item.name === productName;
  });
  currentProductType.dataset.productId = productInfo.id;

  const itemCount = templateBasketItemClone.querySelector("#basket-item-count");
  itemCount.innerText = countIndividualBasketItems(counter, currentProductType);

  const price = templateBasketItemClone.querySelector("#basket-item-price");
  price.innerText = calculateIndividualItemPrice(
    productInfo.priceCents,
    counter,
    currentProductType
  )[0];

  const color = templateBasketItemClone.querySelector("#basket-item-color");
  color.innerText = productInfo.name;

  const totalPrice = productsCartContent.querySelector("#basket-total");
  totalPrice.innerText = calculateTotalPrice(
    calculateIndividualItemPrice(
      productInfo.priceCents,
      counter,
      currentProductType
    )[1]
  );

  const image = templateBasketItemClone.querySelector("#basket-item-image");
  const imgURLStem = "https://dummyimage.com/420x260/";
  image.src = `${imgURLStem}${productInfo.imageColor}/${productInfo.imageColor}`;

  //create an array of the items which were added to the basket, using the id
  //if an item with this id already exists, don't add it to the basket but instead
  //increment the counter and adjust the price

  basketContainer.appendChild(templateBasketItemClone);
  updateBasket(
    productInfo,
    templateBasketItemClone,
    price,
    currentProductType,
    itemCount
  );
}

function updateBasket(
  productInfo,
  templateBasketItemClone,
  price,
  currentProductType,
  itemCount
) {
  if (itemsInBasketIDs.length === 0) {
    itemsInBasketIDs.push(productInfo.id.toString());
  } else if (itemsInBasketIDs.includes(currentProductType.dataset.productId)) {
    console.log("there was a match");
    let elToRemove = basketContainer.querySelector(
      `[data-product-id="${currentProductType.dataset.productId}"]`
    );
    elToRemove.remove(); //removes the previous element that was created by the addItemToBasket
  } else {
    console.log("no match");
    itemsInBasketIDs.push(productInfo.id.toString());
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

function countIndividualBasketItems(counter, currentProductType) {
  counter[currentProductType.dataset.productId - 1][
    currentProductType.dataset.productId
  ] += 1;

  return counter[currentProductType.dataset.productId - 1][
    currentProductType.dataset.productId
  ];
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
