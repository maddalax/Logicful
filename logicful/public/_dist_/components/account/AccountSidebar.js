import './AccountSidebar.css.proxy.js';
/* src/components/account/AccountSidebar.svelte generated by Svelte v3.25.1 */
import {
	SvelteComponent,
	append,
	attr,
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
} from "../../../web_modules/svelte/internal.js";

import { me } from "../../services/AuthService.js";
import { onMount } from "../../../web_modules/svelte.js";
import Link from "../Link.js";

function create_if_block(ctx) {
	let div6;
	let div0;
	let h2;
	let t0;
	let t1_value = /*user*/ ctx[1].displayName + "";
	let t1;
	let t2;
	let t3;
	let div5;
	let div4;
	let div1;
	let link0;
	let t4;
	let div2;
	let link1;
	let t5;
	let div3;
	let link2;
	let current;

	link0 = new Link({
			props: {
				href: "/account/settings",
				class: "d-flex list-group-item border-0 list-group-item-action " + (/*page*/ ctx[0] === "settings" ? "active" : ""),
				$$slots: { default: [create_default_slot_2] },
				$$scope: { ctx }
			}
		});

	link1 = new Link({
			props: {
				href: "/account/settings/team",
				class: "d-flex list-group-item border-0 list-group-item-action " + (/*page*/ ctx[0] === "manage-team" ? "active" : ""),
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			}
		});

	link2 = new Link({
			props: {
				href: "/account/settings/billing",
				class: "d-flex list-group-item border-0 list-group-item-action " + (/*page*/ ctx[0] === "billing" ? "active" : ""),
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			div6 = element("div");
			div0 = element("div");
			h2 = element("h2");
			t0 = text("Hello, ");
			t1 = text(t1_value);
			t2 = text("!");
			t3 = space();
			div5 = element("div");
			div4 = element("div");
			div1 = element("div");
			create_component(link0.$$.fragment);
			t4 = space();
			div2 = element("div");
			create_component(link1.$$.fragment);
			t5 = space();
			div3 = element("div");
			create_component(link2.$$.fragment);
			attr(h2, "class", "h5");
			set_style(h2, "padding-left", "0em");
			attr(div0, "class", "card-header bg-white border-0");
			set_style(div0, "display", "flex");
			set_style(div1, "display", "flex");
			set_style(div2, "display", "flex");
			set_style(div3, "display", "flex");
			attr(div4, "class", "list-group dashboard-menu list-group-sm");
			attr(div5, "class", "card-body p-2");
			attr(div6, "class", "card border-light p-2 svelte-1bhgzku");
		},
		m(target, anchor) {
			insert(target, div6, anchor);
			append(div6, div0);
			append(div0, h2);
			append(h2, t0);
			append(h2, t1);
			append(h2, t2);
			append(div6, t3);
			append(div6, div5);
			append(div5, div4);
			append(div4, div1);
			mount_component(link0, div1, null);
			append(div4, t4);
			append(div4, div2);
			mount_component(link1, div2, null);
			append(div4, t5);
			append(div4, div3);
			mount_component(link2, div3, null);
			current = true;
		},
		p(ctx, dirty) {
			if ((!current || dirty & /*user*/ 2) && t1_value !== (t1_value = /*user*/ ctx[1].displayName + "")) set_data(t1, t1_value);
			const link0_changes = {};
			if (dirty & /*page*/ 1) link0_changes.class = "d-flex list-group-item border-0 list-group-item-action " + (/*page*/ ctx[0] === "settings" ? "active" : "");

			if (dirty & /*$$scope*/ 4) {
				link0_changes.$$scope = { dirty, ctx };
			}

			link0.$set(link0_changes);
			const link1_changes = {};
			if (dirty & /*page*/ 1) link1_changes.class = "d-flex list-group-item border-0 list-group-item-action " + (/*page*/ ctx[0] === "manage-team" ? "active" : "");

			if (dirty & /*$$scope*/ 4) {
				link1_changes.$$scope = { dirty, ctx };
			}

			link1.$set(link1_changes);
			const link2_changes = {};
			if (dirty & /*page*/ 1) link2_changes.class = "d-flex list-group-item border-0 list-group-item-action " + (/*page*/ ctx[0] === "billing" ? "active" : "");

			if (dirty & /*$$scope*/ 4) {
				link2_changes.$$scope = { dirty, ctx };
			}

			link2.$set(link2_changes);
		},
		i(local) {
			if (current) return;
			transition_in(link0.$$.fragment, local);
			transition_in(link1.$$.fragment, local);
			transition_in(link2.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(link0.$$.fragment, local);
			transition_out(link1.$$.fragment, local);
			transition_out(link2.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div6);
			destroy_component(link0);
			destroy_component(link1);
			destroy_component(link2);
		}
	};
}

// (36:10) <Link             href="/account/settings"             class="d-flex list-group-item border-0 list-group-item-action {page === 'settings' ? 'active' : ''}">
function create_default_slot_2(ctx) {
	let i;
	let span0;
	let span2;

	return {
		c() {
			i = element("i");
			span0 = element("span");
			span0.textContent = "Profile Settings";
			span2 = element("span");
			span2.innerHTML = `<span class="fas fa-chevron-right"></span>`;
			attr(i, "class", "fas fa-cogs");
			set_style(span0, "padding-left", "0.5em");
			attr(span2, "class", "icon icon-xs ml-auto");
		},
		m(target, anchor) {
			insert(target, i, anchor);
			insert(target, span0, anchor);
			insert(target, span2, anchor);
		},
		d(detaching) {
			if (detaching) detach(i);
			if (detaching) detach(span0);
			if (detaching) detach(span2);
		}
	};
}

// (45:10) <Link             href="/account/settings/team"             class="d-flex list-group-item border-0 list-group-item-action {page === 'manage-team' ? 'active' : ''}">
function create_default_slot_1(ctx) {
	let i;
	let t0;
	let span0;
	let span2;

	return {
		c() {
			i = element("i");
			t0 = space();
			span0 = element("span");
			span0.textContent = "Manage Team";
			span2 = element("span");
			span2.innerHTML = `<span class="fas fa-chevron-right"></span>`;
			attr(i, "class", "fas fa-users");
			set_style(span0, "padding-left", "0.5em");
			attr(span2, "class", "icon\n                icon-xs ml-auto");
		},
		m(target, anchor) {
			insert(target, i, anchor);
			insert(target, t0, anchor);
			insert(target, span0, anchor);
			insert(target, span2, anchor);
		},
		d(detaching) {
			if (detaching) detach(i);
			if (detaching) detach(t0);
			if (detaching) detach(span0);
			if (detaching) detach(span2);
		}
	};
}

// (54:10) <Link             href="/account/settings/billing"             class="d-flex list-group-item border-0 list-group-item-action {page === 'billing' ? 'active' : ''}">
function create_default_slot(ctx) {
	let i;
	let t0;
	let span0;
	let span2;

	return {
		c() {
			i = element("i");
			t0 = space();
			span0 = element("span");
			span0.textContent = "Billing";
			span2 = element("span");
			span2.innerHTML = `<span class="fas fa-chevron-right"></span>`;
			attr(i, "class", "fas fa-wallet");
			set_style(span0, "padding-left", "0.5em");
			attr(span2, "class", "icon\n                icon-xs ml-auto");
		},
		m(target, anchor) {
			insert(target, i, anchor);
			insert(target, t0, anchor);
			insert(target, span0, anchor);
			insert(target, span2, anchor);
		},
		d(detaching) {
			if (detaching) detach(i);
			if (detaching) detach(t0);
			if (detaching) detach(span0);
			if (detaching) detach(span2);
		}
	};
}

function create_fragment(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*user*/ ctx[1] && create_if_block(ctx);

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
			if (/*user*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*user*/ 2) {
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
	
	let { page = "" } = $$props;
	let user;

	onMount(() => {
		$$invalidate(1, user = me());
	});

	$$self.$$set = $$props => {
		if ("page" in $$props) $$invalidate(0, page = $$props.page);
	};

	return [page, user];
}

class AccountSidebar extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { page: 0 });
	}
}

export default AccountSidebar;