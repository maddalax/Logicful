/* src/components/ToastManager.svelte generated by Svelte v3.25.1 */
import {
	SvelteComponent,
	check_outros,
	create_component,
	destroy_component,
	destroy_each,
	detach,
	empty,
	group_outros,
	init,
	insert,
	mount_component,
	safe_not_equal,
	transition_in,
	transition_out
} from "../../web_modules/svelte/internal.js";

import { subscribeComponent } from "../event/EventBus.js";
import { onMount } from "../../web_modules/svelte.js";
import { randomString } from "../util/Generate.js";
import Toast from "./Toast.js";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[2] = list[i];
	return child_ctx;
}

// (24:0) {#each toasts as toast}
function create_each_block(ctx) {
	let toast;
	let current;

	toast = new Toast({
			props: {
				message: /*toast*/ ctx[2].message,
				title: /*toast*/ ctx[2].title
			}
		});

	return {
		c() {
			create_component(toast.$$.fragment);
		},
		m(target, anchor) {
			mount_component(toast, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const toast_changes = {};
			if (dirty & /*toasts*/ 1) toast_changes.message = /*toast*/ ctx[2].message;
			if (dirty & /*toasts*/ 1) toast_changes.title = /*toast*/ ctx[2].title;
			toast.$set(toast_changes);
		},
		i(local) {
			if (current) return;
			transition_in(toast.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(toast.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(toast, detaching);
		}
	};
}

function create_fragment(ctx) {
	let each_1_anchor;
	let current;
	let each_value = /*toasts*/ ctx[0];
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
			if (dirty & /*toasts*/ 1) {
				each_value = /*toasts*/ ctx[0];
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
	let toasts = [];

	subscribeComponent("show_toast", props => {
		const id = randomString();

		$$invalidate(0, toasts = toasts.concat([
			{
				id,
				message: props.message,
				title: props.title
			}
		]));

		setTimeout(
			() => {
				removeById(id);
			},
			props.timeout || 4000
		);
	});

	subscribeComponent("toast_closed", props => {
		removeById(props.id);
	});

	function removeById(id) {
		toasts.splice(toasts.findIndex(t => t.id === id), 1);
		$$invalidate(0, toasts);
	}

	return [toasts];
}

class ToastManager extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default ToastManager;