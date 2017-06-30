import Home from 'pages/Home';
import { sameObject } from 'lib/util';
import localforage from 'localforage';

const Application = {
    historyStack: [],

    current: null,

    containers: {
        root: document.getElementById('root'),
        // home: document.getElementById('home'),
    },

    init(appElement) {
        Application.appElement = appElement || document.getElementById('root')
        window.localforage = localforage
        localforage.clear()
        Application.go(Home, {})
        return Application
    },

    /**
     * Monta | Navega a una página específica
     * @param  {Page} page Page en ./pages/. La página debe entender el método render(props = {})
     * @param  {Object} props Parámetros para la página.
     * @return {Application} instancia
     */
    go(page, props = {}) {

        const next = {
            page,
            props
        };

        if (Application.current && !sameObject(Application.current, next)) {
            Application.historyStack.push(Application.current);
        }

        Application.current = next;

        page.render(props);

        return Application;
    },

    back() {
        if (Application.historyStack.length > 0) {
            const prev = Application.historyStack.pop();

            Application.current = prev;

            Application.go(prev.page, {
                ...prev.props,
            });
        }

        return Application;
    }
};

export default Application;
