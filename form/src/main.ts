import App from './App.svelte';
import "uswds/dist/css/uswds.min.css";
import "uswds/dist/fonts/source-sans-pro";
import "css/global.css"
import "css/loader.css";
import 'dragula/dist/dragula.min.css'
import { dispatch } from 'event/EventBus';

const app = new App({
	target: document.body
});


document.addEventListener("click", (e) => {
	dispatch("document_click", e);
})

export default app;