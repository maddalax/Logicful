import App from './App.svelte';
import {dispatch} from "event/EventBus";

const app = new App({
	target: document.body
});

document.addEventListener("click", (e) => {
	dispatch("document_click", e);
})

export default app;