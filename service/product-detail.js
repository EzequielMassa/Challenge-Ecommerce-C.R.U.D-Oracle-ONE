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

	mostrarProducto(imagen, nombre, precio, descripcion, id);
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
