/* src/components/ErrorDialog.svelte generated by Svelte v3.25.1 */
import {
	SvelteComponent,
	append,
	check_outros,
	create_component,
	destroy_component,
	detach,
	element,
	empty,
	group_outros,
	init,
	insert,
	mount_component,
	safe_not_equal,
	set_data,
	set_style,
	space,
	text,
	transition_in,
	transition_out
} from "../../web_modules/svelte/internal.js";

import { dispatch, subscribeComponent } from "../event/EventBus.js";
import { onMount } from "../../web_modules/svelte.js";
import Dialog from "./layout/Dialog.js";

function create_if_block(ctx) {
	let dialog;
	let current;

	dialog = new Dialog({
			props: {
				isOpen: true,
				title: "An error has occured",
				actions: [
					{
						label: "Reload Page",
						onClick: /*func*/ ctx[1],
						type: "primary"
					}
				],
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(dialog.$$.fragment);
		},
		m(target, anchor) {
			mount_component(dialog, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const dialog_changes = {};

			if (dirty & /*$$scope, error*/ 5) {
				dialog_changes.$$scope = { dirty, ctx };
			}

			dialog.$set(dialog_changes);
		},
		i(local) {
			if (current) return;
			transition_in(dialog.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(dialog.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(dialog, detaching);
		}
	};
}

// (20:2) <Dialog     isOpen={true}     title={'An error has occured'}     actions={[{ label: 'Reload Page', onClick: () => {           window.location.reload();         }, type: 'primary' }]}>
function create_default_slot(ctx) {
	let p0;
	let t1;
	let p1;
	let t2;
	let t3;
	let p2;

	return {
		c() {
			p0 = element("p");
			p0.textContent = "An uncaught exception has occured.";
			t1 = space();
			p1 = element("p");
			t2 = text(/*error*/ ctx[0]);
			t3 = space();
			p2 = element("p");
			p2.textContent = "Your page may not continue working as expected, please reload the page.";
			set_style(p1, "color", "red");
		},
		m(target, anchor) {
			insert(target, p0, anchor);
			insert(target, t1, anchor);
			insert(target, p1, anchor);
			append(p1, t2);
			insert(target, t3, anchor);
			insert(target, p2, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*error*/ 1) set_data(t2, /*error*/ ctx[0]);
		},
		d(detaching) {
			if (detaching) detach(p0);
			if (detaching) detach(t1);
			if (detaching) detach(p1);
			if (detaching) detach(t3);
			if (detaching) detach(p2);
		}
	};
}

function create_fragment(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*error*/ ctx[0] !== "" && create_if_block(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (/*error*/ ctx[0] !== "") {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*error*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
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
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let error = "";

	subscribeComponent("unhandled_error", err => {
		console.log("err", err);
		$$invalidate(0, error = err);
	});

	onMount(() => {
		window.onunhandledrejection = e => {
			console.error(e);
			const message = e.reason?.message ?? e.stack ?? e.message;
			dispatch("unhandled_error", message);
		}; //alert(`An unhandled exception has occured.\n\n${message}\n\nYour page may not work as expected.\n\nPlease try reloading the page.\n\nThis issue has been reported.`)
	});

	const func = () => {
		window.location.reload();
	};

	return [error, func];
}

class ErrorDialog extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default ErrorDialog;