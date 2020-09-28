/* src/pages/DashboardPage.svelte generated by Svelte v3.25.1 */
import {
	SvelteComponent,
	append,
	attr,
	create_component,
	destroy_component,
	detach,
	element,
	init,
	insert,
	mount_component,
	noop,
	safe_not_equal,
	set_style,
	transition_in,
	transition_out
} from "../../web_modules/svelte/internal.js";

import Dashboard from "../components/dashboard/Dashboard.js";

function create_fragment(ctx) {
	let div3;
	let div2;
	let div1;
	let div0;
	let dashboard;
	let current;
	dashboard = new Dashboard({});

	return {
		c() {
			div3 = element("div");
			div2 = element("div");
			div1 = element("div");
			div0 = element("div");
			create_component(dashboard.$$.fragment);
			attr(div0, "class", "row pt-5 pt-md-0");
			attr(div1, "class", "container");
			attr(div2, "class", "section section-lg pt-6 pt-md-6 bg-soft");
			set_style(div3, "background-color", "#eff1f5");
		},
		m(target, anchor) {
			insert(target, div3, anchor);
			append(div3, div2);
			append(div2, div1);
			append(div1, div0);
			mount_component(dashboard, div0, null);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(dashboard.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(dashboard.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div3);
			destroy_component(dashboard);
		}
	};
}

class DashboardPage extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment, safe_not_equal, {});
	}
}

export default DashboardPage;