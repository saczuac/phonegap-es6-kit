import Application from 'Application';
import h from 'hyperscript';
import pages from 'pages';
import 'pages/Menu/Menu.css';
import classNames from 'classnames';
import { sanitizeStyles, openSocialNetwork } from 'lib/util';


const Menu = {
    name: 'Menu',

    showMenu(aside = false) {
        if (aside)
            Menu.toggleNav()
        else 
            Menu.showMenuTab()

        $('#container').toggleClass('background')

        if ($('#container').hasClass('background'))
            Menu.lockScroll()
        else
            Menu.unlockScroll()
    },

    lockScroll(){
        let html = $('html'); 
        let body = $('body'); 
        var initWidth = html.outerWidth();
        var initHeight = body.outerHeight();

        var scrollPosition = [
            self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
        ];
        html.data('scroll-position', scrollPosition);
        html.data('previous-overflow', html.css('overflow'));
        html.css('overflow', 'hidden');
        window.scrollTo(scrollPosition[0], scrollPosition[1]);   

        var marginR = body.outerWidth()-initWidth;
        var marginB = body.outerHeight()-initHeight; 
        body.css({'margin-right': marginR,'margin-bottom': marginB});
    },

    unlockScroll(){
        let html = $('html');
        let body = $('body');
        html.css('overflow', html.data('previous-overflow'));
        var scrollPosition = html.data('scroll-position');
        window.scrollTo(scrollPosition[0], scrollPosition[1]);    

        body.css({'margin-right': 0, 'margin-bottom': 0});
    },

    showMenuTab() {
        $('#menu').toggle();
    },

    toggleNav() {
        $("#sidenav").toggleClass('openside')
    },

    drawMenu(aside) {
        let html = null

        if (aside) {
            html = h('div.sidenav#sidenav', [
                            h('a', {onclick: event => Application.go(pages.Search, {})}, 'Search'),
                            h('a', {onclick: event => Application.go(pages.Search, {})}, 'Phonegap'),
                            h('a', {onclick: event => Application.go(pages.Search, {})}, 'Template'),
                            h('a', {onclick: event => Application.go(pages.Search, {})}, 'Is Amazing'),
                    ])

        } else {
            html = h('div.menu#menu', [
                            h('div.item', {onclick: event => Application.go(pages.Search, {})}, h('span.span-menu', 'Search')),
                            h('div.item', {onclick: event => Application.go(pages.Search, {})}, h('span.span-menu', 'Phonegap')),
                            h('div.item', {onclick: event => Application.go(pages.Search, {})}, h('span.span-menu', 'Template')),
                            h('div.item', {onclick: event => Application.go(pages.Search, {})}, h('span.span-menu', 'Is Amazing')),

                            h('div.social-networks', [
                                h('img.item-img', {src: 'img/menu_ytube.png', onclick: e => openSocialNetwork('http://www.youtube.com/channel/UC20fzcv9v36W8zWEjgZp7Wg')}),
                                h('img.item-img', {src: 'img/menu_tw.png', onclick: e => openSocialNetwork('http://twitter.com/DeportesGBA')}),
                                h('img.item-img', {src: 'img/menu_fb.png', onclick: e => openSocialNetwork('http://www.facebook.com/DeportesGBA2017/')}),
                                h('img.item-img', {src: 'img/menu_inst.png', onclick: e => openSocialNetwork('http://www.instagram.com/deportesgba/')}),
                            ]),
                    ])
            
        }

        return html
    },

    draw(aside = false) {

        let headerStyles = classNames('back-img', {
            ['show']: (Application.historyStack.length > 0)
        });

        let html = h('div', [
                        h('div.header-fixed',
                            h('div.header-container',
                                h(`img.${sanitizeStyles(headerStyles)}`, {
                                    src: 'img/back.png',
                                    onclick: event => Application.back()
                                }),
                                h('img.header-img', {src: 'img/gba-icon.svg'}),
                                h('img.menu-img', {
                                    src: 'img/menu.png',
                                    onclick: event => Menu.showMenu(aside)
                                }),
                            ),
                        ),
                        Menu.drawMenu(aside),
                    ])

        return html
    }
};

export default Menu;
