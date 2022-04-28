import { clientServices } from "./client-service.js";

window.addEventListener("DOMContentLoaded", async () => {
	const url = new URL(window.location);
	const productId = url.searchParams.get("id");
	let index = 0;

	const searchIndex = await clientServices
		.obtenerProductos()
		.then((data) => (index += data.findIndex((item) => item.id == productId)));

	const imagen = await clientServices
		.obtenerProductos()
		.then((data) => data[index].imagen);

	const nombre = await clientServices
		.obtenerProductos()
		.then((data) => data[index].nombre);

	const precio = await clientServices
		.obtenerProductos()
		.then((data) => data[index].precio);

	const descripcion = await clientServices
		.obtenerProductos()
		.then((data) => data[index].descripcion);

	const id = await clientServices
		.obtenerProductos()
		.then((data) => data[index].id);

	const categoria = await clientServices
		.obtenerProductos()
		.then((data) => data[index].categoria);

	mostrarProducto(imagen, nombre, precio, descripcion, id);
	similarProducts(nombre, categoria, searchIndex).then((data) =>
		displaySimilarProducts(data)
	);
});

const mostrarProducto = (imagen, nombre, precio, descripcion, id) => {
	const productDiv = document.getElementById("detail__product");

	const contenido = ` <div id="detail__img" class="detail__product--img"></div>
				<div class="detail__product__text">
					<h1 class="detail__product__title">${nombre}</h1>
					<h3 class="detail__product__price">$ ${precio}</h3>
					<p class="detail__product__description">${descripcion}</p>
				</div>`;

	productDiv.innerHTML = contenido;
	let productImg = document.getElementById("detail__img");
	if (id.length < 3) {
		productImg.style.backgroundImage = `url(./assets/images/${imagen})`;
		return productDiv;
	} else {
		productImg.style.backgroundImage = `url(${imagen})`;
	}
};

const similarProducts = async (name, category, index) => {
	let allProducts = [];

	const obtenerProductos = await clientServices
		.obtenerProductos()
		.then((data) => (allProducts = data));

	allProducts.splice(index, 1);

	let productsResult = [];

	let nameSplit = name.split(" ")

	for (let i = 0; i < allProducts.length; i++) {
		if (
			allProducts[i].nombre.toLowerCase().includes(nameSplit[0].toLowerCase()) ||
			allProducts[i].descripcion.toLowerCase().includes(nameSplit[0].toLowerCase) ||
			allProducts[i].categoria.toLowerCase().includes(nameSplit[0].toLowerCase())
		) {
		
			productsResult.push(allProducts[i]);
		} else if (allProducts[i].categoria === category) {
		
			productsResult.push(allProducts[i]);
		}
	}
	return productsResult;
};

const displaySimilarProducts = (lista) => {
	const parentReference = document.getElementById("similarReference");

	lista.forEach((element) => {
		const divProductItem = document.createElement("div");
		divProductItem.classList.add("products__item");
		let item = "";

		if (element.id.length < 3) {
			const contenido = `
	 	
					<img
						src="assets/images/${element.imagen}"
						alt="product image"
						class="products__img"
					/>
					<h5 class="products__name">${element.nombre}</h5>
					<h4 class="products__price">${element.precio}</h4>
					<a id="${element.id}" href="detail.html?id=${element.id}" class="products__detail">Ver producto</a>
			
	 `;
			item += contenido;
		} else {
			const contenido = `
	 
					<img
						src="${element.imagen}"
						alt="product image"
						class="products__img"
					/>
					<h5 class="products__name">${element.nombre}</h5>
					<h4 class="products__price">${element.precio}</h4>
					<a id=${element.id} href="detail.html?id=${element.id}" class="products__detail">Ver producto</a>
			
	 `;
			item += contenido;
		}
		divProductItem.innerHTML = item;
		parentReference.insertBefore(
			divProductItem,
			parentReference.children[0].nextSibling
		);
	});
};
