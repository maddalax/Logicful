import './FormSettingsSidebar.css.proxy.js';
/* src/components/form_settings/FormSettingsSidebar.svelte generated by Svelte v3.25.1 */
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
	set_data,
	set_style,
	space,
	text,
	transition_in,
	transition_out
} from "../../../web_modules/svelte/internal.js";

import { subscribe, subscribeComponent } from "../../event/EventBus.js";
import { onMount } from "../../../web_modules/svelte.js";
import Link from "../Link.js";

function create_default_slot_3(ctx) {
	let t;
	let span1;

	return {
		c() {
			t = text("General ");
			span1 = element("span");
			span1.innerHTML = `<span class="fas fa-chevron-right"></span>`;
			attr(span1, "class", "icon icon-xs ml-auto");
		},
		m(target, anchor) {
			insert(target, t, anchor);
			insert(target, span1, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
			if (detaching) detach(span1);
		}
	};
}

// (29:6) <Link href="./form-settings/workflows?formId={form.id}" class="d-flex list-group-item border-0 list-group-item-action {selected === 'workflows' ? 'active' : ''}">
function create_default_slot_2(ctx) {
	let t;
	let span1;

	return {
		c() {
			t = text("Workflows ");
			span1 = element("span");
			span1.innerHTML = `<span class="fas fa-chevron-right"></span>`;
			attr(span1, "class", "icon icon-xs ml-auto");
		},
		m(target, anchor) {
			insert(target, t, anchor);
			insert(target, span1, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
			if (detaching) detach(span1);
		}
	};
}

// (32:6) <Link href="./form-settings/emails?formId={form.id}" class="d-flex list-group-item border-0 list-group-item-action {selected === 'emails' ? 'active' : ''}">
function create_default_slot_1(ctx) {
	let t;
	let span1;

	return {
		c() {
			t = text("Emails ");
			span1 = element("span");
			span1.innerHTML = `<span class="fas fa-chevron-right"></span>`;
			attr(span1, "class", "icon icon-xs ml-auto");
		},
		m(target, anchor) {
			insert(target, t, anchor);
			insert(target, span1, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
			if (detaching) detach(span1);
		}
	};
}

// (35:6) <Link href="./form-settings/scoring?formId={form.id}" class="d-flex list-group-item border-0 list-group-item-action {selected === 'scoring' ? 'active' : ''}">
function create_default_slot(ctx) {
	let t;
	let span1;

	return {
		c() {
			t = text("Scoring ");
			span1 = element("span");
			span1.innerHTML = `<span class="fas fa-chevron-right"></span>`;
			attr(span1, "class", "icon icon-xs ml-auto");
		},
		m(target, anchor) {
			insert(target, t, anchor);
			insert(target, span1, anchor);
		},
		d(detaching) {
			if (detaching) detach(t);
			if (detaching) detach(span1);
		}
	};
}

function create_fragment(ctx) {
	let div5;
	let div2;
	let div1;
	let t2;
	let hr;
	let t3;
	let h21;
	let t4_value = /*form*/ ctx[0].title + "";
	let t4;
	let t5;
	let t6;
	let div4;
	let div3;
	let link0;
	let t7;
	let link1;
	let t8;
	let link2;
	let t9;
	let link3;
	let current;

	link0 = new Link({
			props: {
				href: "./form-settings?formId=" + /*form*/ ctx[0].id,
				class: "d-flex list-group-item border-0 list-group-item-action " + (/*selected*/ ctx[1] === "general" ? "active" : ""),
				$$slots: { default: [create_default_slot_3] },
				$$scope: { ctx }
			}
		});

	link1 = new Link({
			props: {
				href: "./form-settings/workflows?formId=" + /*form*/ ctx[0].id,
				class: "d-flex list-group-item border-0 list-group-item-action " + (/*selected*/ ctx[1] === "workflows" ? "active" : ""),
				$$slots: { default: [create_default_slot_2] },
				$$scope: { ctx }
			}
		});

	link2 = new Link({
			props: {
				href: "./form-settings/emails?formId=" + /*form*/ ctx[0].id,
				class: "d-flex list-group-item border-0 list-group-item-action " + (/*selected*/ ctx[1] === "emails" ? "active" : ""),
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			}
		});

	link3 = new Link({
			props: {
				href: "./form-settings/scoring?formId=" + /*form*/ ctx[0].id,
				class: "d-flex list-group-item border-0 list-group-item-action " + (/*selected*/ ctx[1] === "scoring" ? "active" : ""),
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			div5 = element("div");
			div2 = element("div");
			div1 = element("div");

			div1.innerHTML = `<h2 class="h4 mt-3">Form Settings</h2> 
      <div class="ml-auto" style="padding-top: 1.1em;"><span class="h4 fas fa-cogs"></span></div>`;

			t2 = space();
			hr = element("hr");
			t3 = space();
			h21 = element("h2");
			t4 = text(t4_value);
			t5 = text(" Form");
			t6 = space();
			div4 = element("div");
			div3 = element("div");
			create_component(link0.$$.fragment);
			t7 = space();
			create_component(link1.$$.fragment);
			t8 = space();
			create_component(link2.$$.fragment);
			t9 = space();
			create_component(link3.$$.fragment);
			set_style(div1, "display", "flex");
			attr(h21, "class", "h5 svelte-789alh");
			attr(div2, "class", "card-header bg-white border-0");
			set_style(div2, "padding-bottom", "0.5em");
			attr(div3, "class", "list-group dashboard-menu list-group-sm");
			attr(div4, "class", "card-body p-2");
			attr(div5, "class", "card border-light p-2 svelte-789alh");
		},
		m(target, anchor) {
			insert(target, div5, anchor);
			append(div5, div2);
			append(div2, div1);
			append(div2, t2);
			append(div2, hr);
			append(div2, t3);
			append(div2, h21);
			append(h21, t4);
			append(h21, t5);
			append(div5, t6);
			append(div5, div4);
			append(div4, div3);
			mount_component(link0, div3, null);
			append(div3, t7);
			mount_component(link1, div3, null);
			append(div3, t8);
			mount_component(link2, div3, null);
			append(div3, t9);
			mount_component(link3, div3, null);
			current = true;
		},
		p(ctx, [dirty]) {
			if ((!current || dirty & /*form*/ 1) && t4_value !== (t4_value = /*form*/ ctx[0].title + "")) set_data(t4, t4_value);
			const link0_changes = {};
			if (dirty & /*form*/ 1) link0_changes.href = "./form-settings?formId=" + /*form*/ ctx[0].id;
			if (dirty & /*selected*/ 2) link0_changes.class = "d-flex list-group-item border-0 list-group-item-action " + (/*selected*/ ctx[1] === "general" ? "active" : "");

			if (dirty & /*$$scope*/ 4) {
				link0_changes.$$scope = { dirty, ctx };
			}

			link0.$set(link0_changes);
			const link1_changes = {};
			if (dirty & /*form*/ 1) link1_changes.href = "./form-settings/workflows?formId=" + /*form*/ ctx[0].id;
			if (dirty & /*selected*/ 2) link1_changes.class = "d-flex list-group-item border-0 list-group-item-action " + (/*selected*/ ctx[1] === "workflows" ? "active" : "");

			if (dirty & /*$$scope*/ 4) {
				link1_changes.$$scope = { dirty, ctx };
			}

			link1.$set(link1_changes);
			const link2_changes = {};
			if (dirty & /*form*/ 1) link2_changes.href = "./form-settings/emails?formId=" + /*form*/ ctx[0].id;
			if (dirty & /*selected*/ 2) link2_changes.class = "d-flex list-group-item border-0 list-group-item-action " + (/*selected*/ ctx[1] === "emails" ? "active" : "");

			if (dirty & /*$$scope*/ 4) {
				link2_changes.$$scope = { dirty, ctx };
			}

			link2.$set(link2_changes);
			const link3_changes = {};
			if (dirty & /*form*/ 1) link3_changes.href = "./form-settings/scoring?formId=" + /*form*/ ctx[0].id;
			if (dirty & /*selected*/ 2) link3_changes.class = "d-flex list-group-item border-0 list-group-item-action " + (/*selected*/ ctx[1] === "scoring" ? "active" : "");

			if (dirty & /*$$scope*/ 4) {
				link3_changes.$$scope = { dirty, ctx };
			}

			link3.$set(link3_changes);
		},
		i(local) {
			if (current) return;
			transition_in(link0.$$.fragment, local);
			transition_in(link1.$$.fragment, local);
			transition_in(link2.$$.fragment, local);
			transition_in(link3.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(link0.$$.fragment, local);
			transition_out(link1.$$.fragment, local);
			transition_out(link2.$$.fragment, local);
			transition_out(link3.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div5);
			destroy_component(link0);
			destroy_component(link1);
			destroy_component(link2);
			destroy_component(link3);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	
	let { form } = $$props;
	let { selected } = $$props;

	subscribeComponent("form_loaded", updatedForm => {
		$$invalidate(0, form = updatedForm);
	});

	subscribeComponent("form_updated", updatedForm => {
		$$invalidate(0, form = updatedForm);
	});

	$$self.$$set = $$props => {
		if ("form" in $$props) $$invalidate(0, form = $$props.form);
		if ("selected" in $$props) $$invalidate(1, selected = $$props.selected);
	};

	return [form, selected];
}

class FormSettingsSidebar extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { form: 0, selected: 1 });
	}
}

export default FormSettingsSidebar;