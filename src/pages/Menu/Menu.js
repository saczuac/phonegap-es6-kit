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
