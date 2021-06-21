let form = document.querySelector("form");
let cart = document.querySelector(".cart");
let formB = document.querySelector("#formButton");

render();

function render() {
  var arrayOfKeys = Object.keys(localStorage);
  var arrayOfValues = Object.values(localStorage);
  for (let i = 0; i < arrayOfKeys.length; i++) {
    let newItem = document.createElement("div");
    newItem.classList.add("cartDiv");
    let newDesc = document.createElement("p");
    newDesc.classList.add("cartPara");

    let newQuant = document.createElement("p");
    newQuant.classList.add("cartQuantity");
    newQuant.textContent = `X` + arrayOfValues[i];
    newQuant.setAttribute("id", `${arrayOfKeys[i]}-quant`);

    let newEdit = document.createElement("button");
    newEdit.innerText = "Edit";
    newEdit.setAttribute("id", arrayOfKeys[i]);
    newEdit.setAttribute("onclick", "cartEdit(this.id)");
    newItem.setAttribute("id", `${arrayOfKeys[i]}-div`);

    let newDel = document.createElement("button");
    newDel.innerText = "Delete";
    newDel.setAttribute("onclick", "cartDelete(this.previousSibling.id)");

    newDesc.textContent = arrayOfKeys[i];

    newEdit.classList.add("cartButton");
    newDel.classList.add("cartButton");
    newEdit.classList.add("cartEdit");
    newDel.classList.add("cartDel");

    newItem.append(newDesc);
    newItem.append(newQuant);
    newItem.append(newEdit);
    newItem.append(newDel);
    cart.append(newItem);
  }
}

function addToCart(event) {
  if (
    localStorage.getItem(form.elements.itemName.value.trim()) === null &&
    form.elements.quantity.value > 0
  ) {
    let newItem = document.createElement("div");
    newItem.classList.add("cartDiv");
    let newDesc = document.createElement("p");
    newDesc.classList.add("cartPara");

    let newQuant = document.createElement("p");
    newQuant.classList.add("cartQuantity");
    newQuant.textContent = `X` + form.elements.quantity.value;
    newQuant.setAttribute("id", `${form.elements.itemName.value.trim()}-quant`);

    let newEdit = document.createElement("button");
    newEdit.innerText = "Edit";
    newEdit.setAttribute("id", form.elements.itemName.value.trim());
    newEdit.setAttribute("onclick", "cartEdit(this.id)");
    newItem.setAttribute("id", `${form.elements.itemName.value.trim()}-div`);

    let newDel = document.createElement("button");
    newDel.innerText = "Delete";
    newDel.setAttribute("onclick", "cartDelete(this.previousSibling.id)");

    newDesc.textContent = form.elements.itemName.value.trim();

    newEdit.classList.add("cartButton");
    newDel.classList.add("cartButton");
    newEdit.classList.add("cartEdit");
    newDel.classList.add("cartDel");

    newItem.append(newDesc);
    newItem.append(newQuant);
    newItem.append(newEdit);
    newItem.append(newDel);
    cart.append(newItem);
    localStorage.setItem(
      form.elements.itemName.value.trim(),
      form.elements.quantity.value
    );
  } else if (
    localStorage.getItem(form.elements.itemName.value.trim()) !== null &&
    form.elements.quantity.value > 0
  ) {
    // let quantUpdate = document.querySelector(
    //   `#${form.elements.itemName.value}-quant`
    // );
    // let oldQuant = Number(
    //   quantUpdate.textContent.substring(1, quantUpdate.textContent.length)
    // );
    // console.log(oldQuant);
    // quantUpdate.textContent = `X${
    //   Number(form.elements.quantity.value) + oldQuant
    // }`;
    // localStorage.setItem(
    //   form.elements.itemName.value,
    //   Number(form.elements.quantity.value) + oldQuant
    // );

    let oldQuant = Number(
      localStorage.getItem(form.elements.itemName.value.trim())
    );
    console.log(oldQuant);
    oldQuant += Number(form.elements.quantity.value);
    localStorage.setItem(form.elements.itemName.value.trim(), oldQuant);
    location.reload();
  }
  event.preventDefault();
}

let selectedButton;

function cartEdit(buttonId) {
  let head = document.querySelector("#workflow");
  head.textContent = "Edit Item";
  form.elements.itemName.value = buttonId;
  form.elements.quantity.value = localStorage.getItem(buttonId);
  selectedButton = buttonId;
  formB.textContent = "Edit";
  form.removeEventListener("submit", addToCart);
  form.addEventListener("submit", editInCart);
}

function editInCart(event) {
  let head = document.querySelector("#workflow");
  localStorage.removeItem(selectedButton);
  if (form.elements.quantity.value > 0) {
    localStorage.setItem(
      form.elements.itemName.value.trim(),
      form.quantity.value
    );
  }
  // form.addEventListener("submit", addToCart);
  form.removeEventListener("submit", editInCart);
  //location.reload();
  head.textContent = "Add Item";
  formB.textContent = "Add";
}

function cartDelete(buttonId) {
  localStorage.removeItem(buttonId);
  location.reload();
}

form.addEventListener("submit", addToCart);
//window.addEventListener("storage", () => {document.styleSheets});

// for (let i = 0; i < localStorage.length; i++) {
//   console.log(localStorage.key(i));
//   console.log(localStorage.getItem(localStorage.key(i)));
// }
