/* src/features/form/edit/GroupDetails.svelte generated by Svelte v3.25.1 */
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
	listen,
	mount_component,
	safe_not_equal,
	set_style,
	space,
	transition_in,
	transition_out
} from "../../../../web_modules/svelte/internal.js";

import Field from "./Field.js";
import { randomString } from "../../../util/Generate.js";
import Repeater from "../../../components/Repeater.js";
import { dispatch, dispatchSingle } from "../../../event/EventBus.js";
import { firstNotEmpty } from "../../../util/Format.js";
import { onMount } from "../../../../web_modules/svelte.js";
import formStore from "../../../store/FormStore.js";
import GroupEditSidebar from "./GroupEditSidebar.js";

function create_fragment(ctx) {
	let div1;
	let field_1;
	let t0;
	let div0;
	let button;
	let current;
	let mounted;
	let dispose;

	field_1 = new Field({
			props: {
				config: { search: true },
				field: {
					id: randomString(),
					label: "Specify Group",
					helperText: "Link fields together via a group",
					value: {
						type: "local",
						value: /*field*/ ctx[0].groupId
					},
					type: "combobox",
					required: true,
					configFieldTarget: `groupId`,
					configTarget: /*field*/ ctx[0].id,
					options: {
						type: "local",
						value: /*getGroups*/ ctx[1]
					}
				}
			}
		});

	return {
		c() {
			div1 = element("div");
			create_component(field_1.$$.fragment);
			t0 = space();
			div0 = element("div");
			button = element("button");
			button.innerHTML = `<span class="fas fa-cog"></span> Group Settings`;
			attr(button, "target", "_blank");
			attr(button, "class", "btn btn-sm btn-outline-dark");
			attr(div0, "class", "d-flex bd-highlight justify-end");
			set_style(div0, "padding", ".75em 0.6em");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			mount_component(field_1, div1, null);
			append(div1, t0);
			append(div1, div0);
			append(div0, button);
			current = true;

			if (!mounted) {
				dispose = listen(button, "click", /*onGroupSettings*/ ctx[2]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			const field_1_changes = {};

			if (dirty & /*field*/ 1) field_1_changes.field = {
				id: randomString(),
				label: "Specify Group",
				helperText: "Link fields together via a group",
				value: {
					type: "local",
					value: /*field*/ ctx[0].groupId
				},
				type: "combobox",
				required: true,
				configFieldTarget: `groupId`,
				configTarget: /*field*/ ctx[0].id,
				options: {
					type: "local",
					value: /*getGroups*/ ctx[1]
				}
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
			if (detaching) detach(div1);
			destroy_component(field_1);
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	
	let { field } = $$props;

	function getGroups() {
		let form = formStore.getForm();
		return form.groups ?? [];
	}

	function onGroupSettings() {
		dispatch("show_right_sidebar", {
			component: GroupEditSidebar,
			groupId: field.groupId
		});
	}

	onMount(() => {
		
	});

	$$self.$$set = $$props => {
		if ("field" in $$props) $$invalidate(0, field = $$props.field);
	};

	return [field, getGroups, onGroupSettings];
}

class GroupDetails extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { field: 0 });
	}
}

export default GroupDetails;