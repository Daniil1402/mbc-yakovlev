//********* changing the quantity of the product *********//
const quantityBlock = document.querySelector(".quantity__block")
const quantity = quantityBlock.querySelector(".quantity")

quantityBlock.addEventListener("click", function (evt) {
	let pointer = evt.target
	if (pointer.classList.contains("quantity__minus") && quantity.value != 1) {
		quantity.value = `${quantity.value - 1}`
    addToBasket.dataset.variantQuantity = quantity.value
	}else if (pointer.classList.contains("quantity__plus")) {
		quantity.value = `${Number(quantity.value) + 1}`
    addToBasket.dataset.variantQuantity = quantity.value
	}
})


//********* changing the price of the product *********//
const optionSelect = document.querySelector(".option__select")
const price = document.querySelector(".price")

optionSelect.addEventListener("change", function () {
  const selectedOption = optionSelect.options[optionSelect.selectedIndex]
  const priceValue = selectedOption.dataset.variantPrice
  addToBasket.dataset.variantId = optionSelect.value
  price.textContent = `${priceValue}`
})