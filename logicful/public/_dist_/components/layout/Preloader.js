/* src/components/layout/Preloader.svelte generated by Svelte v3.25.1 */
import {
	SvelteComponent,
	attr,
	detach,
	element,
	empty,
	init,
	insert,
	noop,
	safe_not_equal
} from "../../../web_modules/svelte/internal.js";

import { onMount } from "../../../web_modules/svelte.js";

function create_if_block(ctx) {
	let div2;

	return {
		c() {
			div2 = element("div");
			div2.innerHTML = `<div class="d-flex justify-content-center"><div class="spinner-border" style="width: 3rem; height: 3rem;" role="status"><span class="sr-only">Loading...</span></div></div>`;
			attr(div2, "class", "preloader bg-dark flex-column justify-content-center align-items-center");
			attr(div2, "id", "preloader");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
		},
		d(detaching) {
			if (detaching) detach(div2);
		}
	};
}

function create_fragment(ctx) {
	let if_block_anchor;
	let if_block = /*show*/ ctx[0] && create_if_block(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, [dirty]) {
			if (/*show*/ ctx[0]) {
				if (if_block) {
					
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let show = true;

	onMount(() => {
		setTimeout(
			() => {
				$$invalidate(0, show = false);
			},
			150
		);
	});

	return [show];
}

class Preloader extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Preloader;