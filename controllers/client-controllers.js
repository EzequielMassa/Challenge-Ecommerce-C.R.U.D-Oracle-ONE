
const SEARCHBTN = document.querySelector(".nav__icon__search");

SEARCHBTN.addEventListener("click", () => {
	const SEARCHINPUT = document.querySelector(".nav__search");
	SEARCHINPUT.classList.toggle("input--hide");
});

const productBtnCategory = document.querySelectorAll("[data-category]");
productBtnCategory.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		const category = e.target.dataset.category
		window.location.href = `products.html?category=${category}`;
	});
});


	const eliminarProducto = (id) => {
		return fetch(
			`https://midnight-east-daughter.glitch.me/productos/${[id]}`,
			{
				method: "DELETE",
				headers: {
					"Content-type": "application/json",
				},
			}
		);
	};

export const clientControllers = {
	SEARCHBTN,
	productBtnCategory,
	eliminarProducto,
};
