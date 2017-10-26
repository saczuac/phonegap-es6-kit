import Application from 'Application';
import h from 'hyperscript';
import render from 'lib/render';
import Store from 'lib/store';
import Config from 'lib/config';
import pages from 'pages';
import 'pages/Home/Home.css';
import { sanitizeStyles } from 'lib/util';
import classNames from 'classnames';
import Paginator from 'lib/Paginator/Paginator'


const Home = {
    name: 'Home',

    init(values = [[1, '500 $', 'Duilio'], [4, '200 $', 'Gera'], [5, '0 $', 'Enola'], [6, '10 $', 'Emi'], [8, '50$', 'Martin']]) {
	    this.registerEvents();
        // Store.projects().then(projects => {
            // this.paginator = new Paginator(projects, Home)
        // })
        this.paginator = new Paginator(values, Home)
    },

    registerEvents() {
        // register events here
    },

    render(props = {page:1}) {
        let homeStyles = classNames('high', 'home');
        let values = Home.paginator.getPage(props.page)

        const html = h(`div.${sanitizeStyles(homeStyles)}`, [
                        pages.Menu.draw(Config.aside),
                        h('div#container', [
                            h('h1.great', 'PHONEGAP TEMPLATE ROCKS!'),
                            h('p', 'By Sacha Spinelli'),
                            h('a.search', 'Search something', {
                                onclick: () => {
                                    Application.go(pages.Search, {})
                                }
                            }),
                            pages.Table.draw('Table of Whatever', {columns:['Acount', 'Money', 'User'], values: values}),
                            Home.paginator.drawPages(),
                        ]),
        ])

        render(html, Application.containers.root)
    }
};

export default Home;
