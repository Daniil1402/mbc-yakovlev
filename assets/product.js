//********* changing the quantity of the product *********//
const quantityBlock = document.querySelector(".qwt")
const quantity = quantityBlock.querySelector(".quantity")
const addToBasket = document.querySelector("#add-to-basket")

quantityBlock.addEventListener("click", function (evt) {
	let pointer = evt.target
	if (pointer.classList.contains("qwt__minus") && quantity.value != 1) {
		quantity.value = `${quantity.value - 1}`
    addToBasket.setAttribute("data-variant-quantity", quantity.value)
	}else if (pointer.classList.contains("qwt__plus")) {
		quantity.value = `${Number(quantity.value) + 1}`
    addToBasket.setAttribute("data-variant-quantity", quantity.value)
	}
});

//********* changing the price of the product *********//
const optionSelect = document.querySelector(".option__select")
const price = document.querySelector(".price")

optionSelect.addEventListener("change", function () {
  const selectedOption = optionSelect.options[optionSelect.selectedIndex]
  const priceValue = selectedOption.dataset.variantPrice
  addToBasket.dataset.variantId = optionSelect.value
  price.textContent = `${priceValue}`
})

//********* changing the cart count for cart btn *********//

const cartBtn = document.querySelector(".cart__btn")


const changeCartCount = function (quantity) {
  const cartCount = document.querySelector(".cart__count")
  if (!cartCount) {
    let cartCount = document.createElement("span")
    cartCount.classList.add("cart__count")
    cartCount.textContent = `${quantity}`
    cartBtn.appendChild(cartCount)
  }else {
    cartCount.textContent = `${Number(cartCount.textContent) + parseInt(quantity)}`
  } 
  
}


const addItem = (id, quantity) => {

  fetch("/cart/add.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          id: Number(id),
          quantity: quantity,
        },
      ],
    }),
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 422) {
          throw "Out of Stock!"
        } else if (response.status === 404) {
          throw "Can not find variant!"
        } else {
          throw "Something went wrong. Please reload the page!"
        }
      }
      return response.json()
    })
    .then((data) => {
      changeCartCount(quantity);
      console.log("/cart/add.js", data)
    })
    .catch((e) => {
      console.error("/cart/add.js", e)
    })
}

addToBasket.addEventListener("click", function (evt) {
  evt.preventDefault()
  let pointer = evt.target
  addItem(pointer.dataset.variantId, pointer.dataset.variantQuantity)
})