import App from './App.svelte';
import "uswds/dist/css/uswds.min.css";
import "uswds/dist/js/uswds.min.js";


const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;