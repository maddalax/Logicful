import { S as SvelteComponent, i as init, s as safe_not_equal, e as element, m as create_component, c as claim_element, a as children, p as claim_component, d as detach, g as set_style, h as insert, q as mount_component, r as transition_in, u as transition_out, v as destroy_component, o as onMount, x as dispatch } from './client.a93cf518.js';
import { f as formStore } from './FileUpload.6e1eb6f3.js';
import './fuse.esm.4840cecb.js';
import './ApiService.7fbbc2d7.js';
import { F as FormSettings } from './FormSettings.f3c1b479.js';
import './SaveForm.c378ae11.js';

/* src\routes\form-settings\[formId]\scoring.svelte generated by Svelte v3.24.1 */

function create_fragment(ctx) {
	let div;
	let formsettings;
	let current;

	formsettings = new FormSettings({
			props: { form: /*form*/ ctx[0], selected }
		});

	return {
		c() {
			div = element("div");
			create_component(formsettings.$$.fragment);
			this.h();
		},
		l(nodes) {
			div = claim_element(nodes, "DIV", { style: true });
			var div_nodes = children(div);
			claim_component(formsettings.$$.fragment, div_nodes);
			div_nodes.forEach(detach);
			this.h();
		},
		h() {
			set_style(div, "background-color", "#f5f9fe");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(formsettings, div, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const formsettings_changes = {};
			if (dirty & /*form*/ 1) formsettings_changes.form = /*form*/ ctx[0];
			formsettings.$set(formsettings_changes);
		},
		i(local) {
			if (current) return;
			transition_in(formsettings.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(formsettings.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(formsettings);
		}
	};
}

let selected = "scoring";

function instance($$self, $$props, $$invalidate) {
	
	
	let { form } = $$props;

	onMount(() => {
		getForm();
	});

	function getForm() {
		let temp = localStorage.getItem("form");

		if (!temp) {
			temp = JSON.stringify({ fields: [] });
		}

		$$invalidate(0, form = JSON.parse(temp));

		$$invalidate(
			0,
			form.fields = form.fields.map(w => {
				w.selected = false;
				return w;
			}),
			form
		);

		formStore.setForm(form);
		dispatch("form_loaded", { form });
	}

	$$self.$$set = $$props => {
		if ("form" in $$props) $$invalidate(0, form = $$props.form);
	};

	return [form];
}

class Scoring extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { form: 0 });
	}
}

export default Scoring;
