import { clientControllers } from "../controllers/client-controllers.js";
import { clientServices } from "./client-service.js";

const url = new URL(window.location);
const productId = url.searchParams.get("id");

const addProductForm = document.getElementById("add__product__form");

const fileInput = document.getElementById("img__add--desktop");

const fileInputMobile = document.getElementById("img__add");

const imgPreviewMobile = document.querySelector(".add__product__file");

const dropZone = document.getElementById("add__product__drop");

let product = {
	nombre: null,
	precio: null,
	descripcion: null,
	imagen: null,
	categoria: "Consolas",
	id: uuid.v4().substring(0, 18),
};

let editProduct = [];

fileInput.addEventListener("change", (e) => {
	e.preventDefault();
	const file = e.target.files[0];
	const fileReader = new FileReader();
	fileReader.readAsDataURL(file);
	fileReader.addEventListener("load", (e) => {
		if (editProduct[0]) {
			editProduct[0].imagen = e.target.result;
		} else {
			product.imagen = e.target.result;
		}
		dropZone.style.background = `url(${e.target.result}) no-repeat center`;
		dropZone.style.backgroundSize = "cover";
	});
});

fileInputMobile.addEventListener("change", (e) => {
	e.preventDefault();
	const file = e.target.files[0];
	const fileReader = new FileReader();
	fileReader.readAsDataURL(file);
	fileReader.addEventListener("load", (e) => {
		if (editProduct[0]) {
			editProduct[0].imagen = e.target.result;
		} else {
			product.imagen = e.target.result;
		}
		imgPreviewMobile.style.background = `url(${e.target.result}) no-repeat center`;
		imgPreviewMobile.style.backgroundSize = "cover";
	});
});

dropZone.addEventListener("click", (e) => {
	e.preventDefault();
	fileInput.click();
});
dropZone.addEventListener("dragover", (e) => {
	e.preventDefault();
});
dropZone.addEventListener("drop", (e) => {
	e.preventDefault();
	const file = e.dataTransfer.files[0];
	const fileReader = new FileReader();
	fileReader.readAsDataURL(file);
	fileReader.addEventListener("load", (e) => {
		if (editProduct[0]) {
			editProduct[0].imagen = e.target.result;
		} else {
			product.imagen = e.target.result;
		}
		dropZone.style.background = `url(${e.target.result}) no-repeat center`;
		dropZone.style.backgroundSize = "cover";
	});
});

addProductForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const formValues = Object.values(validateAddForm());
	const valid = formValues.findIndex((value) => value === false);
	if (valid == -1) {
		if (productId) {
			actualizarProducto(
				editProduct[0].nombre,
				editProduct[0].precio,
				editProduct[0].descripcion,
				editProduct[0].imagen,
				editProduct[0].categoria
			);
			swal({
				title: "Producto actualizado con exito!",
				icon: "success",
			});
		} else {
			enviarDatos();
			swal({
				title: "Producto Agregado con exito!",
				icon: "success",
				button: false,
			});
			window.setTimeout(() => (window.location.href = "index.html"), 2500);
		}
	}
});

const validateAddForm = () => {
	const inputImgMobile = document.getElementById("img__add");
	const inputImgDesktop = document.getElementById("img__add--desktop");
	const inputNombre = document.getElementById("add__input__nombre").value;
	const inputPrecio = document.getElementById("add__input__precio").value;
	const expression = /^\d+$/;
	const inputDescripcion = document.getElementById(
		"product__description"
	).value;
	const inputCategoria = document.getElementById("categoria").value;
	if (editProduct[0]) {
		editProduct[0].categoria = inputCategoria;
	} else {
		product.categoria = inputCategoria;
	}

	const errorOutputs = document.querySelectorAll(".addproduct__error--msj");

	errorOutputs.forEach((input) => (input.textContent = ""));

	let formValid = {
		imagen: false,
		nombre: false,
		precio: false,
		descripcion: false,
	};

	if (product.imagen == null) {
		if (editProduct[0]) {
			formValid.imagen = true;
		} else {
			errorOutputs[0].textContent = "Debe subir una imagen";
		}
	} else {
		formValid.imagen = true;
	}

	if (inputNombre === "" || inputNombre.length > 20) {
		errorOutputs[1].textContent =
			"El campo nombre no puede estar vacio ni superar los 20 caracteres";
	} else {
		if (editProduct[0]) {
			editProduct[0].nombre = inputNombre;
		} else {
			product.nombre = inputNombre;
		}

		formValid.nombre = true;
	}

	if (
		inputPrecio === "" ||
		inputPrecio <= 0 ||
		expression.test(inputPrecio) === false
	) {
		errorOutputs[2].textContent =
			"El campo precio no puede estar vacio ni ser menor a 1";
	} else {
		if (editProduct[0]) {
			editProduct[0].precio = parseInt(inputPrecio).toFixed(2);
		} else {
			product.precio = parseInt(inputPrecio).toFixed(2);
		}

		formValid.precio = true;
	}

	if (inputDescripcion === "" || inputDescripcion.length > 150) {
		errorOutputs[3].textContent =
			"El campo descripcion no puede estar vacio ni superar los 150 caracteres";
	} else {
		if (editProduct[0]) {
			editProduct[0].descripcion = inputDescripcion;
		} else {
			product.descripcion = inputDescripcion;
		}
		formValid.descripcion = true;
	}
	return formValid;
};

const enviarDatos = async () => {
	return fetch("https://orac-e-commerce-project.herokuapp.com/productos", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(product),
	});
};

if (url.searchParams.get("id")) {
	const title = document.querySelector(".add__product__title");
	title.textContent = "Editar producto";
	const editBtn = document.querySelector(".add__product__submitbtn");
	editBtn.value = "Aplicar cambios";

	const filterProducts = await clientServices
		.obtenerProductos()
		.then(
			(data) => (editProduct = data.filter((item) => item.id == productId))
		);

	let inputNombre = document.getElementById("add__input__nombre");
	inputNombre.value = editProduct[0].nombre;

	let inputPrecio = document.getElementById("add__input__precio");
	inputPrecio.value = editProduct[0].precio;

	let inputDescripcion = document.getElementById("product__description");
	inputDescripcion.value = editProduct[0].descripcion;

	let imgPreviewMobile = document.querySelector(".add__product__file");
	imgPreviewMobile.style.background = `url(${editProduct[0].imagen}) no-repeat center`;
	imgPreviewMobile.style.backgroundSize = "cover";
	let dropZone = document.getElementById("add__product__drop");
	dropZone.style.background = `url(${editProduct[0].imagen}) no-repeat center`;
	dropZone.style.backgroundSize = "cover";

	let inputCategoria = document.getElementById("categoria");
	inputCategoria.value = editProduct[0].categoria;
}

function actualizarProducto(nombre, precio, descripcion, imagen, categoria) {
	return fetch(
		`https://orac-e-commerce-project.herokuapp.com/productos/${productId}`,
		{
			method: "PUT",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({ nombre, precio, descripcion, imagen, categoria }),
		}
	);
}
