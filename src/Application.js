import Home from 'pages/Home';
// import SplashLogin from 'pages/SplashLogin';
import { sameObject } from 'lib/util';
import localforage from 'localforage';
import Config from 'lib/config';

const Application = {
    historyStack: null,

    current: null,

    containers: {
        root: document.getElementById('root'),
        // restore: ()=> document.getElementById('restore'),
        // search: ()=> document.getElementById('search'),
        // results: ()=> document.getElementById('results'),
    },

    init(appElement) {
        Application.appElement = appElement || document.getElementById('root')
        Application.historyStack = []
        Application.current = null
        window.localforage = localforage

        // window.setInterval(function(){
        //     localforage.clear()
        // }, Config.clearInterval);

        Application.go(Home, {})
        return Application
    },

    go(page, props = {}) {

        const next = {
            page,
            props
        };

        // if (next.page != SplashLogin) {
            if (Application.current && !sameObject(Application.current, next)) {
                Application.historyStack.push(Application.current);
            }    
            Application.current = next;
        // }

        page.init();
        page.render(props);

        return Application;
    },

    back(props = false) {
        if (Application.historyStack.length > 0) {
            const prev = Application.historyStack.pop();
            if (prev.page == Home) {
                navigator.app.exitApp();
            }

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
