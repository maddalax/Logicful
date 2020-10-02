import './Footer.css.proxy.js';
/* src/components/layout/Footer.svelte generated by Svelte v3.25.1 */
import {
	SvelteComponent,
	attr,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal
} from "../../../web_modules/svelte/internal.js";

function create_fragment(ctx) {
	let footer;

	return {
		c() {
			footer = element("footer");

			footer.innerHTML = `<div class="container"><div class="row"><div class="col-md-1"><img class="navbar-brand-dark mb-4" height="35" src="/assets/img/brand/light.svg" alt="Logo light"/></div> 
      <div class="col-7 col-md-2 mb-5 mb-lg-0 svelte-plrhhm"><span class="h5">Themesberg</span> 
        <ul class="footer-links mt-2"><li><a target="_blank" href="https://themesberg.com/blog">Blog</a></li></ul></div> 
      <div class="col-7 col-md-7 mb-5 mb-lg-0 svelte-plrhhm"><span class="h5">Other</span> 
        <ul class="footer-links mt-2"><li><a href="https://themesberg.com/docs/pixel-bootstrap/getting-started/overview/" target="_blank">Docs <span class="badge badge-sm bg-tertiary ml-2">v4.0</span></a></li></ul></div> 
      <div class="col-6 col-md-2 mb-5 mb-lg-0 svelte-plrhhm"><ul class="social-buttons mb-5 mb-lg-0 svelte-plrhhm"><li><a href="https://twitter.com/themesberg" aria-label="twitter social link" class="icon-white mr-2"><span class="fab fa-twitter"></span></a></li> 
          <li><a href="https://www.facebook.com/themesberg/" class="icon-white mr-2" aria-label="facebook social link"><span class="fab fa-facebook"></span></a></li> 
          <li><a href="https://github.com/themesberg" aria-label="github social link" class="icon-white mr-2"><span class="fab fa-github"></span></a></li> 
          <li><a href="https://dribbble.com/themesberg" class="icon-white" aria-label="dribbble social link"><span class="fab fa-dribbble"></span></a></li></ul></div></div></div>`;

			attr(footer, "class", "footer bg-primary text-white svelte-plrhhm");
		},
		m(target, anchor) {
			insert(target, footer, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(footer);
		}
	};
}

function instance($$self) {
	"use strict";
	return [];
}

class Footer extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Footer;