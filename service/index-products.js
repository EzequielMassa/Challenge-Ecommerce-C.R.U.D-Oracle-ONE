import { clientServices } from "./client-service.js";

window.addEventListener("DOMContentLoaded", async () => {
	let products = [];

	const filterProducts = await clientServices
		.obtenerProductos()
		.then((data) => (products = data.filter((item) => item.id.length > 2)));


	const diplayProducts = async (lista) => {
		const appendReference = document.querySelectorAll(".reference");
		
		const productContainerParent = document.querySelectorAll(".product__category");

		
		let productCategoryitem = "";

		lista.forEach((product) => {
			let item = "";
			let productCategory = product.categoria;
			const productContainer = document.createElement("div");
			productContainer.classList.add("products__item");

			if (product.id.length > 2) {
				productCategoryitem = product.categoria;
				let content = `
						<img
							src="${product.imagen}"
							alt="product image"
							class="products__img"
						/>
						<h5 class="products__name">${product.nombre}</h5>
						<h4 class="products__price">$ ${product.precio}</h4>
						<a href="detail.html?id=${product.id}" id="${product.id}" class="products__detail">Ver producto</a>
				`;

				item += content;
			}
			productContainer.innerHTML = item;

			if (productCategoryitem === "Consolas") {
				productContainerParent[1].insertBefore(
					productContainer,
					appendReference[1].nextSibling
				);
			}
				if (productCategoryitem === "StarWars") {
					productContainerParent[0].insertBefore(
						productContainer,
						appendReference[0].nextSibling
					);
				}
				if (productCategoryitem === "Diversos") {
					productContainerParent[2].insertBefore(
						productContainer,
						appendReference[2].nextSibling
					);
				}
			
		});
	};
	diplayProducts(filterProducts);
});
