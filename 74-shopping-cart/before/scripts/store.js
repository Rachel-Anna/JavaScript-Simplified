import items from "../items.json";

const imgURLStem = "https://dummyimage.com/420x260/";

const productsContainer = document.querySelector(".products-container");

items.forEach((item) => {
  const template = document.querySelector("template");
  const templateClone = template.content.cloneNode(true);
  const category = templateClone.querySelector(".category");
  category.innerText = item.category;
  const color = templateClone.querySelector(".color");
  color.innerText = item.name;
  const img = templateClone.querySelector("img");
  img.src = `${imgURLStem}${item.imageColor}/${item.imageColor}`;
  const price = templateClone.querySelector(".price");
  const calculatedPrice = parseFloat(item.priceCents) / 100;
  const priceText = parseFloat(calculatedPrice).toFixed(2);
  price.innerText = `$${priceText}`;
  productsContainer.appendChild(templateClone);
});
