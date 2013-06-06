/*!
*
* Copyright (c) David Bushell | http://dbushell.com/
*
*/
(function(window, document, undefined)
{

    // helper functions

    var trim = function(str)
    {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
    };

    var hasClass = function(el, cn)
    {
        return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
    };

    var addClass = function(el, cn)
    {
        if (!hasClass(el, cn)) {
            el.className = (el.className === '') ? cn : el.className + ' ' + cn;
        }
    };

    var removeClass = function(el, cn)
    {
        el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
    };

    var hasParent = function(el, id)
    {
        if (el) {
            do {
                if (el.id === id) {
                    return true;
                }
                if (el.nodeType === 9) {
                    break;
                }
            }
            while((el = el.parentNode));
        }
        return false;
    };

    // normalize vendor prefixes

    var doc = document.documentElement;

    var transform_prop = window.Modernizr.prefixed('transform'),
        transition_prop = window.Modernizr.prefixed('transition'),
        transition_end = (function() {
            var props = {
                'WebkitTransition' : 'webkitTransitionEnd',
                'MozTransition' : 'transitionend',
                'OTransition' : 'oTransitionEnd otransitionend',
                'msTransition' : 'MSTransitionEnd',
                'transition' : 'transitionend'
            };
            return props.hasOwnProperty(transition_prop) ? props[transition_prop] : false;
        })();

    window.App = (function()
    {

        var _init = false, app = { };

        var inner = document.getElementById('content'),

            nav_open = false,

            nav_class = 'js-nav',
            nav_class_left = 'offLeft',
            nav_class_right = 'offRight';


        app.init = function()
        {
            if (_init) {
                return;
            }
            _init = true;

            var closeNavEnd = function(e)
            {
                if (e && e.target === inner) {
                    document.removeEventListener(transition_end, closeNavEnd, false);
                    removeClass(doc, nav_class_left);
                    removeClass(doc, nav_class_right);
                }else{
                    setTimeout(function() {
                        removeClass(doc, nav_class_left);
                        removeClass(doc, nav_class_right);
                    },300);
                }
                nav_open = false;
            };

            //Slide Left
            app.closeNavLeft =function()
            {
                if (nav_open) {
                    // close navigation after transition or immediately
                    var duration = (transition_end && transition_prop) ? parseFloat(window.getComputedStyle(inner, '')[transition_prop + 'Duration']) : 0;
                    if (duration > 0) {
                        document.addEventListener(transition_end, closeNavEnd, false);
                    } else {
                        closeNavEnd(null);
                    }
                }
                removeClass(doc, nav_class);
            };

            app.openNavLeft = function()
            {
                if (nav_open) {
                    return;
                }
                addClass(doc, nav_class);
                addClass(doc, nav_class_left);
                nav_open = true;
            };

            app.toggleNavLeft = function(e)
            {
                if (nav_open && hasClass(doc, nav_class_left)) {
                    app.closeNavLeft();
                } else {
                    app.openNavLeft();
                }
                if (e) {
                    e.preventDefault();
                }
            };

            //Slide Right
            app.closeNavRight =function()
            {
                if (nav_open) {
                    // close navigation after transition or immediately
                    var duration = (transition_end && transition_prop) ? parseFloat(window.getComputedStyle(inner, '')[transition_prop + 'Duration']) : 0;
                    if (duration > 0) {
                        document.addEventListener(transition_end, closeNavEnd, false);
                    } else {
                        closeNavEnd(null);
                    }
                }
                removeClass(doc, nav_class);
            };

            app.openNavRight = function()
            {
                if (nav_open) {
                    return;
                }
                addClass(doc, nav_class);
                addClass(doc, nav_class_right);
                nav_open = true;
            };

            app.toggleNavRight = function(e)
            {
                if (nav_open && hasClass(doc, nav_class) && hasClass(doc,nav_class_right)) {
                    app.closeNavRight();
                } else {
                    app.openNavRight();
                }
                if (e) {
                    e.preventDefault();
                }
            };

            //ALL
            app.toggleNav = function(e)
            {
                if (nav_open && hasClass(doc, nav_class) && hasClass(doc, nav_class_right)) {
                    app.closeNavRight();
                } else if (nav_open && hasClass(doc, nav_class) && hasClass(doc,nav_class_left)) {
                    app.closeNavLeft();
                }

                if (e) {
                    e.preventDefault();
                }
            };



            // open nav with main "nav" button
            document.getElementById('btOffLeft').addEventListener('click', app.toggleNavLeft, false);
            document.getElementById('btOffRight').addEventListener('click', app.toggleNavRight, false);

            // close nav with main "close" button
            document.getElementById('btOffClose').addEventListener('click', app.toggleNav, false);

            // close nav by touching the partial off-screen content
            document.getElementById('main').addEventListener('click', function(e)
            {
                if (nav_open && !hasParent(e.target, 'nav')) {
                    e.preventDefault();
                    app.toggleNav();
                }
            },
            true);

            addClass(doc, 'js-ready');

        };

        return app;

    })();

    if (window.addEventListener) {
        window.addEventListener('DOMContentLoaded', window.App.init, false);
    }

})(window, window.document);