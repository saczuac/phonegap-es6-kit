import Application from 'Application';
import h from 'hyperscript';
import render from 'lib/render';
import SearchResults from 'pages/Search/SearchResults';
import 'pages/Search/Search.css';


const Search = {
    name: 'Search',

    init() {
        //init here
    },

    render() {

        const html =
            h('div', [
                h('div.navbar-fixed',[
                    h('nav',[
                        h('div.nav-wrapper', [
                        	h('div.input-field',[
                        			h('input#search', 
                        				{ 
                        					type: 'text',
                                            autofocus:'true',
                                            onkeyup: (e) => SearchResults.render({data:$('#search').val()})  
                  						}
                  					),
                        		])
                        ]),
                        h('img.search-back', {src: 'img/search-back.png', 
                            onclick: (event) => {
                                Application.back()
                            }
                        }),
                    ]),
                ]),
                h('div#results', [
                    h('img.search-img', {src: 'img/lupa.png'}),
                    h('p.session.search-p', 'Buscar por xxxxxx'),
                ]),
            ])
            ;

        render(html, Application.containers.root);
    }
};

export default Search;
