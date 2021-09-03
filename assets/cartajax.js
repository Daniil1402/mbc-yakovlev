//********* changing the quantity of the product *********//
const quantityCartBlock = document.querySelector(".cart__item-qwt")
const quantityCartItem = quantityCartBlock.querySelector(".quantity")

quantityCartBlock.addEventListener("click", function (evt) {
	let pointer = evt.target
	if (pointer.classList.contains("qwt__minus") && quantityCartItem.value != 1) {
		quantityCartItem.value = `${quantityCartItem.value - 1}`
	}else if (pointer.classList.contains("qwt__plus")) {
		quantityCartItem.value = `${Number(quantityCartItem.value) + 1}`
	}
});