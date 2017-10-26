import Application from 'Application';
import h from 'hyperscript';
import pages from 'pages';
import 'pages/Table/Table.css';
import classNames from 'classnames';
import { sanitizeStyles, openSocialNetwork } from 'lib/util';


const Table = {
    name: 'Table',

    draw(title = 'Título', hash = {}) {

        let html = h('table', [
                        h('caption', title),
                        h('thead', [
                            h('tr', [
                                hash['columns'].map(k => h('th', {'scope':'col'}, k)),
                            ]),
                        ]),
                        h('tbody', [
                            hash['values'].map(values =>
                                h('tr', [
                                    values.map((v,i) => h('td', {'data-label': hash['columns'][i]}, v)),
                                ]),
                            ),
                        ]),
                   ])

        return html
    }
};

export default Table;
