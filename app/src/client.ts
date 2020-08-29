import * as sapper from "@sapper/app"; // eslint-disable-line import/no-unresolved
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.min";
import { dispatch } from "event/EventBus";

function init() : any {
	const target = document.querySelector("#sapper");
	if(!target) {
		setTimeout(() => {
			init();
		}, 10)
		return;
	}
	sapper.start({
		target
	});
}

init();

document.addEventListener("click", (e) => {
	dispatch("document_click", e);
});