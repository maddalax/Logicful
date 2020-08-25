/*

=========================================================
* Pixel Pro Bootstrap 5 UI Kit
=========================================================

* Product Page: https://themesberg.com/product/ui-kit/pixel-pro-premium-bootstrap-5-ui-kit
* Copyright 2019 Themesberg (https://www.themesberg.com)

* Coded by https://themesberg.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. Contact us if you want to remove it.

*/

"use strict";
const d = document;
d.addEventListener("DOMContentLoaded", function(event) {

    // options
    const breakpoints = {
        sm: 540,
        md: 720,
        lg: 960,
        xl: 1140
    };
    
    var preloader = d.querySelector('.preloader');
    if(preloader) {

        const animations = ['oneByOne', 'delayed', 'sync', 'scenario'];

        new Vivus('loader-logo', {duration: 60, type: 'oneByOne'}, function () {});

        setTimeout(function() {
            preloader.classList.add('show');
        }, 600);
    }

    if (d.body.clientWidth >= breakpoints.lg) {
        [].slice.call(d.querySelectorAll('.nav-item.dropdown')).map(function(el) {
            el.addEventListener('mouseover', function () {
                var dropdown = new bootstrap.Dropdown(this.querySelector(':scope > .dropdown-toggle'));
                dropdown.toggle();
                this.classList.add('show');
            });
        });

        [].slice.call(d.querySelectorAll('.nav-item.dropdown')).map(function (el) {
            el.addEventListener('mouseout', function () {
                var dropdown = new bootstrap.Dropdown(this.querySelector(':scope > .dropdown-toggle'));
                dropdown.toggle();
                this.classList.remove('show');
            })
        });
    }

    [].slice.call(d.querySelectorAll('[data-background]')).map(function(el) {
        el.style.background = 'url(' + el.getAttribute('data-background') + ')';
    });

    [].slice.call(d.querySelectorAll('[data-background-color]')).map(function(el) {
        el.style.background = 'url(' + el.getAttribute('data-background-color') + ')';
    });

    [].slice.call(d.querySelectorAll('[data-color]')).map(function(el) {
        el.style.color = 'url(' + el.getAttribute('data-color') + ')';
    });

    // Tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    // Popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
    })

    // Datepicker
    var datepickers = [].slice.call(document.querySelectorAll('[data-datepicker]'))
    var datepickersList = datepickers.map(function (el) {
        return new Datepicker(el, {
            buttonClass: 'btn'
          });
    })

    if(d.querySelector('.input-slider-container')) {
        [].slice.call(d.querySelectorAll('.input-slider-container')).map(function(el) {
            var slider = el.querySelector(':scope .input-slider');
            var sliderId = slider.getAttribute('id');
            var minValue = slider.getAttribute('data-range-value-min');
            var maxValue = slider.getAttribute('data-range-value-max');

            var sliderValue = el.querySelector(':scope .range-slider-value');
            var sliderValueId = sliderValue.getAttribute('id');
            var startValue = sliderValue.getAttribute('data-range-value-low');

            var c = document.getElementById(sliderId),
                id = document.getElementById(sliderValueId);

            noUiSlider.create(c, {
                start: [parseInt(startValue)],
                connect: [true, false],
                //step: 1000,
                range: {
                    'min': [parseInt(minValue)],
                    'max': [parseInt(maxValue)]
                }
            });
        });
    }

    if (d.getElementById('input-slider-range')) {
        var c = d.getElementById("input-slider-range"),
            low = d.getElementById("input-slider-range-value-low"),
            e = d.getElementById("input-slider-range-value-high"),
            f = [d, e];

        noUiSlider.create(c, {
            start: [parseInt(low.getAttribute('data-range-value-low')), parseInt(e.getAttribute('data-range-value-high'))],
            connect: !0,
            tooltips: true,
            range: {
                min: parseInt(c.getAttribute('data-range-value-min')),
                max: parseInt(c.getAttribute('data-range-value-max'))
            }
        }), c.noUiSlider.on("update", function (a, b) {
            f[b].textContent = a[b]
        });
    }

    if (d.getElementById('loadOnClick')) {
        d.getElementById('loadOnClick').addEventListener('click', function () {
            var button = this;
            var loadContent = d.getElementById('extraContent');
            var allLoaded = d.getElementById('allLoadedText');
    
            button.classList.add('btn-loading');
            button.setAttribute('disabled', 'true');
    
            setTimeout(function () {
                loadContent.style.display = 'block';
                button.style.display = 'none';
                allLoaded.style.display = 'block';
            }, 1500);
        });
    }




});