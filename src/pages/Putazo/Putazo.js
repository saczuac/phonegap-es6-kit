import Application from 'Application';
import h from 'hyperscript';
import render from 'lib/render';
import 'pages/Putazo/Putazo.css';

const Putazo = {
    name: Putazo,
    
    init() {
        //init here
        this.registerEvents();
    },

    registerEvents() {
        // register events here
    },

    render() {

        const html =
            h('div', [
            ])

        render(html, Application.containers.root);
    }
};

export default Putazo;
