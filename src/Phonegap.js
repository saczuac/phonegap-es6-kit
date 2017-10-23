import Application from 'Application'
import Config from 'lib/config'
import Home from 'pages/Home/Home';
import Notifications from 'lib/Notifications';
import { showAlert } from 'lib/util';
import Store from 'lib/store';
import localforage from 'localforage';

/* 
    Phonegap Confs
*/

window.app = {

    initialize() { this.bindEvents() },

    bindEvents() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("backbutton", this.onBackButton, false);
    },

    onDeviceReady() {
        Config.init()

        if (Config.lockOrientation)
            screen.orientation.lock('portrait')

        window.connFlag = true;
        checkConnection();

        if (navigator.connection.type == Connection.NONE) {
            showAlert('No hay conexión a internet', () => {})
            setTimeout(() => {
                // navigator.app.exitApp();
            },
            Config.timeout * 1000)

        } 
        Application.init();
        Application.go(Home, {})
    },

    onBackButton(){
        if (Application.current.page == Home) {
            navigator.app.exitApp();
        } else {              
            Application.back();
        }
    }
};

window.app.initialize();