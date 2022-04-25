import { clientServices } from "../service/client-service.js";
import { user } from "../app.js";

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
			`https://orac-e-commerce-project.herokuapp.com/productos/${[id]}`,
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
