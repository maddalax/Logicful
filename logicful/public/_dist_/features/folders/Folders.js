import './Folders.css.proxy.js';
/* src/features/folders/Folders.svelte generated by Svelte v3.25.1 */
import {
	SvelteComponent,
	append,
	attr,
	check_outros,
	create_component,
	destroy_component,
	detach,
	element,
	group_outros,
	init,
	insert,
	listen,
	mount_component,
	run_all,
	safe_not_equal,
	set_input_value,
	set_style,
	space,
	transition_in,
	transition_out
} from "../../../web_modules/svelte/internal.js";

import { dispatch, subscribe, subscribeComponent } from "../../event/EventBus.js";
import { navigate } from "../../../web_modules/svelte-routing.js";
import { LoadState } from "../../models/LoadState.js";
import { postApi } from "../../services/ApiService.js";
import { me } from "../../services/AuthService.js";
import { onMount } from "../../../web_modules/svelte.js";
import Dialog from "../../components/layout/Dialog.js";
import Loader from "../../components/Loader.js";
import Link from "../../components/Link.js";
import FolderList from "./FolderList.js";
import { getFolders } from "./FolderService.js";

function create_if_block_1(ctx) {
	let dialog;
	let current;

	dialog = new Dialog({
			props: {
				title: "Create New Folder",
				isOpen: true,
				actions: [
					{
						label: `Create Folder`,
						type: "secondary",
						onClick: /*createNewFolder*/ ctx[8]
					},
					{ label: "Cancel", type: "danger" }
				],
				onClose: /*func*/ ctx[10],
				$$slots: { default: [create_default_slot_1] },
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
			if (dirty & /*creatingNewFolder*/ 8) dialog_changes.onClose = /*func*/ ctx[10];

			if (dirty & /*$$scope, newFolderName*/ 262160) {
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

// (98:2) <Dialog     title={'Create New Folder'}     isOpen={true}     actions={[{ label: `Create Folder`, type: 'secondary', onClick: createNewFolder }, { label: 'Cancel', type: 'danger' }]}     onClose={() => {       creatingNewFolder = false;     }}>
function create_default_slot_1(ctx) {
	let h6;
	let t1;
	let input;
	let mounted;
	let dispose;

	return {
		c() {
			h6 = element("h6");
			h6.textContent = "Folder Name";
			t1 = space();
			input = element("input");
			attr(input, "class", "form-control");
			attr(input, "type", "text");
			attr(input, "id", "folderName");
			attr(input, "name", "folderName");
			attr(input, "placeholder", "");
		},
		m(target, anchor) {
			insert(target, h6, anchor);
			insert(target, t1, anchor);
			insert(target, input, anchor);
			set_input_value(input, /*newFolderName*/ ctx[4]);

			if (!mounted) {
				dispose = listen(input, "input", /*input_input_handler*/ ctx[9]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*newFolderName*/ 16 && input.value !== /*newFolderName*/ ctx[4]) {
				set_input_value(input, /*newFolderName*/ ctx[4]);
			}
		},
		d(detaching) {
			if (detaching) detach(h6);
			if (detaching) detach(t1);
			if (detaching) detach(input);
			mounted = false;
			dispose();
		}
	};
}

// (115:0) <Link   href="/form/create"   class="btn btn-primary"   style="width:100%;margin-top:1em;margin-bottom:1em;">
function create_default_slot(ctx) {
	let span0;
	let t0;
	let span1;

	return {
		c() {
			span0 = element("span");
			t0 = space();
			span1 = element("span");
			span1.textContent = "Create New Form";
			attr(span0, "class", "fas fa-plus");
		},
		m(target, anchor) {
			insert(target, span0, anchor);
			insert(target, t0, anchor);
			insert(target, span1, anchor);
		},
		d(detaching) {
			if (detaching) detach(span0);
			if (detaching) detach(t0);
			if (detaching) detach(span1);
		}
	};
}

// (134:2) {#if state === LoadState.Loading}
function create_if_block(ctx) {
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

function create_fragment(ctx) {
	let t0;
	let link;
	let t1;
	let div2;
	let div0;
	let input;
	let t2;
	let div1;
	let t4;
	let t5;
	let folderlist;
	let t6;
	let button;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*creatingNewFolder*/ ctx[3] && create_if_block_1(ctx);

	link = new Link({
			props: {
				href: "/form/create",
				class: "btn btn-primary",
				style: "width:100%;margin-top:1em;margin-bottom:1em;",
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			}
		});

	let if_block1 = /*state*/ ctx[5] === LoadState.Loading && create_if_block(ctx);

	folderlist = new FolderList({
			props: {
				onNewFolder: /*onNewFolder*/ ctx[7],
				onSelected: /*onSelected*/ ctx[6],
				folders: /*folders*/ ctx[1],
				selected: /*selected*/ ctx[0]?.id
			}
		});

	return {
		c() {
			if (if_block0) if_block0.c();
			t0 = space();
			create_component(link.$$.fragment);
			t1 = space();
			div2 = element("div");
			div0 = element("div");
			input = element("input");
			t2 = space();
			div1 = element("div");
			div1.innerHTML = `<span class="title svelte-rvyo6m">Your Folders</span>`;
			t4 = space();
			if (if_block1) if_block1.c();
			t5 = space();
			create_component(folderlist.$$.fragment);
			t6 = space();
			button = element("button");

			button.innerHTML = `<span class="fas fa-plus" style="font-size: 0.9em;"></span> 
    <span style="font-weight: 400;">New Folder</span>`;

			attr(input, "class", "form-control search-bar container-fluid");
			attr(input, "placeholder", searchPlaceHolder);
			attr(div0, "class", "container-fluid p-2 mt-3");
			set_style(div0, "padding-left", "0");
			attr(div1, "class", "card-header card-header-title bg-white border-0 svelte-rvyo6m");
			set_style(div1, "display", "flex");
			set_style(div1, "padding-left", "0.2em");
			attr(button, "class", "btn btn-outline-dark svelte-rvyo6m");
			attr(div2, "class", "card border-light p-2 svelte-rvyo6m");
			set_style(div2, "padding-bottom", "1em", 1);
		},
		m(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert(target, t0, anchor);
			mount_component(link, target, anchor);
			insert(target, t1, anchor);
			insert(target, div2, anchor);
			append(div2, div0);
			append(div0, input);
			set_input_value(input, /*query*/ ctx[2]);
			append(div2, t2);
			append(div2, div1);
			append(div2, t4);
			if (if_block1) if_block1.m(div2, null);
			append(div2, t5);
			mount_component(folderlist, div2, null);
			append(div2, t6);
			append(div2, button);
			current = true;

			if (!mounted) {
				dispose = [
					listen(input, "input", /*input_input_handler_1*/ ctx[11]),
					listen(button, "click", /*click_handler*/ ctx[12])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (/*creatingNewFolder*/ ctx[3]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*creatingNewFolder*/ 8) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_1(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(t0.parentNode, t0);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			const link_changes = {};

			if (dirty & /*$$scope*/ 262144) {
				link_changes.$$scope = { dirty, ctx };
			}

			link.$set(link_changes);

			if (dirty & /*query*/ 4 && input.value !== /*query*/ ctx[2]) {
				set_input_value(input, /*query*/ ctx[2]);
			}

			if (/*state*/ ctx[5] === LoadState.Loading) {
				if (if_block1) {
					if (dirty & /*state*/ 32) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(div2, t5);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			const folderlist_changes = {};
			if (dirty & /*folders*/ 2) folderlist_changes.folders = /*folders*/ ctx[1];
			if (dirty & /*selected*/ 1) folderlist_changes.selected = /*selected*/ ctx[0]?.id;
			folderlist.$set(folderlist_changes);
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(link.$$.fragment, local);
			transition_in(if_block1);
			transition_in(folderlist.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(link.$$.fragment, local);
			transition_out(if_block1);
			transition_out(folderlist.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach(t0);
			destroy_component(link, detaching);
			if (detaching) detach(t1);
			if (detaching) detach(div2);
			if (if_block1) if_block1.d();
			destroy_component(folderlist);
			mounted = false;
			run_all(dispose);
		}
	};
}

let searchPlaceHolder = "Search for a form";

function instance($$self, $$props, $$invalidate) {
	
	
	let selected = undefined;
	let folders = {};
	let query = "";
	let creatingNewFolder = false;
	let newFolderName = "";
	let user;
	let state = LoadState.NotStarted;
	let contentLoaded = false;
	let parent = "";

	async function onFolderSelected() {
		if (contentLoaded && selected) {
			dispatch("folder_selected", { folder: selected });
		}
	}

	subscribeComponent("folder_deleted", async folder => {
		$$invalidate(5, state = LoadState.Loading);
		await loadFolders();
	});

	subscribeComponent("folder_updated", async folder => {
		$$invalidate(5, state = LoadState.Loading);
		await loadFolders();
		onSelected(folder);
	});

	onMount(async () => {
		user = me();
		$$invalidate(5, state = LoadState.Loading);

		subscribe("folder_content_loaded", () => {
			contentLoaded = true;
		});

		await loadFolders();
	});

	async function loadFolders(cache = true) {
		$$invalidate(1, folders = await getFolders(cache));
		onSelected(folders[Object.keys(folders)[0]]);
		$$invalidate(5, state = LoadState.Finished);
	}

	function onSelected(folder) {
		$$invalidate(0, selected = folder);
		onFolderSelected();
	}

	function onNewFolder(parentFolder = "") {
		parent = parentFolder;
		$$invalidate(3, creatingNewFolder = true);
	}

	async function createNewFolder() {
		await postApi("folder", {
			name: newFolderName,
			teamId: user.teamId,
			parent
		});

		$$invalidate(4, newFolderName = "");
		await loadFolders(false);
		dispatch("folder_created", parent);
	}

	function input_input_handler() {
		newFolderName = this.value;
		$$invalidate(4, newFolderName);
	}

	const func = () => {
		$$invalidate(3, creatingNewFolder = false);
	};

	function input_input_handler_1() {
		query = this.value;
		$$invalidate(2, query);
	}

	const click_handler = () => {
		onNewFolder("");
	};

	return [
		selected,
		folders,
		query,
		creatingNewFolder,
		newFolderName,
		state,
		onSelected,
		onNewFolder,
		createNewFolder,
		input_input_handler,
		func,
		input_input_handler_1,
		click_handler
	];
}

class Folders extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Folders;