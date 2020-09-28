/* src/components/account/ManageTeam.svelte generated by Svelte v3.25.1 */
import {
	SvelteComponent,
	detach,
	element,
	empty,
	init,
	insert,
	noop,
	safe_not_equal
} from "../../../web_modules/svelte/internal.js";

import { me } from "../../services/AuthService.js";
import { onMount } from "../../../web_modules/svelte.js";

function create_if_block(ctx) {
	let div6;

	return {
		c() {
			div6 = element("div");

			div6.innerHTML = `<div class="card border-light p-0 p-md-4 mb-4"><div class="card-body"><h3 class="h5 mb-0">Manage Team</h3> 
      <form class="form mt-5" autocomplete="off"><div class="mb-4"><label for="inputPasswordOld">Current Password</label>  <input type="password" class="form-control" id="inputPasswordOld" required=""/></div> 
        <div class="mb-4"><label for="inputPasswordNew">New Password</label> 
          <input type="password" class="form-control" id="inputPasswordNew" required=""/> 
          <span class="form-text small text-muted">The password must be 8-20 characters, and must <em>not</em> contain spaces.</span></div> 
        <div class="mb-4"><label for="inputPasswordNewVerify">Verify</label> 
          <input type="password" class="form-control" id="inputPasswordNewVerify" required=""/> 
          <span class="form-text small text-muted">To confirm, type the new password again.</span></div> 
        <div class="form-group"><button type="submit" class="btn btn-dark">Save</button></div></form></div></div>`;
		},
		m(target, anchor) {
			insert(target, div6, anchor);
		},
		d(detaching) {
			if (detaching) detach(div6);
		}
	};
}

function create_fragment(ctx) {
	let if_block_anchor;
	let if_block = /*user*/ ctx[0] && create_if_block(ctx);

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
			if (/*user*/ ctx[0]) {
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

let teamId = "";

function instance($$self, $$props, $$invalidate) {
	
	let user;

	onMount(() => {
		$$invalidate(0, user = me());
	}); // teamId = user.teamId

	return [user];
}

class ManageTeam extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default ManageTeam;