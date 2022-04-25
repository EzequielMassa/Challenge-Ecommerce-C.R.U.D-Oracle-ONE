const aboutForm = document.getElementById("contact__form");

aboutForm.addEventListener("submit", (e) => {
	e.preventDefault();
	if (validate()) {
		const url = new URL(window.location);
		aboutForm.submit();
		window.location.href = url;
	}
});

const validate = () => {
	let nombre = document.querySelector("[data-nombre]").value;
	const mensaje = document.querySelector("[data-mensaje]").value;
	let errorInputs = document.querySelectorAll(".about__error--msj");

	let nombreValido = false;
	let mensajeValido = false;

	errorInputs[0].textContent = "";
	errorInputs[1].textContent = "";

	if (nombre === "") {
		errorInputs[0].textContent = "El campo nombre no puede estar vacio";
	} else if (nombre.length > 40) {
		errorInputs[0].textContent = "El tamaño maximo es de 40 caracteres";
	} else {
		nombreValido = true;
	}

	if (mensaje === "") {
		errorInputs[1].textContent = "El campo mensaje no puede estar vacio";
	} else if (mensaje.length > 120) {
		errorInputs[1].textContent = "El tamaño maximo es de 120 caracteres";
	} else {
		mensajeValido = true;
	}

	return nombreValido && mensajeValido;
};

export const validateForm = {
	aboutForm,
};
