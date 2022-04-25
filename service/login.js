import { clientServices } from "./client-service.js";
import { user } from "../app.js";

const loginForm = document.getElementById("login__form");

loginForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const validarResult = validarForm().then((data) =>
		data
			? sessionStorage.setItem(
					"login",
					(user.online = true),
					(window.location.href = `products.html?category=StarWars`)
			  )
			: validarForm()
	);

	if (validarResult === true) {
		sessionStorage.setItem("login", (user.online = true));
		window.location.href = "products.html?category=StarWars";
	}
});

const validarForm = async () => {
	const emailInput = document.querySelector("[data-email]");
	const passwordInput = document.querySelector("[data-password]");

	const errorMsjOutput = document.querySelectorAll(".error--msj");

	let userValid = false;

	try {
		const email = await clientServices
			.obtenerCertificados()
			.then((data) => data[0]["email"]);

		const password = await clientServices
			.obtenerCertificados()
			.then((data) => data[0]["password"]);

		if (emailInput.value === email && passwordInput.value === password) {
			user.online = true;

			errorMsjOutput.forEach((input) => (input.textContent = ""));
			userValid = true;
		} else {
			throw new Error();
		}
	} catch (error) {
		if (emailInput.value === "" || passwordInput.value === "") {
			if (emailInput.value === "") {
				errorMsjOutput[0].textContent = "El campo email no puede estar vacio";
			} else {
				errorMsjOutput[0].textContent = "";
			}
			if (passwordInput.value === "") {
				errorMsjOutput[1].textContent =
					"El campo contraseña no puede estar vacio";
			} else {
				errorMsjOutput[1].textContent = "";
			}
		}
		if (
			(emailInput.value != email && emailInput.value != "") ||
			(passwordInput.value != password && passwordInput.value != "")
		) {
			errorMsjOutput.forEach(
				(input) =>
					(input.textContent =
						"El nombre de usuario o contraseña no son validos")
			);
		}

		userValid = false;
	}

	return userValid;
};
