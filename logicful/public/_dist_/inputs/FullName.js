/* src/inputs/FullName.svelte generated by Svelte v3.25.1 */
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
	safe_not_equal,
	set_style,
	space,
	transition_in,
	transition_out
} from "../../web_modules/svelte/internal.js";

import { subscribeFieldChange } from "../event/FieldEvent.js";
import Field from "../features/form/edit/Field.js";
import LiveField from "../features/form/live/LiveField.js";
import TextInput from "./TextInput.js";
import formStore from "../store/FormStore.js";
import { onMount } from "../../web_modules/svelte.js";
import { randomString } from "../util/Generate.js";
import Label from "./Label.js";

function create_if_block_5(ctx) {
	let div;
	let livefield;
	let current;

	livefield = new LiveField({
			props: {
				field: {
					required: true,
					name: `${/*field*/ ctx[1].name}.prefix`,
					id: `${/*field*/ ctx[1].id}.value.prefix`,
					helperText: "Prefix",
					hideLabel: true,
					value: /*value*/ ctx[0]?.prefix?.value ?? "",
					type: "string"
				}
			}
		});

	return {
		c() {
			div = element("div");
			create_component(livefield.$$.fragment);
			attr(div, "class", "bd-highlight pr-2 flex-shrink-1");
			set_style(div, "width", "20%");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(livefield, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const livefield_changes = {};

			if (dirty & /*field, value*/ 3) livefield_changes.field = {
				required: true,
				name: `${/*field*/ ctx[1].name}.prefix`,
				id: `${/*field*/ ctx[1].id}.value.prefix`,
				helperText: "Prefix",
				hideLabel: true,
				value: /*value*/ ctx[0]?.prefix?.value ?? "",
				type: "string"
			};

			livefield.$set(livefield_changes);
		},
		i(local) {
			if (current) return;
			transition_in(livefield.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(livefield.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(livefield);
		}
	};
}

// (42:2) {#if config.first}
function create_if_block_4(ctx) {
	let div;
	let livefield;
	let current;

	livefield = new LiveField({
			props: {
				field: {
					required: true,
					name: `${/*field*/ ctx[1].name}.first`,
					id: `${/*field*/ ctx[1].id}.value.first`,
					helperText: "First Name",
					hideLabel: true,
					value: /*value*/ ctx[0]?.first?.value ?? "",
					type: "string"
				}
			}
		});

	return {
		c() {
			div = element("div");
			create_component(livefield.$$.fragment);
			attr(div, "class", "bd-highlight flex-grow-1 pr-2");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(livefield, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const livefield_changes = {};

			if (dirty & /*field, value*/ 3) livefield_changes.field = {
				required: true,
				name: `${/*field*/ ctx[1].name}.first`,
				id: `${/*field*/ ctx[1].id}.value.first`,
				helperText: "First Name",
				hideLabel: true,
				value: /*value*/ ctx[0]?.first?.value ?? "",
				type: "string"
			};

			livefield.$set(livefield_changes);
		},
		i(local) {
			if (current) return;
			transition_in(livefield.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(livefield.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(livefield);
		}
	};
}

// (48:2) {#if config.middle}
function create_if_block_3(ctx) {
	let div;
	let livefield;
	let current;

	livefield = new LiveField({
			props: {
				field: {
					required: true,
					name: `${/*field*/ ctx[1].name}.middle`,
					id: `${/*field*/ ctx[1].id}.value.middle`,
					helperText: "Middle Name",
					hideLabel: true,
					value: /*value*/ ctx[0]?.middle?.value ?? "",
					type: "string"
				}
			}
		});

	return {
		c() {
			div = element("div");
			create_component(livefield.$$.fragment);
			attr(div, "class", "bd-highlight flex-grow-1 pr-2");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(livefield, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const livefield_changes = {};

			if (dirty & /*field, value*/ 3) livefield_changes.field = {
				required: true,
				name: `${/*field*/ ctx[1].name}.middle`,
				id: `${/*field*/ ctx[1].id}.value.middle`,
				helperText: "Middle Name",
				hideLabel: true,
				value: /*value*/ ctx[0]?.middle?.value ?? "",
				type: "string"
			};

			livefield.$set(livefield_changes);
		},
		i(local) {
			if (current) return;
			transition_in(livefield.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(livefield.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(livefield);
		}
	};
}

// (54:2) {#if config.middleInitial}
function create_if_block_2(ctx) {
	let div;
	let livefield;
	let current;

	livefield = new LiveField({
			props: {
				field: {
					required: true,
					name: `${/*field*/ ctx[1].name}.middleInitial`,
					id: `${/*field*/ ctx[1].id}.value.middleInitial`,
					helperText: "M.I.",
					hideLabel: true,
					value: /*value*/ ctx[0]?.middleInitial?.value ?? "",
					type: "string"
				}
			}
		});

	return {
		c() {
			div = element("div");
			create_component(livefield.$$.fragment);
			attr(div, "class", "bd-highlight pr-2");
			set_style(div, "width", "20%");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(livefield, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const livefield_changes = {};

			if (dirty & /*field, value*/ 3) livefield_changes.field = {
				required: true,
				name: `${/*field*/ ctx[1].name}.middleInitial`,
				id: `${/*field*/ ctx[1].id}.value.middleInitial`,
				helperText: "M.I.",
				hideLabel: true,
				value: /*value*/ ctx[0]?.middleInitial?.value ?? "",
				type: "string"
			};

			livefield.$set(livefield_changes);
		},
		i(local) {
			if (current) return;
			transition_in(livefield.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(livefield.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(livefield);
		}
	};
}

// (60:2) {#if config.last}
function create_if_block_1(ctx) {
	let div;
	let livefield;
	let current;

	livefield = new LiveField({
			props: {
				field: {
					required: true,
					name: `${/*field*/ ctx[1].name}.last`,
					id: `${/*field*/ ctx[1].id}.value.last`,
					helperText: "Last Name",
					hideLabel: true,
					value: /*value*/ ctx[0]?.last?.value ?? "",
					type: "string"
				}
			}
		});

	return {
		c() {
			div = element("div");
			create_component(livefield.$$.fragment);
			attr(div, "class", "bd-highlight flex-grow-1 pr-2");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(livefield, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const livefield_changes = {};

			if (dirty & /*field, value*/ 3) livefield_changes.field = {
				required: true,
				name: `${/*field*/ ctx[1].name}.last`,
				id: `${/*field*/ ctx[1].id}.value.last`,
				helperText: "Last Name",
				hideLabel: true,
				value: /*value*/ ctx[0]?.last?.value ?? "",
				type: "string"
			};

			livefield.$set(livefield_changes);
		},
		i(local) {
			if (current) return;
			transition_in(livefield.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(livefield.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(livefield);
		}
	};
}

// (66:2) {#if config.suffix}
function create_if_block(ctx) {
	let div;
	let livefield;
	let current;

	livefield = new LiveField({
			props: {
				field: {
					required: true,
					name: `${/*field*/ ctx[1].name}.suffix`,
					id: `${/*field*/ ctx[1].id}.value.suffix`,
					helperText: "Suffix",
					hideLabel: true,
					value: /*value*/ ctx[0]?.suffix?.value ?? "",
					type: "string"
				}
			}
		});

	return {
		c() {
			div = element("div");
			create_component(livefield.$$.fragment);
			attr(div, "class", "bd-highlight p-right-2 flex-shrink-1");
			set_style(div, "width", "20%");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(livefield, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const livefield_changes = {};

			if (dirty & /*field, value*/ 3) livefield_changes.field = {
				required: true,
				name: `${/*field*/ ctx[1].name}.suffix`,
				id: `${/*field*/ ctx[1].id}.value.suffix`,
				helperText: "Suffix",
				hideLabel: true,
				value: /*value*/ ctx[0]?.suffix?.value ?? "",
				type: "string"
			};

			livefield.$set(livefield_changes);
		},
		i(local) {
			if (current) return;
			transition_in(livefield.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(livefield.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(livefield);
		}
	};
}

function create_fragment(ctx) {
	let label;
	let t0;
	let div;
	let t1;
	let t2;
	let t3;
	let t4;
	let t5;
	let current;
	label = new Label({ props: { field: /*field*/ ctx[1] } });
	let if_block0 = /*config*/ ctx[2].prefix && create_if_block_5(ctx);
	let if_block1 = /*config*/ ctx[2].first && create_if_block_4(ctx);
	let if_block2 = /*config*/ ctx[2].middle && create_if_block_3(ctx);
	let if_block3 = /*config*/ ctx[2].middleInitial && create_if_block_2(ctx);
	let if_block4 = /*config*/ ctx[2].last && create_if_block_1(ctx);
	let if_block5 = /*config*/ ctx[2].suffix && create_if_block(ctx);

	return {
		c() {
			create_component(label.$$.fragment);
			t0 = space();
			div = element("div");
			if (if_block0) if_block0.c();
			t1 = space();
			if (if_block1) if_block1.c();
			t2 = space();
			if (if_block2) if_block2.c();
			t3 = space();
			if (if_block3) if_block3.c();
			t4 = space();
			if (if_block4) if_block4.c();
			t5 = space();
			if (if_block5) if_block5.c();
			attr(div, "class", "d-flex flex-row bd-highlight");
			set_style(div, "margin-bottom", "-1.5em", 1);
		},
		m(target, anchor) {
			mount_component(label, target, anchor);
			insert(target, t0, anchor);
			insert(target, div, anchor);
			if (if_block0) if_block0.m(div, null);
			append(div, t1);
			if (if_block1) if_block1.m(div, null);
			append(div, t2);
			if (if_block2) if_block2.m(div, null);
			append(div, t3);
			if (if_block3) if_block3.m(div, null);
			append(div, t4);
			if (if_block4) if_block4.m(div, null);
			append(div, t5);
			if (if_block5) if_block5.m(div, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const label_changes = {};
			if (dirty & /*field*/ 2) label_changes.field = /*field*/ ctx[1];
			label.$set(label_changes);
			if (/*config*/ ctx[2].prefix) if_block0.p(ctx, dirty);
			if (/*config*/ ctx[2].first) if_block1.p(ctx, dirty);
			if (/*config*/ ctx[2].middle) if_block2.p(ctx, dirty);
			if (/*config*/ ctx[2].middleInitial) if_block3.p(ctx, dirty);
			if (/*config*/ ctx[2].last) if_block4.p(ctx, dirty);
			if (/*config*/ ctx[2].suffix) if_block5.p(ctx, dirty);
		},
		i(local) {
			if (current) return;
			transition_in(label.$$.fragment, local);
			transition_in(if_block0);
			transition_in(if_block1);
			transition_in(if_block2);
			transition_in(if_block3);
			transition_in(if_block4);
			transition_in(if_block5);
			current = true;
		},
		o(local) {
			transition_out(label.$$.fragment, local);
			transition_out(if_block0);
			transition_out(if_block1);
			transition_out(if_block2);
			transition_out(if_block3);
			transition_out(if_block4);
			transition_out(if_block5);
			current = false;
		},
		d(detaching) {
			destroy_component(label, detaching);
			if (detaching) detach(t0);
			if (detaching) detach(div);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			if (if_block3) if_block3.d();
			if (if_block4) if_block4.d();
			if (if_block5) if_block5.d();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	
	let { field } = $$props;
	let { value } = $$props;

	let config = {
		prefix: true,
		first: true,
		middle: true,
		middleInitial: false,
		last: true,
		suffix: true
	};

	subscribeFieldChange(onMount, newField => {
		if (newField.id === field.id) {
			$$invalidate(0, value = newField.value);
			console.log(value);
		}
	});

	onMount(() => {
		$$invalidate(0, value = formStore.get(field.id));
		console.log(value);
	});

	$$self.$$set = $$props => {
		if ("field" in $$props) $$invalidate(1, field = $$props.field);
		if ("value" in $$props) $$invalidate(0, value = $$props.value);
	};

	return [value, field, config];
}

class FullName extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { field: 1, value: 0 });
	}
}

export default FullName;