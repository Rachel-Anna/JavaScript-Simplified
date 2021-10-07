//select everything
const input = document.querySelector("#item-input");
const btn = document.querySelector("button");
const list = document.querySelector("#list");
const form = document.querySelector("#new-item-form");
//add item to page when button is clicked

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //add a div to the list with the input value
  if (input.value != null) {
    const div = document.createElement("div");
    div.innerText = input.value;
    list.append(div);
    list.classList.add("list-item");
    //delete the text from the input value
    input.value = "";
    //delete the list item when it is clicked on
    div.addEventListener("click", () => {
      div.remove();
    });
  }
});
