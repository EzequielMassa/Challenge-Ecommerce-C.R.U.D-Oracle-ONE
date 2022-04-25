import { clientControllers } from "./controllers/client-controllers.js";
import { clientServices } from "./service/client-service.js";
import { validateForm } from "./service/about-form.js";

export const user = {
	online: false,
};

JSON.parse(sessionStorage.getItem("login"));

clientServices.userState();
