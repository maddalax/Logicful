import './FolderContent.css.proxy.js';
/* src/features/folders/FolderContent.svelte generated by Svelte v3.25.1 */
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
	listen,
	mount_component,
	noop,
	safe_not_equal,
	set_data,
	set_style,
	space,
	text,
	transition_in,
	transition_out
} from "../../../web_modules/svelte/internal.js";

import { onMount } from "../../../web_modules/svelte.js";
import { dispatch, subscribeComponent } from "../../event/EventBus.js";
import { getApi } from "../../services/ApiService.js";
import { me } from "../../services/AuthService.js";
import { LoadState } from "../../models/LoadState.js";
import { debounce } from "../../util/Debounce.js";
import FormList from "./FormList.js";
import Link from "../../components/Link.js";
import Loader from "../../components/Loader.js";
import { cacheClear } from "../../util/Cache.js";
import FolderSettings from "./FolderSettings.js";

function create_if_block_4(ctx) {
	let foldersettings;
	let current;

	foldersettings = new FolderSettings({
			props: {
				folder: /*folder*/ ctx[1],
				onClose: /*func*/ ctx[5]
			}
		});

	return {
		c() {
			create_component(foldersettings.$$.fragment);
		},
		m(target, anchor) {
			mount_component(foldersettings, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const foldersettings_changes = {};
			if (dirty & /*folder*/ 2) foldersettings_changes.folder = /*folder*/ ctx[1];
			if (dirty & /*editing*/ 8) foldersettings_changes.onClose = /*func*/ ctx[5];
			foldersettings.$set(foldersettings_changes);
		},
		i(local) {
			if (current) return;
			transition_in(foldersettings.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(foldersettings.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(foldersettings, detaching);
		}
	};
}

// (65:6) {#if folder}
function create_if_block(ctx) {
	let div5;
	let div4;
	let div1;
	let div0;
	let span;
	let t0_value = /*folder*/ ctx[1].name + "";
	let t0;
	let t1;
	let t2;
	let p;
	let t3_value = (/*forms*/ ctx[0]?.length ?? 0) + "";
	let t3;
	let t4;
	let t5;
	let div3;
	let div2;
	let t6;
	let link;
	let t7;
	let hr;
	let t8;
	let t9;
	let current_block_type_index;
	let if_block2;
	let if_block2_anchor;
	let current;
	let if_block0 = !/*folder*/ ctx[1].isUncategorized && create_if_block_3(ctx);

	link = new Link({
			props: {
				href: `/form/create?folder=${/*folder*/ ctx[1]?.id}`,
				classes: "btn btn-xs btn-outline-dark",
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			}
		});

	let if_block1 = /*state*/ ctx[2] === LoadState.Loading && create_if_block_2(ctx);
	const if_block_creators = [create_if_block_1, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*forms*/ ctx[0]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx, -1);
	if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			div5 = element("div");
			div4 = element("div");
			div1 = element("div");
			div0 = element("div");
			span = element("span");
			t0 = text(t0_value);
			t1 = space();
			if (if_block0) if_block0.c();
			t2 = space();
			p = element("p");
			t3 = text(t3_value);
			t4 = text(" Forms");
			t5 = space();
			div3 = element("div");
			div2 = element("div");
			t6 = space();
			create_component(link.$$.fragment);
			t7 = space();
			hr = element("hr");
			t8 = space();
			if (if_block1) if_block1.c();
			t9 = space();
			if_block2.c();
			if_block2_anchor = empty();
			attr(span, "class", "h5");
			set_style(div0, "display", "flex");
			attr(p, "class", "small");
			attr(div1, "class", "col");
			attr(div2, "class", "align-items-center");
			set_style(div2, "padding-bottom", "0.3em");
			set_style(div2, "text-align", "right", 1);
			attr(div3, "class", "col-auto");
			attr(div4, "class", "row");
			attr(div5, "class", "card-header bg-white border-0 p-2");
			set_style(div5, "display", "flex");
		},
		m(target, anchor) {
			insert(target, div5, anchor);
			append(div5, div4);
			append(div4, div1);
			append(div1, div0);
			append(div0, span);
			append(span, t0);
			append(div0, t1);
			if (if_block0) if_block0.m(div0, null);
			append(div1, t2);
			append(div1, p);
			append(p, t3);
			append(p, t4);
			append(div4, t5);
			append(div4, div3);
			append(div3, div2);
			append(div3, t6);
			mount_component(link, div3, null);
			insert(target, t7, anchor);
			insert(target, hr, anchor);
			insert(target, t8, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert(target, t9, anchor);
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block2_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if ((!current || dirty & /*folder*/ 2) && t0_value !== (t0_value = /*folder*/ ctx[1].name + "")) set_data(t0, t0_value);

			if (!/*folder*/ ctx[1].isUncategorized) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_3(ctx);
					if_block0.c();
					if_block0.m(div0, null);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if ((!current || dirty & /*forms*/ 1) && t3_value !== (t3_value = (/*forms*/ ctx[0]?.length ?? 0) + "")) set_data(t3, t3_value);
			const link_changes = {};
			if (dirty & /*folder*/ 2) link_changes.href = `/form/create?folder=${/*folder*/ ctx[1]?.id}`;

			if (dirty & /*$$scope*/ 512) {
				link_changes.$$scope = { dirty, ctx };
			}

			link.$set(link_changes);

			if (/*state*/ ctx[2] === LoadState.Loading) {
				if (if_block1) {
					if (dirty & /*state*/ 4) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_2(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(t9.parentNode, t9);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx, dirty);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block2 = if_blocks[current_block_type_index];

				if (!if_block2) {
					if_block2 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block2.c();
				}

				transition_in(if_block2, 1);
				if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
			}
		},
		i(local) {
			if (current) return;
			transition_in(link.$$.fragment, local);
			transition_in(if_block1);
			transition_in(if_block2);
			current = true;
		},
		o(local) {
			transition_out(link.$$.fragment, local);
			transition_out(if_block1);
			transition_out(if_block2);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div5);
			if (if_block0) if_block0.d();
			destroy_component(link);
			if (detaching) detach(t7);
			if (detaching) detach(hr);
			if (detaching) detach(t8);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach(t9);
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(if_block2_anchor);
		}
	};
}

// (71:16) {#if !folder.isUncategorized}
function create_if_block_3(ctx) {
	let div;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			div.innerHTML = `<span class="fas fa-cog"></span>`;
			set_style(div, "padding-left", "0.5em");
			set_style(div, "font-size", "1.2em");
			set_style(div, "cursor", "pointer");
			attr(div, "class", "");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (!mounted) {
				dispose = listen(div, "click", /*onSettings*/ ctx[4]);
				mounted = true;
			}
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			dispose();
		}
	};
}

// (86:14) <Link                 href={`/form/create?folder=${folder?.id}`}                 classes="btn btn-xs btn-outline-dark">
function create_default_slot(ctx) {
	let span0;
	let span1;

	return {
		c() {
			span0 = element("span");
			span1 = element("span");
			span1.textContent = "Create\n                  Form In This Folder";
			attr(span0, "class", "fas fa-plus");
			set_style(span1, "padding-left", "0.4em");
			set_style(span1, "font-weight", "400");
		},
		m(target, anchor) {
			insert(target, span0, anchor);
			insert(target, span1, anchor);
		},
		d(detaching) {
			if (detaching) detach(span0);
			if (detaching) detach(span1);
		}
	};
}

// (96:8) {#if state === LoadState.Loading}
function create_if_block_2(ctx) {
	let loader;
	let current;
	loader = new Loader({});

	return {
		c() {
			create_component(loader.$$.fragment);
		},
		m(target, anchor) {
			mount_component(loader, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(loader.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(loader.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(loader, detaching);
		}
	};
}

// (101:8) {:else}
function create_else_block(ctx) {
	let p;

	return {
		c() {
			p = element("p");
			p.textContent = "Folder Empty";
			set_style(p, "padding-left", "0.7em");
		},
		m(target, anchor) {
			insert(target, p, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(p);
		}
	};
}

// (99:8) {#if forms}
function create_if_block_1(ctx) {
	let formlist;
	let current;
	formlist = new FormList({ props: { forms: /*forms*/ ctx[0] } });

	return {
		c() {
			create_component(formlist.$$.fragment);
		},
		m(target, anchor) {
			mount_component(formlist, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const formlist_changes = {};
			if (dirty & /*forms*/ 1) formlist_changes.forms = /*forms*/ ctx[0];
			formlist.$set(formlist_changes);
		},
		i(local) {
			if (current) return;
			transition_in(formlist.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(formlist.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(formlist, detaching);
		}
	};
}

function create_fragment(ctx) {
	let t;
	let div2;
	let div1;
	let div0;
	let current;
	let if_block0 = /*editing*/ ctx[3] && create_if_block_4(ctx);
	let if_block1 = /*folder*/ ctx[1] && create_if_block(ctx);

	return {
		c() {
			if (if_block0) if_block0.c();
			t = space();
			div2 = element("div");
			div1 = element("div");
			div0 = element("div");
			if (if_block1) if_block1.c();
			attr(div0, "class", "card card-body bg-white border-light p-0 p-md-4 svelte-wc0ycq");
			attr(div1, "class", "col-12 mb-4");
			set_style(div1, "margin-top", "1em");
			attr(div2, "class", "row mb-5");
		},
		m(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert(target, t, anchor);
			insert(target, div2, anchor);
			append(div2, div1);
			append(div1, div0);
			if (if_block1) if_block1.m(div0, null);
			current = true;
		},
		p(ctx, [dirty]) {
			if (/*editing*/ ctx[3]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*editing*/ 8) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_4(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(t.parentNode, t);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (/*folder*/ ctx[1]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*folder*/ 2) {
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
			transition_in(if_block0);
			transition_in(if_block1);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			current = false;
		},
		d(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach(t);
			if (detaching) detach(div2);
			if (if_block1) if_block1.d();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	
	
	
	let forms = [];
	let user;
	let folder;
	let state = LoadState.NotStarted;
	let editing = false;

	function onSettings() {
		$$invalidate(3, editing = true);
	}

	subscribeComponent("forms_moved", newFolder => {
		$$invalidate(0, forms = []);
		$$invalidate(2, state = LoadState.Loading);
		cacheClear(`api-request-form?folderId=${newFolder}`);
		setForms(false);
	});

	subscribeComponent("folder_selected", async e => {
		$$invalidate(0, forms = []);
		$$invalidate(2, state = LoadState.Loading);
		$$invalidate(1, folder = e.folder);
		debounceSetForms();
	});

	async function setForms(cache = true) {
		$$invalidate(0, forms = await getApi(`form?folderId=${folder.id}`));
		$$invalidate(2, state = LoadState.Finished);
	}

	const debounceSetForms = debounce(
		async () => {
			setForms();
		},
		300
	);

	onMount(() => {
		user = me();
		dispatch("folder_content_loaded", {});
	});

	const func = () => {
		$$invalidate(3, editing = false);
	};

	return [forms, folder, state, editing, onSettings, func];
}

class FolderContent extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default FolderContent;