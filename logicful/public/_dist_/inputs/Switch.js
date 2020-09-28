/* src/inputs/Switch.svelte generated by Svelte v3.25.1 */
import {
	SvelteComponent,
	append,
	attr,
	bubble,
	detach,
	element,
	init,
	insert,
	listen,
	noop,
	run_all,
	safe_not_equal,
	set_data,
	set_style,
	space,
	stop_propagation,
	text
} from "../../web_modules/svelte/internal.js";

import { onMount } from "../../web_modules/svelte.js";
import formStore from "../store/FormStore.js";
import { subscribeFieldChange } from "../event/FieldEvent.js";
import { firstNotEmpty } from "../util/Format.js";
import { subscribeComponent } from "../event/EventBus.js";

function create_fragment(ctx) {
	let div;
	let input;
	let input_id_value;
	let t0;
	let label;
	let t1_value = firstNotEmpty(/*field*/ ctx[0].label, /*field*/ ctx[0].name) + "";
	let t1;
	let label_for_value;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			input = element("input");
			t0 = space();
			label = element("label");
			t1 = text(t1_value);
			attr(input, "class", "form-check-input");
			attr(input, "type", "checkbox");
			attr(input, "id", input_id_value = `${/*field*/ ctx[0].id}`);
			input.checked = /*value*/ ctx[1];
			attr(label, "class", "form-check-label");
			attr(label, "for", label_for_value = `${/*field*/ ctx[0].id}`);
			set_style(label, "padding-top", "0.16em");
			attr(div, "class", "form-check form-switch");
			set_style(div, "margin-bottom", "0");
			set_style(div, "vertical-align", "middle");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, input);
			append(div, t0);
			append(div, label);
			append(label, t1);

			if (!mounted) {
				dispose = [
					listen(input, "click", stop_propagation(/*click_handler*/ ctx[3])),
					listen(input, "input", /*input_handler*/ ctx[4])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*field*/ 1 && input_id_value !== (input_id_value = `${/*field*/ ctx[0].id}`)) {
				attr(input, "id", input_id_value);
			}

			if (dirty & /*value*/ 2) {
				input.checked = /*value*/ ctx[1];
			}

			if (dirty & /*field*/ 1 && t1_value !== (t1_value = firstNotEmpty(/*field*/ ctx[0].label, /*field*/ ctx[0].name) + "")) set_data(t1, t1_value);

			if (dirty & /*field*/ 1 && label_for_value !== (label_for_value = `${/*field*/ ctx[0].id}`)) {
				attr(label, "for", label_for_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			run_all(dispose);
		}
	};
}

let defaultValue = false;

function instance($$self, $$props, $$invalidate) {
	
	let { config } = $$props;
	let { field } = $$props;
	let { value = undefined } = $$props;

	subscribeFieldChange(onMount, (newField, change) => {
		if (newField.id === field.id) {
			if (change.field === "defaultValue") {
				$$invalidate(1, value = newField.defaultValue);
			} else {
				$$invalidate(1, value = newField.value);
			}
		}
	});

	onMount(() => {
		$$invalidate(1, value = formStore.getValue(field.configTarget ?? field.id));
	});

	function click_handler(event) {
		bubble($$self, event);
	}

	const input_handler = e => {
		e.preventDefault();
		e.stopPropagation();
		$$invalidate(0, field.value = e.target.checked, field);

		formStore.set(field, {
			fromUser: true,
			value: field.value,
			field: "value"
		});

		field.onChange?.(field.value);
	};

	$$self.$$set = $$props => {
		if ("config" in $$props) $$invalidate(2, config = $$props.config);
		if ("field" in $$props) $$invalidate(0, field = $$props.field);
		if ("value" in $$props) $$invalidate(1, value = $$props.value);
	};

	return [field, value, config, click_handler, input_handler];
}

class Switch extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { config: 2, field: 0, value: 1 });
	}
}

export default Switch;