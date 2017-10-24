import Store from 'lib/store'
import h from 'hyperscript'
import render from 'lib/render'
import Config from 'lib/config'
import 'pages/Search/Search.css';


const SearchResults = {
    name: 'SearchResults',

    render(props={data:'---'}) {

        let html = null

        if (props.data.length > 1 && Config.search) {

            render("", Application.containers.results());

            Store.search(props.data).then(results => {
                if ((results.length == 0) || results  == undefined) {  
                    html = h('div#results-list', h('p.session.nosearch','Lo sentimos no se encontraron resultados'));
                    render(html, Application.containers.results());
                } else {
                 html =
                    h('div#results-list', [
                        h('ul', { 'data-collapsible': 'accordion' },
                            results.map(res =>
                                 h('div.element', {
                                        onclick: (event) => {
                                            // Application.go(ElementDetail, {id: res.id})
                                        }
                                    } ,[
                                    h('p.session.element-name', res.name),
                                    h('span.element-span', 'Elemento')
                                 ]),
                            ),
                        ),
                    ]);

                    render(html, Application.containers.results());
                }
            });
        } else {
             html =
                h('div#results-list', [
                    h('ul', { 'data-collapsible': 'accordion' },
                         h('div.element', {
                                onclick: (event) => {
                                    // Application.go(ElementDetail, {id: res.id})
                                }
                            } ,[
                            h('img.search-result-img', {src: 'img/tarzan.png'}),
                            h('p.session.element-name', 'Tarzán'),
                            h('span.element-span', 'Selva')
                         ]),
                         h('div.element', {
                                onclick: (event) => {
                                    // Application.go(ElementDetail, {id: res.id})
                                }
                            } ,[
                            h('img.search-result-img', {src: 'img/aladdin.png'}),
                            h('p.session.element-name', 'Aladdin'),
                            h('span.element-span', 'Magia')
                         ]),
                    ),
                ]);

                render(html, Application.containers.results());
            // render("", Application.containers.results());
        }
    }
};

export default SearchResults;
