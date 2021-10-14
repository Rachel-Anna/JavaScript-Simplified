const modal = document.querySelector("#modal");
const openModalBtn = document.querySelector("#open-modal-btn");
const closeModalBtn = document.querySelector("#close-modal-btn");
const overlay = document.querySelector("#overlay");

function addClassList(className, elements) {
  elements.forEach((element) => {
    element.classList.add(className);
  });
}

function removeClassList(className, elements) {
  elements.forEach((element) => {
    element.classList.remove(className);
  });
}

openModalBtn.addEventListener("click", () => {
  addClassList("open", [modal, overlay]);
});

closeModalBtn.addEventListener("click", () => {
  removeClassList("open", [modal, overlay]);
});

overlay.addEventListener("click", () => {
  removeClassList("open", [modal, overlay]);
});
