import App from './SidebarTest.svelte';
import 'dragula/dist/dragula.min.css'
import {dispatch} from "event/EventBus";

const app = new App({
	target: document.body
});

document.addEventListener("click", (e) => {
	dispatch("document_click", e);
})

export default app;