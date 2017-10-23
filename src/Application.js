import { sameObject } from 'lib/util';
import localforage from 'localforage';
import Config from 'lib/config';

const Application = {
    historyStack: null,

    current: null,

    containers: {
        root: document.getElementById('root'),
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
                localforage.setItem('init', true)
                // first time the app is opened, load localforage data
                Config.resources.forEach((resource) => {
                    Application.fetchLocal(`extra/${resource}s.json`)
                        .then((response, status) => response.json())
                        .then(response => {
                            let url = `${Config.serverUrl}/api/${resource}s/`
                            let dueDate = new Date()
                            dueDate.setSeconds(dueDate.getSeconds() + Config.validStorage)
                            localforage.setItem(url, [response, dueDate])
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

    go(page, props = {}) {

        const next = {
            page,
            props
        };

        if (Application.current && !sameObject(Application.current, next)) {
            Application.historyStack.push(Application.current);
        }    
        Application.current = next;

        page.init();
        page.render(props);

        return Application;
    },

    back(props = false) {
        if (Application.historyStack.length > 0) {
            const prev = Application.historyStack.pop();
            let newProps = props || prev.props;
            Application.current = prev;

            Application.go(prev.page, {
                ...newProps,
            });
        }

        return Application;
    }
};

export default Application;
