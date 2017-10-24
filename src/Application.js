import { samePage } from 'lib/util';
import localforage from 'localforage';
import Config from 'lib/config';

const Application = {
    historyStack: null,

    current: null,

    containers: {
        root: document.getElementById('root'),
        search: ()=> document.getElementById('search'),
        results: ()=> document.getElementById('results'),
    },

    fetchLocal(url) {
      return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest
        xhr.onload = function() {
          resolve(new Response(xhr.responseText, {status: xhr.status}))
        }
        xhr.onerror = function() {
          reject(new TypeError('Local request failed'))
        }
        xhr.open('GET', url)
        xhr.send(null)
      })
    },

    loadFirstTime() {
        localforage.getItem('init').then(value => {
            if (!value) {
                // first time the app is opened, load localforage data
                localforage.setItem('init', true)
                Config.resources.forEach((resource) => {
                        Application.fetchLocal(`extra/${resource}s.json`)
                            .then((response, status) => {
                                if (response.ok)
                                    return response.json()
                                return response
                             })
                            .then(response => {
                                if (response.ok) {
                                    let url = `${Config.serverUrl}/api/${resource}s/`
                                    let dueDate = new Date()
                                    dueDate.setSeconds(dueDate.getSeconds() + Config.validStorage)
                                    localforage.setItem(url, [response, dueDate])
                                } else {
                                    throw `No se encuentra el archivo ${resource}s.json, no se cargó en caché`;
                                }
                            }).catch(error => {
                                localforage.setItem('init', false)
                                console.log('Error:', error)
                            })
                })
            }
        })
    },

    init(appElement) {
        Application.appElement = appElement || document.getElementById('root')
        Application.historyStack = []
        Application.current = null
        window.localforage = localforage
        Application.loadFirstTime()
        return Application
    },

    go(page, props = {}, scrollTop = 0) {
        let scroll = $('body').scrollTop()

        const next = {
            page,
            props
        };

        if (Application.current && !samePage(Application.current, next)) {
            Application.historyStack.push([Application.current, scroll]);
        }    
        Application.current = next;

        page.init();
        page.render(props);
        setTimeout(() => { $('body').scrollTop(scrollTop) }, 300)

        return Application;
    },

    back(props = false) {
        if (Application.historyStack.length > 0) {
            const prev = Application.historyStack.pop();
            let prevPage = prev[0]
            let scroll = prev[1]
            let newProps = props || prevPage.props;

            Application.current = prevPage;

            Application.go(prevPage.page, {
                ...newProps,
            }, scroll);
        } else
            navigator.app.exitApp()

        return Application;
    }
};

export default Application;
