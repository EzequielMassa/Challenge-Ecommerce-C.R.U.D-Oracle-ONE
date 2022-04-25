import { user } from "../app.js";

const obtenerProductos = () => {
	return fetch("https://orac-e-commerce-project.herokuapp.com/productos").then(
		(res) => res.json()
	);
};

const obtenerCertificados = () => {
	return fetch(
		"https://orac-e-commerce-project.herokuapp.com/perfil"
	).then((res) => res.json());
};

const viewAllProd = document.querySelectorAll(".allPrdBtn");
viewAllProd.forEach((btn) =>
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		const Category = e.target.id;
		window.location.href = `products.html?category=${Category}`;
	})
);

const viewProductBtn = document.querySelectorAll(".products__detail");

viewProductBtn.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		const productId = e.target.id;
		window.location.href = `detail.html?id=${productId}`;
	});
});

const loginBtn = document.getElementById("nav-login-btn");

const userState = () => {
	const state = JSON.parse(sessionStorage.getItem("login"));

	if (state === null || state === false) {
		loginBtn.textContent = "Login";
		return false;
	} else {
		loginBtn.textContent = "Logout";
		return true;
	}
};

loginBtn.addEventListener("click", () => {
	sessionStorage.clear();
});

export const clientServices = {
	loginBtn,
	obtenerProductos,
	obtenerCertificados,
	viewAllProd,
	viewProductBtn,
	userState,
};
