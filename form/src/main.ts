import App from './App.svelte';
import "uswds/dist/css/uswds.min.css";
import "uswds/dist/js/uswds.min.js";
import "uswds/dist/fonts/source-sans-pro";
import "css/global.css"

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;