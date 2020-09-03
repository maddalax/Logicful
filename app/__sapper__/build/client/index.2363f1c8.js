import { S as SvelteComponent, i as init, s as safe_not_equal, e as element, t as text, k as space, m as create_component, c as claim_element, a as children, b as claim_text, d as detach, l as claim_space, p as claim_component, f as attr, g as set_style, h as insert, j as append, q as mount_component, n as noop, r as transition_in, u as transition_out, v as destroy_component } from './client.a93cf518.js';
import { L as LoadState, c as isObject } from './fuse.esm.4840cecb.js';
import { g as getApi, d as deleteApi } from './ApiService.7fbbc2d7.js';
import { g as getUrlParameter } from './Http.ea6dfc47.js';
import { R as RemoteTable } from './RemoteTable.a0e2c4e2.js';

/* src\routes\submissions\index.svelte generated by Svelte v3.24.1 */

function create_fragment(ctx) {
	let div2;
	let div1;
	let h1;
	let t0;
	let t1;
	let hr;
	let t2;
	let div0;
	let remotetable;
	let current;

	remotetable = new RemoteTable({
			props: {
				getRows: /*getRows*/ ctx[1],
				sortColumns: /*sortColumns*/ ctx[2],
				onDelete: /*onDelete*/ ctx[4],
				onFormat: /*format*/ ctx[3],
				hidden: /*hidden*/ ctx[0]
			}
		});

	return {
		c() {
			div2 = element("div");
			div1 = element("div");
			h1 = element("h1");
			t0 = text("Submissions");
			t1 = space();
			hr = element("hr");
			t2 = space();
			div0 = element("div");
			create_component(remotetable.$$.fragment);
			this.h();
		},
		l(nodes) {
			div2 = claim_element(nodes, "DIV", { class: true, id: true, style: true });
			var div2_nodes = children(div2);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			h1 = claim_element(div1_nodes, "H1", {});
			var h1_nodes = children(h1);
			t0 = claim_text(h1_nodes, "Submissions");
			h1_nodes.forEach(detach);
			t1 = claim_space(div1_nodes);
			hr = claim_element(div1_nodes, "HR", {});
			t2 = claim_space(div1_nodes);
			div0 = claim_element(div1_nodes, "DIV", {});
			var div0_nodes = children(div0);
			claim_component(remotetable.$$.fragment, div0_nodes);
			div0_nodes.forEach(detach);
			div1_nodes.forEach(detach);
			div2_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(div1, "class", "main");
			attr(div2, "class", "container-fluid clearfix");
			attr(div2, "id", "main-container");
			set_style(div2, "margin-top", "3.9em");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div1);
			append(div1, h1);
			append(h1, t0);
			append(div1, t1);
			append(div1, hr);
			append(div1, t2);
			append(div1, div0);
			mount_component(remotetable, div0, null);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(remotetable.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(remotetable.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div2);
			destroy_component(remotetable);
		}
	};
}

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
	function adopt(value) {
		return value instanceof P
		? value
		: new P(function (resolve) {
					resolve(value);
				});
	}

	return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch(e) {
					reject(e);
				}
			}

			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch(e) {
					reject(e);
				}
			}

			function step(result) {
				result.done
				? resolve(result.value)
				: adopt(result.value).then(fulfilled, rejected);
			}

			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
};

function preload(page, session) {
	return __awaiter(this, void 0, void 0, function* () {
		const formId = getUrlParameter("formId");

		if (!formId) {
			return {};
		}

		const url = `https://json-data.s3.us-west-002.backblazeb2.com/${formId}.json`;

		//@ts-ignore
		const res = yield this.fetch(url);

		const form = yield res.json();
		return { formId, form };
	});
}

function instance($$self, $$props, $$invalidate) {
	var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
			? value
			: new P(function (resolve) {
						resolve(value);
					});
		}

		return new (P || (P = Promise))(function (resolve, reject) {
				function fulfilled(value) {
					try {
						step(generator.next(value));
					} catch(e) {
						reject(e);
					}
				}

				function rejected(value) {
					try {
						step(generator["throw"](value));
					} catch(e) {
						reject(e);
					}
				}

				function step(result) {
					result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
				}

				step((generator = generator.apply(thisArg, _arguments || [])).next());
			});
	};

	
	
	let { formId = "" } = $$props;
	let { form } = $$props;
	let state = LoadState.NotStarted;
	let types = {};
	let hidden = new Set(["submission_id"]);

	function getRows() {
		return __awaiter(this, void 0, void 0, function* () {
			const submissions = yield getApi(`form/${formId}/submission`);
			const labels = {};

			form.fields.forEach(f => {
				var _a;

				if (f.name) {
					labels[f.name] = (_a = f.label) !== null && _a !== void 0 ? _a : f.name;
				}
			});

			return submissions.map(d => {
				Object.keys(d.details).forEach(key => {
					var _a, _b, _c;

					if (labels[key]) {
						const label = labels[key];
						d.details[label] = d.details[key];

						types[label] = (_b = (_a = form.fields.find(w => w.label === label)) === null || _a === void 0
						? void 0
						: _a.type) !== null && _b !== void 0
						? _b
						: "";

						delete d.details[key];
					} else {
						const fieldByName = (_c = form.fields.find(w => w.name === key)) === null || _c === void 0
						? void 0
						: _c.type;

						if (fieldByName) {
							types[key] = fieldByName;
						}
					}
				});

				d.details["Submission Date"] = new Date(d.createTime).toLocaleString();
				d.details["submission_id"] = d.id;
				return d.details;
			});
		});
	}

	function sortColumns(columns) {
		return columns.sort((a, b) => {
			return form.fields.findIndex(f => f.label === a) - form.fields.findIndex(f => f.label === b);
		});
	}

	function format(column, value) {
		var _a, _b, _c, _d, _e;
		const type = types[column];

		if (type === "address" && isObject(value)) {

			const results = [
				(_a = value === null || value === void 0
				? void 0
				: value.address1) === null || _a === void 0
				? void 0
				: _a.value,
				(_b = value === null || value === void 0
				? void 0
				: value.address2) === null || _b === void 0
				? void 0
				: _b.value,
				(_c = value === null || value === void 0
				? void 0
				: value.state) === null || _c === void 0
				? void 0
				: _c.value,
				(_d = value === null || value === void 0 ? void 0 : value.city) === null || _d === void 0
				? void 0
				: _d.value,
				(_e = value === null || value === void 0 ? void 0 : value.zip) === null || _e === void 0
				? void 0
				: _e.value
			];

			return results.filter(r => r).join(" ");
		}

		if (type === "checkbox-group" && isObject(value)) {
			return Object.values(value).filter(v => v != null).join(", ");
		}

		if (type === "radio-group" && isObject(value)) {
			return Object.values(value).find(v => v != null);
		}

		return undefined;
	}

	function onDelete(rows) {
		return __awaiter(this, void 0, void 0, function* () {
			const ids = rows.map(r => r["submission_id"]).filter(r => r != null);
			yield deleteApi(`form/${formId}/submission`, ids);
		});
	}

	$$self.$$set = $$props => {
		if ("formId" in $$props) $$invalidate(5, formId = $$props.formId);
		if ("form" in $$props) $$invalidate(6, form = $$props.form);
	};

	return [hidden, getRows, sortColumns, format, onDelete, formId, form];
}

class Submissions extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { formId: 5, form: 6 });
	}
}

export default Submissions;
export { preload };
