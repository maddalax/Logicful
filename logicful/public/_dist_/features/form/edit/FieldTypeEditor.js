/* src/features/form/edit/FieldTypeEditor.svelte generated by Svelte v3.25.1 */
import {
	SvelteComponent,
	check_outros,
	create_component,
	destroy_component,
	detach,
	element,
	group_outros,
	init,
	insert,
	mount_component,
	safe_not_equal,
	transition_in,
	transition_out
} from "../../../../web_modules/svelte/internal.js";

import ComboBoxOptionsEditor from "./ComboBoxOptionsEditor.js";
import Field from "./Field.js";
import { randomString } from "../../../util/Generate.js";
import AddressEditor from "./AddressEditor.js";
import CheckboxGroupEditor from "./CheckboxGroupEditor.js";
import RadioGroupEditor from "./RadioGroupEditor.js";

function create_if_block_5(ctx) {
	let field_1;
	let current;

	field_1 = new Field({
			props: {
				field: {
					id: randomString(),
					type: "switch",
					label: "Default Value",
					value: {
						type: "local",
						value: /*field*/ ctx[0].defaultValue || false
					},
					configFieldTarget: "defaultValue",
					configTarget: /*field*/ ctx[0].id
				}
			}
		});

	return {
		c() {
			create_component(field_1.$$.fragment);
		},
		m(target, anchor) {
			mount_component(field_1, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const field_1_changes = {};

			if (dirty & /*field*/ 1) field_1_changes.field = {
				id: randomString(),
				type: "switch",
				label: "Default Value",
				value: {
					type: "local",
					value: /*field*/ ctx[0].defaultValue || false
				},
				configFieldTarget: "defaultValue",
				configTarget: /*field*/ ctx[0].id
			};

			field_1.$set(field_1_changes);
		},
		i(local) {
			if (current) return;
			transition_in(field_1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(field_1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(field_1, detaching);
		}
	};
}

// (20:41) 
function create_if_block_4(ctx) {
	let radiogroupeditor;
	let current;

	radiogroupeditor = new RadioGroupEditor({
			props: {
				field: /*field*/ ctx[0],
				expanded: /*field*/ ctx[0].expanded
			}
		});

	return {
		c() {
			create_component(radiogroupeditor.$$.fragment);
		},
		m(target, anchor) {
			mount_component(radiogroupeditor, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const radiogroupeditor_changes = {};
			if (dirty & /*field*/ 1) radiogroupeditor_changes.field = /*field*/ ctx[0];
			if (dirty & /*field*/ 1) radiogroupeditor_changes.expanded = /*field*/ ctx[0].expanded;
			radiogroupeditor.$set(radiogroupeditor_changes);
		},
		i(local) {
			if (current) return;
			transition_in(radiogroupeditor.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(radiogroupeditor.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(radiogroupeditor, detaching);
		}
	};
}

// (18:44) 
function create_if_block_3(ctx) {
	let checkboxgroupeditor;
	let current;

	checkboxgroupeditor = new CheckboxGroupEditor({
			props: {
				field: /*field*/ ctx[0],
				expanded: /*field*/ ctx[0].expanded
			}
		});

	return {
		c() {
			create_component(checkboxgroupeditor.$$.fragment);
		},
		m(target, anchor) {
			mount_component(checkboxgroupeditor, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const checkboxgroupeditor_changes = {};
			if (dirty & /*field*/ 1) checkboxgroupeditor_changes.field = /*field*/ ctx[0];
			if (dirty & /*field*/ 1) checkboxgroupeditor_changes.expanded = /*field*/ ctx[0].expanded;
			checkboxgroupeditor.$set(checkboxgroupeditor_changes);
		},
		i(local) {
			if (current) return;
			transition_in(checkboxgroupeditor.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(checkboxgroupeditor.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(checkboxgroupeditor, detaching);
		}
	};
}

// (16:37) 
function create_if_block_2(ctx) {
	let addresseditor;
	let current;

	addresseditor = new AddressEditor({
			props: {
				field: /*field*/ ctx[0],
				expanded: /*field*/ ctx[0].expanded
			}
		});

	return {
		c() {
			create_component(addresseditor.$$.fragment);
		},
		m(target, anchor) {
			mount_component(addresseditor, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const addresseditor_changes = {};
			if (dirty & /*field*/ 1) addresseditor_changes.field = /*field*/ ctx[0];
			if (dirty & /*field*/ 1) addresseditor_changes.expanded = /*field*/ ctx[0].expanded;
			addresseditor.$set(addresseditor_changes);
		},
		i(local) {
			if (current) return;
			transition_in(addresseditor.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(addresseditor.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(addresseditor, detaching);
		}
	};
}

// (14:38) 
function create_if_block_1(ctx) {
	let comboboxoptionseditor;
	let current;
	comboboxoptionseditor = new ComboBoxOptionsEditor({ props: { field: /*field*/ ctx[0] } });

	return {
		c() {
			create_component(comboboxoptionseditor.$$.fragment);
		},
		m(target, anchor) {
			mount_component(comboboxoptionseditor, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const comboboxoptionseditor_changes = {};
			if (dirty & /*field*/ 1) comboboxoptionseditor_changes.field = /*field*/ ctx[0];
			comboboxoptionseditor.$set(comboboxoptionseditor_changes);
		},
		i(local) {
			if (current) return;
			transition_in(comboboxoptionseditor.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(comboboxoptionseditor.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(comboboxoptionseditor, detaching);
		}
	};
}

// (12:2) {#if field.type === 'string'}
function create_if_block(ctx) {
	let field_1;
	let current;

	field_1 = new Field({
			props: {
				field: {
					id: randomString(),
					type: "number",
					label: "Rows",
					value: {
						type: "local",
						value: /*field*/ ctx[0].rows || 1
					},
					configFieldTarget: "rows",
					configTarget: /*field*/ ctx[0].id
				}
			}
		});

	return {
		c() {
			create_component(field_1.$$.fragment);
		},
		m(target, anchor) {
			mount_component(field_1, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const field_1_changes = {};

			if (dirty & /*field*/ 1) field_1_changes.field = {
				id: randomString(),
				type: "number",
				label: "Rows",
				value: {
					type: "local",
					value: /*field*/ ctx[0].rows || 1
				},
				configFieldTarget: "rows",
				configTarget: /*field*/ ctx[0].id
			};

			field_1.$set(field_1_changes);
		},
		i(local) {
			if (current) return;
			transition_in(field_1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(field_1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(field_1, detaching);
		}
	};
}

function create_fragment(ctx) {
	let div;
	let current_block_type_index;
	let if_block;
	let current;

	const if_block_creators = [
		create_if_block,
		create_if_block_1,
		create_if_block_2,
		create_if_block_3,
		create_if_block_4,
		create_if_block_5
	];

	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*field*/ ctx[0].type === "string") return 0;
		if (/*field*/ ctx[0].type === "combobox") return 1;
		if (/*field*/ ctx[0].type === "address") return 2;
		if (/*field*/ ctx[0].type === "checkbox-group") return 3;
		if (/*field*/ ctx[0].type === "radio-group") return 4;
		if (/*field*/ ctx[0].type === "switch") return 5;
		return -1;
	}

	if (~(current_block_type_index = select_block_type(ctx, -1))) {
		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	return {
		c() {
			div = element("div");
			if (if_block) if_block.c();
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(div, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx, dirty);

			if (current_block_type_index === previous_block_index) {
				if (~current_block_type_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				}
			} else {
				if (if_block) {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
				}

				if (~current_block_type_index) {
					if_block = if_blocks[current_block_type_index];

					if (!if_block) {
						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block.c();
					}

					transition_in(if_block, 1);
					if_block.m(div, null);
				} else {
					if_block = null;
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d();
			}
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

class FieldTypeEditor extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { field: 0 });
	}
}

export default FieldTypeEditor;