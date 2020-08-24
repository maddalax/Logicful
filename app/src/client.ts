import * as sapper from "@sapper/app"; // eslint-disable-line import/no-unresolved
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.min";


sapper.start({
	target: document.querySelector("#sapper"),
});
