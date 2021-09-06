const addToBasket = document.querySelector("#add-to-basket")
const cartAjaxSection = document.querySelector(".cart-ajax")


//********* changing the cart count for cart btn *********//
const cartBtn = document.querySelector(".cart__btn")

const changeCartCount = function (quantity) {
  const cartCount = document.querySelector(".cart__count")
  if (!cartCount) {
    const cartCount = document.createElement("span")
    cartCount.classList.add("cart__count")
    cartCount.textContent = `${quantity}`
    cartBtn.appendChild(cartCount)
  }else {
    cartCount.textContent = `${quantity}`
    if (quantity == 0) {
      cartCount.remove()
    }
  } 
}

//********* update ajax cart *********//
const updateCart = function (section) {
	fetch(`/?sections=${section}`)
    .then((response) => response.json())
		.then((data) => {

			const currentCartSection = document.querySelector(".cart-ajax")
      const currentCartCount = currentCartSection.querySelector(".cart__counter")
      const currentCartPrice = currentCartSection.querySelector(".cart__price-total")
      const currentCartMain = currentCartSection.querySelector(".cart__main")

			const updatedCart = new DOMParser().parseFromString(data.cartajax, "text/html")

			const updatedCartSection = updatedCart.querySelector(".cart-ajax")
      const updatedCartCount = updatedCartSection.querySelector(".cart__counter")
      const updatedCartPrice = updatedCartSection.querySelector(".cart__price-total")
      const updatedCartMain = updatedCartSection.querySelector(".cart__main")

      currentCartCount.replaceWith(updatedCartCount)
      currentCartPrice.replaceWith(updatedCartPrice)
      currentCartMain.replaceWith(updatedCartMain)

      
      if (!currentCartSection.classList.contains("active")) {
        currentCartSection.classList.add("active")
      }
      let tmp = updatedCartCount.querySelector("span")
      changeCartCount(tmp.textContent)
		})
}

//********* changing product in the cart *********//
const updateItem = function (id, quantity) {
  const updatedCart = new DOMParser().parseFromString(`<div class="ring-loader"></div>`, "text/html")
  const loader = updatedCart.querySelector(".ring-loader")
  const cartItems = cartAjaxSection.querySelector(".cart__items")
  cartItems.replaceWith(loader)

  fetch("/cart/change.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, quantity }),
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
  })
  .then((data) => {
    
    updateCart("cartajax", quantity)
    console.log("/cart/change.js", data)
  })


  
}

//********* add item in the cart *********//
const addItem = function (id, quantity) {

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
      updateCart("cartajax")
      console.log("/cart/add.js", data)
    })
    .catch((e) => {
      console.error("/cart/add.js", e)
    })
}


if (addToBasket) {
  addToBasket.addEventListener("click", function (evt) {
    evt.preventDefault()
    let pointer = evt.target
    addItem(pointer.dataset.variantId, pointer.dataset.variantQuantity)
  })
}

//********* changing the quantity of the product in the cart *********//
cartAjaxSection.addEventListener("click", function (evt) {
  let pointer = evt.target
  if (pointer.classList.contains("quantity__minus")) {

    let quantityBlock = pointer.parentElement
    let quantity = quantityBlock.querySelector(".quantity")

    if (quantity.value != 0) {

      quantity.value = `${Number(quantity.value) - 1}`
      let itemId = quantity.getAttribute("data-item-id")
      updateItem(itemId, quantity.value)

    }
  }else if (pointer.classList.contains("quantity__plus")) {

    let quantityBlock = pointer.parentElement
    let quantity = quantityBlock.querySelector(".quantity")

    quantity.value = `${Number(quantity.value) + 1}`
    let itemId = quantity.getAttribute("data-item-id")
    updateItem(itemId, quantity.value)
  }
}) 