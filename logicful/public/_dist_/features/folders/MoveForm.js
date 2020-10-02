import './MoveForm.css.proxy.js';
/* src/features/folders/MoveForm.svelte generated by Svelte v3.25.1 */
import {
	SvelteComponent,
	append,
	attr,
	check_outros,
	create_component,
	destroy_component,
	destroy_each,
	detach,
	element,
	empty,
	group_outros,
	init,
	insert,
	listen,
	mount_component,
	safe_not_equal,
	set_data,
	set_style,
	space,
	text,
	transition_in,
	transition_out
} from "../../../web_modules/svelte/internal.js";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[5] = list[i];
	return child_ctx;
}

// (49:6) {:else}
function create_else_block(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.innerHTML = `<span class="far fa-folder" style="font-size: 1.2em; font-weight: 375;"></span>`;
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (43:6) {#if folder.id === selected}
function create_if_block_1(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.innerHTML = `<span class="fas fa-folder-open" style="font-size: 1.2em; font-weight: 375;"></span>`;
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (59:4) {#if expanded[folder.id]}
function create_if_block(ctx) {
	let moveform;
	let current;

	moveform = new MoveForm({
			props: {
				folders: /*folder*/ ctx[5].children ?? {},
				selected: /*selected*/ ctx[1],
				onSelected: /*onSelected*/ ctx[2]
			}
		});

	return {
		c() {
			create_component(moveform.$$.fragment);
		},
		m(target, anchor) {
			mount_component(moveform, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const moveform_changes = {};
			if (dirty & /*folders*/ 1) moveform_changes.folders = /*folder*/ ctx[5].children ?? {};
			if (dirty & /*selected*/ 2) moveform_changes.selected = /*selected*/ ctx[1];
			if (dirty & /*onSelected*/ 4) moveform_changes.onSelected = /*onSelected*/ ctx[2];
			moveform.$set(moveform_changes);
		},
		i(local) {
			if (current) return;
			transition_in(moveform.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(moveform.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(moveform, detaching);
		}
	};
}

// (30:0) {#each Object.values(folders) as folder}
function create_each_block(ctx) {
	let div1;
	let div0;
	let button;
	let t0;
	let span;
	let t1_value = /*folder*/ ctx[5].name + "";
	let t1;
	let button_class_value;
	let t2;
	let t3;
	let current;
	let mounted;
	let dispose;

	function select_block_type(ctx, dirty) {
		if (/*folder*/ ctx[5].id === /*selected*/ ctx[1]) return create_if_block_1;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block0 = current_block_type(ctx);

	function click_handler(...args) {
		return /*click_handler*/ ctx[4](/*folder*/ ctx[5], ...args);
	}

	let if_block1 = /*expanded*/ ctx[3][/*folder*/ ctx[5].id] && create_if_block(ctx);

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			button = element("button");
			if_block0.c();
			t0 = space();
			span = element("span");
			t1 = text(t1_value);
			t2 = space();
			if (if_block1) if_block1.c();
			t3 = space();
			set_style(span, "padding-left", "0.5em");
			set_style(span, "font-weight", "375");

			attr(button, "class", button_class_value = "d-flex list-group-item border-0 list-group-item-action " + (/*folder*/ ctx[5].id === /*selected*/ ctx[1]
			? "active"
			: "") + " svelte-1bncuw8");

			set_style(button, "padding-bottom", "0.5em");
			set_style(button, "padding-top", "0.5em");
			attr(div0, "class", "list-group dashboard-menu list-group-sm svelte-1bncuw8");
			attr(div1, "class", "card-body p-2 svelte-1bncuw8");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			append(div0, button);
			if_block0.m(button, null);
			append(button, t0);
			append(button, span);
			append(span, t1);
			append(div0, t2);
			if (if_block1) if_block1.m(div0, null);
			append(div1, t3);
			current = true;

			if (!mounted) {
				dispose = listen(button, "click", click_handler);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (current_block_type !== (current_block_type = select_block_type(ctx, dirty))) {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(button, t0);
				}
			}

			if ((!current || dirty & /*folders*/ 1) && t1_value !== (t1_value = /*folder*/ ctx[5].name + "")) set_data(t1, t1_value);

			if (!current || dirty & /*folders, selected*/ 3 && button_class_value !== (button_class_value = "d-flex list-group-item border-0 list-group-item-action " + (/*folder*/ ctx[5].id === /*selected*/ ctx[1]
			? "active"
			: "") + " svelte-1bncuw8")) {
				attr(button, "class", button_class_value);
			}

			if (/*expanded*/ ctx[3][/*folder*/ ctx[5].id]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*expanded, folders*/ 9) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(div0, null);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block1);
			current = true;
		},
		o(local) {
			transition_out(if_block1);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			if_block0.d();
			if (if_block1) if_block1.d();
			mounted = false;
			dispose();
		}
	};
}

function create_fragment(ctx) {
	let each_1_anchor;
	let current;
	let each_value = Object.values(/*folders*/ ctx[0]);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (dirty & /*Object, folders, selected, onSelected, expanded*/ 15) {
				each_value = Object.values(/*folders*/ ctx[0]);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	
	
	let { folders } = $$props;
	let { selected = "" } = $$props;
	let { onSelected } = $$props;
	let expanded = {};

	const click_handler = folder => {
		$$invalidate(3, expanded[folder.id] = !expanded[folder.id] ?? true, expanded);

		if (selected === folder.id) {
			return;
		}

		onSelected(folder);
	};

	$$self.$$set = $$props => {
		if ("folders" in $$props) $$invalidate(0, folders = $$props.folders);
		if ("selected" in $$props) $$invalidate(1, selected = $$props.selected);
		if ("onSelected" in $$props) $$invalidate(2, onSelected = $$props.onSelected);
	};

	return [folders, selected, onSelected, expanded, click_handler];
}

class MoveForm extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { folders: 0, selected: 1, onSelected: 2 });
	}
}

export default MoveForm;