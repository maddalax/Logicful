/* src/inputs/Label.svelte generated by Svelte v3.25.1 */
import {
	SvelteComponent,
	append,
	attr,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal,
	set_data,
	space,
	text
} from "../../web_modules/svelte/internal.js";

import { firstNotEmpty } from "../util/Format.js";

function create_if_block(ctx) {
	let span;

	return {
		c() {
			span = element("span");
			span.textContent = "(optional)";
		},
		m(target, anchor) {
			insert(target, span, anchor);
		},
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

function create_fragment(ctx) {
	let label;
	let t0_value = firstNotEmpty(/*field*/ ctx[0].label, /*field*/ ctx[0].name) + "";
	let t0;
	let t1;
	let label_for_value;
	let if_block = !/*field*/ ctx[0].required && create_if_block(ctx);

	return {
		c() {
			label = element("label");
			t0 = text(t0_value);
			t1 = space();
			if (if_block) if_block.c();
			attr(label, "for", label_for_value = /*field*/ ctx[0].id);
		},
		m(target, anchor) {
			insert(target, label, anchor);
			append(label, t0);
			append(label, t1);
			if (if_block) if_block.m(label, null);
		},
		p(ctx, [dirty]) {
			if (dirty & /*field*/ 1 && t0_value !== (t0_value = firstNotEmpty(/*field*/ ctx[0].label, /*field*/ ctx[0].name) + "")) set_data(t0, t0_value);

			if (!/*field*/ ctx[0].required) {
				if (if_block) {
					
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(label, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*field*/ 1 && label_for_value !== (label_for_value = /*field*/ ctx[0].id)) {
				attr(label, "for", label_for_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(label);
			if (if_block) if_block.d();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	
	let { field } = $$props;

	$$self.$$set = $$props => {
		if ("field" in $$props) $$invalidate(0, field = $$props.field);
	};

	return [field];
}

class Label extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { field: 0 });
	}
}

export default Label;