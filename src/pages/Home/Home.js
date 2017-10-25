import Application from 'Application';
import h from 'hyperscript';
import render from 'lib/render';
import Store from 'lib/store';
import pages from 'pages';
import 'pages/Home/Home.css';
import { sanitizeStyles } from 'lib/util';
import classNames from 'classnames';


const Home = {
    name: 'Home',

    init() {
	    this.registerEvents();
    },

    registerEvents() {
        // register events here
    },

    render() {
        // Store.projects().then(projects => {
        //     const html =
        //     h('div.WHITE', [
        //         h('div.home-title.header-home.header', h('span.span-title', 'Proyectos DPGD')),
        //         projects.map(project =>
        //             h(`div.home-link`, [ h(`span.${project.color}.block`, '') , h('span.title-link', project.name, {
        //                 onclick: (event) => {
        //                     Application.go(Project, {id: project.id})
        //                 }
        //             })]
        //         ))
        //     ])

        //     render(html, Application.containers.root)
        //     Home.setAttrs()
        // })

        let homeStyles = classNames('high', 'home');
        let aside = true // If true menu shows aside

        const html = h(`div.${sanitizeStyles(homeStyles)}`, [
                        pages.Menu.draw(aside),
                        h('div#container', [
                            h('h1.great', 'PHONEGAP TEMPLATE ROCKS!'),
                            h('p', 'By Sacha Spinelli'),
                            h('a.search', 'Search something', {
                                onclick: () => {
                                    Application.go(pages.Search, {})
                                }
                            }),
                        ]),
        ])

        render(html, Application.containers.root)
    }
};

export default Home;
