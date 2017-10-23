import Application from 'Application';
import h from 'hyperscript';
import render from 'lib/render';
import Store from 'lib/store';
import pages from 'pages';
import classnames from 'classnames';
import styles from 'pages/Home/Home.css';


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

        let animationStyles = classnames(styles.high, {
            [styles.great]: (Math.random() >= 0.5) //Random Boolean
        });

        animationStyles = animationStyles.replace(/\s+/g, '.').toLowerCase();

        const html = h(`div.home.${animationStyles}`, [
            h('h1', 'PHONEGAP TEMPLATE ROCKS!'),
            h('p', 'By Sacha Spinelli')
        ])

        render(html, Application.containers.root)
    }
};

export default Home;
