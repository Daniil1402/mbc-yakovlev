const openMenuBtn = document.querySelector(".open__menu")
const mobileMenu = document.querySelector(".mobile__menu")
const closeMenuBtn = mobileMenu.querySelector(".close__menu")

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