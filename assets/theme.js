const openMenuBtn = document.querySelector(".open__menu")
const mobileMenu = document.querySelector(".mobile__menu")
const closeMenuBtn = mobileMenu.querySelector(".close__menu")
const cartOpenBtn = document.querySelector(".cart__btn")
const cartCloseBtn = document.querySelector(".cart__close")
const cartAjax = document.querySelector(".cart-ajax")

const menuHidden = function () {
  mobileMenu.classList.add("hidden")
  closeMenuBtn.removeEventListener("click", menuHidden)
}

const menuShow = function () {
  mobileMenu.classList.remove("hidden")
  closeMenuBtn.addEventListener("click", menuHidden)
}

openMenuBtn.addEventListener("click", function () {
  menuShow()
})

cartOpenBtn.addEventListener("click", function (evt) {
	evt.preventDefault()
	if (!cartAjax.classList.contains("active")) {
		cartAjax.classList.add("active")
	}
})

cartCloseBtn.addEventListener("click", function (evt) {
	evt.preventDefault()
	if (cartAjax.classList.contains("active")) {
		cartAjax.classList.remove("active")
	}
})



