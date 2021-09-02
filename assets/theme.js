window.theme = window.theme || {}

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

theme.carouseles = (function () {
	const owlCarouseles = [
			{
				selector: "#product-slider",
				getSettings: function () {
					return {
						nav: $(this.selector).data("nav"),
						dots: $(this.selector).data("dots"),
						loop: $(this.selector).data("loop"),
						items: $(this.selector).data("items"),
						autoplay: $(this.selector).data("autoplay"),
						mouseDrag: false,
						autoplayHoverPause: true,
						navText: ["<span></span>", "<span></span>"],
						dotsContainer: "#product-slider-dots",
						onInitialized: function (event) {
							const target = event.target.id ? event.target.id : event.target.classList[0]
							console.log(`${target} has been initialized.`)
							$("#product-slider-dots .owl-dot").click(function () {
								// console.log($(this).index());
								$("#product-slider").trigger("to.owl.carousel", [$(this).index(), 300])
							})
						},
					}
				},
			},
		],
		initializeOwlCarousel = (carousel) => ($(carousel.selector).length > 0 ? $(carousel.selector).owlCarousel(carousel.getSettings()) : false)
	reInitializeOwlCarousel = (selector) => {
		$(selector).trigger("destroy.owl.carousel")
		initializeOwlCarousel(owlCarouseles.filter((carousel) => carousel.selector == selector)[0])
	}

	// Initializing
	const init = function () {
		owlCarouseles.forEach(initializeOwlCarousel)
	}
	return {
		init,
		reInitializeOwlCarousel,
	}
})()

theme.init = function () {
	theme.carouseles.init()
}

$(function () {
	theme.init()
})