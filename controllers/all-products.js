import { clientServices } from "../service/client-service.js";
import { clientControllers } from "./client-controllers.js";

window.addEventListener("DOMContentLoaded", async () => {
	const url = new URL(window.location);
	const categoria = url.searchParams.get("category");

	let products = [];

	const filterProducts = await clientServices
		.obtenerProductos()
		.then(
			(data) => (products = data.filter((item) => item.categoria === categoria))
		);

	const title = document.getElementById("title");
	title.textContent = `${categoria}`;

	const diplayProducts = async (lista) => {
		const appendReference = document.querySelectorAll(".all__products__item");

		const productContainerParent = document.getElementById(
			"all__products__items"
		);

		lista.forEach((product) => {
			let item = "";
			const productContainer = document.createElement("div");
			productContainer.classList.add("all__products__item");
			const content = `<div id="${product.id}" class="all__products__img">
						<img
							src="assets/images/deleteicon.svg"
							alt="borrar item"
							class="all__products__item__deteleicon"
						/>
						<img
							src="assets/images/editicon.svg"
							alt="editar item"
							class="all__products__item__editicon"
						/>
					</div>
					<h5 class="all__products__item__name">${product.nombre}</h5>
					<h4 class="all__products__item__price">$${product.precio}</h4>
					<h6 class="all__products__item__id">#${product.id}</h6>`;

			item += content;

			productContainer.innerHTML = item;
			productContainerParent.insertBefore(
				productContainer,
				productContainerParent.children[0]
			);
			const productimagen = document.getElementById(`${product.id}`);
			if (product.id.length > 3) {
				productimagen.style.background = `url(${product.imagen}) no-repeat center`;
				productimagen.style.backgroundSize = "cover";
			} else {
				productimagen.style.background = `url(assets/images/${product.imagen}) no-repeat center`;
				productimagen.style.backgroundSize = "cover";
			}
		});
	};
	diplayProducts(filterProducts);

	const deleteIcons = document.querySelectorAll(
		".all__products__item__deteleicon"
	);
	const editIcons = document.querySelectorAll(".all__products__item__editicon");
	const addProductBtn = document.getElementById("add-product-btn");

	if (
		clientServices.userState() === null ||
		clientServices.userState() === false
	) {
		addProductBtn.classList.add("hide");
		deleteIcons.forEach((element) => element.classList.add("hide"));
		editIcons.forEach((element) => element.classList.add("hide"));
	} else {
		addProductBtn.classList.remove("hide");
		deleteIcons.forEach((element) => element.classList.remove("hide"));
		editIcons.forEach((element) => element.classList.remove("hide"));
	}

	deleteIcons.forEach((icon) =>
		icon.addEventListener("click", async (e) => {
			const productId = e.target.parentElement.id;
			if (productId.length > 3) {
				swal({
					title: "Esta seguro de querer eliminar el producto?",
					text: "Una vez eliminado no se podra recuperar!",
					icon: "warning",
					buttons: true,
					dangerMode: true,
				}).then((willDelete) => {
					if (willDelete) {
						swal("Producto Eliminado con exito!", {
							icon: "success",
							button: false,
						});
						clientControllers.eliminarProducto(productId);
						window.setTimeout(() => window.location.reload(), 2000);
					} else {
						swal("Tu producto no se elimino");
					}
				});
			} else {
				swal({
					title: "Opss!",
					text: "No es posible eliminar este producto!",
					icon: "error",
					button: "Ok!",
				});
			}
		})
	);

	editIcons.forEach((icon) =>
		icon.addEventListener("click", async (e) => {
			const productId = e.target.parentElement.id;
			if (productId.length < 6) {
				swal({
					title: "Opss!",
					text: "No se puede editar este producto!",
					icon: "error",
					button: "Ok!",
				});
			} else {
				window.location.href = `add-products.html?id=${productId}`;
				clientControllers.editarProducto(productId);
			}
		})
	);
});
