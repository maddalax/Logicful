/* src/inputs/Spacer.svelte generated by Svelte v3.25.1 */
import {
	SvelteComponent,
	attr,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal
} from "../../web_modules/svelte/internal.js";

import { subscribeFieldChange } from "../event/FieldEvent.js";
import { onMount } from "../../web_modules/svelte.js";
import { toNumberOrDefault } from "../util/Compare.js";
import formStore from "../store/FormStore.js";

function create_fragment(ctx) {
	let div;
	let div_style_value;

	return {
		c() {
			div = element("div");
			attr(div, "style", div_style_value = `margin-bottom:${/*value*/ ctx[0]}em`);
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		p(ctx, [dirty]) {
			if (dirty & /*value*/ 1 && div_style_value !== (div_style_value = `margin-bottom:${/*value*/ ctx[0]}em`)) {
				attr(div, "style", div_style_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	
	let { field } = $$props;
	let { value = 0 } = $$props;

	subscribeFieldChange(onMount, newField => {
		if (newField.id === field.id) {
			$$invalidate(0, value = toNumberOrDefault(newField.options?.spacer ?? 1));
		}
	});

	onMount(() => {
		$$invalidate(0, value = toNumberOrDefault(formStore.get(field.id)?.options?.spacer ?? 1));
	});

	$$self.$$set = $$props => {
		if ("field" in $$props) $$invalidate(1, field = $$props.field);
		if ("value" in $$props) $$invalidate(0, value = $$props.value);
	};

	return [value, field];
}

class Spacer extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { field: 1, value: 0 });
	}
}

export default Spacer;